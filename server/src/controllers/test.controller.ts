import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { AuthenticationError, AuthorizationError, NotFoundError, ConflictError } from '../middleware/errorHandler';
import { Test } from '../models/test.model';
import { TestAttempt } from '../models/testAttempt.model';
import { Question } from '../models/question.model';
import { User } from '../models/user.model';
import { cleanMongoData } from '../services/dataCleaner.service';
import { testValidationSchema } from '../schemas/test.validator';
import { Types } from 'mongoose';
import { TestPayment } from '../models/payment.model';
import { CashFree } from '../config/cashfree.config';
import { config } from '../config/variables.config';
import { v4 as uuid } from 'uuid';
import { sendMail } from '../services/mail.service';

export const getTest = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { testId } = req.params;
    const test = await Test.findById(testId)
      .populate('questions')
      .lean();
    if (!test) {
      return next(new NotFoundError('Test not found'));
    }
    res.status(200).json(cleanMongoData(test));
  } catch (error) {
    next(error);
  }
};

export const createTest = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = await testValidationSchema.parseAsync(req.body);
    const id = User.findOne({uid:req.user?.uid}).select('_id').lean();
    const test = await Test.create({instructorId: id, ...validatedData});
    res.status(201).json(cleanMongoData(test.toJSON()));
  } catch (error) {
    next(error);
  }
};

export const deleteTest = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const testId = req.params.testId;
    const test = await Test.findById(testId).lean();
    if (!test) throw new NotFoundError('Test not found');
    const id = User.findOne({uid:req.user?.uid}).select('_id').lean();
    if (req.user?.role === 'instructor' && !test.instructorId.equals(id)) {
      throw new AuthorizationError('You do not have permission to delete this test');
    }
    await Question.deleteMany({ _id: { $in: test.questions } });
    await TestAttempt.deleteMany({ testId });
    await Test.findByIdAndDelete(testId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const addQuestionToTest = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const testId = req.params.testId;
    let validateData = req.body;
    validateData.testId = testId;
    const test = await Test.findById(testId).lean();
    if (!test) throw new NotFoundError('Test not found');
    const newQuestion = await Question.create(validateData);
    await Test.findByIdAndUpdate(testId, {
      $push: { questions: newQuestion._id }
    });
    res.status(201).json({
      message: 'Question added successfully',
      question: cleanMongoData(newQuestion.toJSON()),
    });
  } catch (err) {
    next(err);
  }
};

export const deleteQuestionFromTest = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { testId, questionId } = req.params;
    const test = await Test.findById(testId).lean();
    if (!test) throw new NotFoundError('Test not found');
    await Question.findByIdAndDelete(questionId);
    await Test.findByIdAndUpdate(testId, {
      $pull: { questions: questionId }
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const submitTestAttempt = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { testId } = req.params;
    const mUser = await User.findOne({ uid: req.user?.uid }).lean();
    if (!mUser) throw new AuthenticationError();
    const validatedData = await testAttemptValidationSchema.parseAsync(req.body);
    const test = await Test.findById(testId).populate('questions').lean();
    if (!test) return next(new NotFoundError('Test not found'));
    // Check if test is within allowed time window
    const now = new Date();
    if (now < test.startDateTime || now > test.endDateTime) {
      return next(new AuthorizationError('Test is not available at this time.'));
    }
    let score = 0;
    const gradedAnswers = validatedData.answers.map((answer: any) => {
      const question = test.questions.find(q =>
        q._id.toString() === answer.questionId.toString()
      );
      if (!question) return null;
      const isCorrect = answer.selectedOption === (question as any).correctAnswer;
      if (isCorrect) score += (question as any).points;
      return {
        questionId: answer.questionId,
        selectedOption: answer.selectedOption,
        isCorrect,
      };
    }).filter(Boolean);
    const totalPoints = test.questions.reduce((acc: any, q: any) => acc + (q as any).points, 0);
    const percentageScore = totalPoints > 0 ? (score / totalPoints) * 100 : 0;
    let attempt = await TestAttempt.findOne({ testId, userId: mUser._id });
    if (!attempt) {
      attempt = new TestAttempt({
        testId,
        userId: mUser._id,
        answers: validatedData.answers,
        score: percentageScore,
        completedAt: now,
      });
    } else if (attempt.completedAt) {
      return next(new AuthorizationError('This test has already been completed.'));
    } else {
      attempt.answers = validatedData.answers.map((a: any) => ({
        questionId: new Types.ObjectId(a.questionId),
        selectedOption: a.selectedOption,
      }));
      attempt.score = percentageScore;
      attempt.completedAt = now;
    }
    await attempt.save();
    res.status(200).json({
      score: percentageScore,
      answers: gradedAnswers,
    });
  } catch (error) {
    next(error);
  }
};

export const startTestAttempt = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { testId } = req.params;
    const mUser = await User.findOne({ uid: req.user?.uid }).lean();
    if (!mUser) throw new AuthenticationError();
    const userId = mUser._id;
    const test = await Test.findOne({ _id: testId, isPublished: true }).populate('questions', '-correctAnswer').lean();
    if (!test) throw new NotFoundError('Test not found');
    // Check if test is within allowed time window
    const now = new Date();
    if (now < test.startDateTime || now > test.endDateTime) {
      return next(new AuthorizationError('Test is not available at this time.'));
    }
    let attempt = await TestAttempt.findOne({ testId, userId });
    if (!attempt) {
      attempt = await TestAttempt.create({
        testId,
        userId,
        startedAt: now,
      });
    } else if (attempt.completedAt) {
      return next(new AuthorizationError('You have already completed this test.'));
    }
    // Randomize questions and options
    const shuffledQuestions = [...test.questions].sort(() => Math.random() - 0.5).map((q: any) => ({
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5),
    }));
    res.status(200).json({
      testId: test._id,
      name: test.name,
      description: test.description,
      startDateTime: test.startDateTime,
      endDateTime: test.endDateTime,
      questions: shuffledQuestions.map((q: any) => ({
        _id: q._id,
        question: q.question,
        options: q.options,
        points: q.points,
      })),
    });
  } catch (error) {
    next(error);
  }
};

export const getTestResult = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { testId } = req.params;
    const mUser = await User.findOne({ uid: req.user?.uid }).lean();
    if (!mUser) throw new AuthenticationError();
    const test = await Test.findOne({ _id: testId, isPublished: true }).lean();
    if (!test) throw new NotFoundError('Test not found');
    const attempt = await TestAttempt.findOne({
      testId,
      userId: mUser._id,
    }).lean();
    if (!attempt) {
      return next(new NotFoundError('No attempt found for this test'));
    }
    return res.status(200).json({
      score: attempt.score,
      answers: attempt.answers,
      completedAt: attempt.completedAt,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTest = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { testId } = req.params;
    const updateData = await testValidationSchema.partial().parseAsync(req.body);
    if (!updateData || Object.keys(updateData).length === 0) {
      res.status(200).json({ success: true, message: 'No update data provided' });
      return;
    }
    const test = await Test.findById(testId);
    if (!test) {
      throw new NotFoundError('Test not found');
    }
    const id = User.findOne({uid:req.user?.uid}).select('_id').lean();
    if (req.user?.role === 'instructor' && !test.instructorId.equals(id)) {
      throw new AuthorizationError('You cannot modify tests owned by other instructors');
    }
    if (updateData.name !== undefined) test.name = updateData.name;
    if (updateData.description !== undefined) test.description = updateData.description;
    if (updateData.isPublished !== undefined) test.isPublished = updateData.isPublished;
    if (updateData.startDateTime !== undefined) test.startDateTime = updateData.startDateTime;
    if (updateData.endDateTime !== undefined) test.endDateTime = updateData.endDateTime;
    if(updateData.price !== undefined) test.price = updateData.price;
    await test.save();
    res.json(cleanMongoData(test.toJSON()));
  } catch (error) {
    next(error);
  }
};

// Placeholders for analytics, ranking, and grant logic
export const getTestAnalytics = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { testId } = req.params;
    // Total students registered for the test
    const totalStudents = await TestPayment.countDocuments({ testId });
    // Total sales (sum of amount, only ONLINE method)
    const totalSales = await TestPayment.aggregate([
      { $match: { testId: new Types.ObjectId(testId), method: 'ONLINE' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    // Group by week
    const byWeek = await TestPayment.aggregate([
      { $match: { testId: new Types.ObjectId(testId) } },
      { $group: {
        _id: { $isoWeek: '$createdAt' },
        count: { $sum: 1 },
        sales: { $sum: '$amount' }
      } },
      { $sort: { '_id': 1 } }
    ]);
    // Group by year
    const byYear = await TestPayment.aggregate([
      { $match: { testId: new Types.ObjectId(testId) } },
      { $group: {
        _id: { $year: '$createdAt' },
        count: { $sum: 1 },
        sales: { $sum: '$amount' }
      } },
      { $sort: { '_id': 1 } }
    ]);
    // Group by quarter
    const byQuarter = await TestPayment.aggregate([
      { $match: { testId: new Types.ObjectId(testId) } },
      { $group: {
        _id: { year: { $year: '$createdAt' }, quarter: { $ceil: { $divide: [{ $month: '$createdAt' }, 3] } } },
        count: { $sum: 1 },
        sales: { $sum: '$amount' }
      } },
      { $sort: { '_id.year': 1, '_id.quarter': 1 } }
    ]);
    res.json({
      totalStudents,
      totalSales: totalSales[0]?.total || 0,
      byWeek,
      byYear,
      byQuarter
    });
  } catch (error) {
    next(error);
  }
};

export const getTestRankings = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { testId } = req.params;
    // 1. Get all attempts for the test
    const attempts = await TestAttempt.find({ testId, completedAt: { $ne: null } })
      .populate('userId', 'name email school')
      .lean();
    // 2. Sort by score desc, completedAt asc
    attempts.sort((a: any, b: any) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime();
    });
    // 3. Assign ranks (ties allowed)
    let currentRank = 1;
    let lastScore = null;
    let lastTime = null;
    let sameRankCount = 0;
    for (let i = 0; i < attempts.length; i++) {
      const att = attempts[i];
      if (lastScore === att.score && lastTime === att.completedAt?.toISOString()) {
        att.rank = currentRank;
        sameRankCount++;
      } else {
        currentRank = i + 1;
        att.rank = currentRank;
        lastScore = att.score;
        lastTime = att.completedAt?.toISOString();
        sameRankCount = 1;
      }
      // 4. Update rank in DB if changed
      if (att.rank !== att.rankInDb) {
        TestAttempt.updateOne({ _id: att._id }, { $set: { rank: att.rank } }).exec();
      }
      // 5. Send email if user has email
      if (att.userId && att.userId.email) {
        sendMail({
          to: att.userId.email,
          subject: `Your Rank for Test ${testId}`,
          text: `Hi ${att.userId.name || ''},\n\nYour rank for the test is ${att.rank}. Your score: ${att.score}.\n\nThank you for participating!`,
        });
      }
    }
    // 6. Return ranking list
    const ranking = attempts.map((att: any) => ({
      user: att.userId,
      score: att.score,
      completedAt: att.completedAt,
      rank: att.rank,
    }));
    res.status(200).json(ranking);
  } catch (error) {
    next(error);
  }
};

export const grantTestToStudent = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { testId, userId, amount = 0, method = 'GRANT' } = req.body;
    if (!testId || !userId) throw new ConflictError('testId and userId are required');
    const existingGrant = await TestPayment.exists({ testId, userId });
    if (existingGrant) throw new ConflictError('Grant already exists for this test and user');
    const details = await TestPayment.create({ testId, userId, amount, method });
    await Test.findByIdAndUpdate(testId, { $inc: { registration: 1 } });
    res.status(201).json(cleanMongoData(details.toJSON()));
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { testId } = req.params;
    const mUser = await User.findOne({ uid: req.user?.uid }).lean();
    if (!mUser) throw new AuthenticationError();
    if (!mUser.contactNumber) throw new ConflictError('User does not have a phone number');
    const test = await Test.findById(testId).lean();
    if (!test) throw new NotFoundError('Test not exist');
    let orderPayload = {
      order_id: `order_${uuid()}`,
      order_currency: 'INR',
      order_amount: Math.round((test.price || 0) * 100) / 100,
      customer_details: {
        customer_id: mUser._id.toString(),
        customer_phone: mUser.contactNumber,
      },
      order_meta: {
        return_url: `${config.domainUrl}/order-success/${test._id.toString()}?order_id={order_id}`,
        notify_url: `${config.domainUrl}/api/v1/tests/${test._id.toString()}/webhook`,
      }
    };
    const response = await CashFree.PGCreateOrder(orderPayload);
    res.status(201).json(response.data);
  } catch (err) {
    next(err);
  }
};

export const orderComplete = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const order_id = req.query.order_id;
    const testId = req.params.testId;
    if (!order_id || !testId) throw new ConflictError('Missing order ID or test ID');
    const mUser = await User.findOne({ uid: req.user?.uid }).select('_id').lean();
    if (!mUser) throw new AuthenticationError();
    const existingPaymentRecord = await TestPayment.exists({ orderId: order_id });
    if (existingPaymentRecord) {
      res.status(200).json({ message: 'Payment successful' });
      return;
    }
    const orderDetails = (await CashFree.PGOrderFetchPayments(order_id.toString())).data;
    const successfulPayment = orderDetails.find(payment => payment.payment_status === 'SUCCESS');
    if (!successfulPayment) throw new NotFoundError('No successful payment found');
    await TestPayment.create({
      userId: mUser._id,
      testId: testId,
      amount: successfulPayment.payment_amount,
      method: 'ONLINE',
      paymentId: successfulPayment.cf_payment_id,
      orderId: order_id,
    });
    await Test.findByIdAndUpdate(testId, { $inc: { registration: 1 } });
    res.status(200).json({ message: 'Payment successful' });
  } catch (err) {
    next(err);
  }
};

export const PaymentHook = async (req: Request, res: Response) => {
  try {
    const testId = (req as any).params.testId;
    if (!testId) throw new ConflictError('Missing test ID');
    if (!CashFree.PGVerifyWebhookSignature(
      req.headers.get('x-webhook-signature') as string,
      (req as any).body,
      req.headers.get('x-webhook-timestamp') as string
    )) {
      res.status(200).send('Invalid webhook signature');
      return;
    }
    const webhookData = JSON.parse((req as any).body);
    const successfulPayment = webhookData.data.payment;
    if (successfulPayment.payment_status !== 'SUCCESS') {
      res.status(200).send('Payment not successful');
      return;
    }
    const mUser = await User.findById(webhookData.data.customer_details.customer_id).select('_id').lean();
    if (!mUser) {
      res.status(200).send('User not found');
      return;
    }
    const paymentExists = await TestPayment.exists({ testId, userId: mUser._id });
    if (paymentExists) {
      res.status(200).send('Payment already processed');
      return;
    }
    await Promise.all([
      TestPayment.create({
        userId: mUser._id,
        testId,
        amount: successfulPayment.payment_amount,
        method: 'ONLINE',
        paymentId: successfulPayment.cf_payment_id,
        orderId: webhookData.data.order.order_id
      }),
      Test.findByIdAndUpdate(testId, { $inc: { registration: 1 } }),
    ]);
    res.status(200).send('Webhook received');
  } catch (err) {
    res.status(200).send('Error processing webhook');
  }
}; 