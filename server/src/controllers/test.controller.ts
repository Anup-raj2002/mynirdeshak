import { Response, Request, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { AuthenticationError, AuthorizationError, NotFoundError, ConflictError, AppError, BadRequestError } from '../middleware/errorHandler';
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
import { testAttemptValidationSchema } from '../schemas/testAttempt.validator'
import { UserRoles } from '../schemas/user.validator';

export const getTests = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.query;
    const { role, uid } = req.user!;

    const query: any = {};
    if (name) query.name = { $regex: name, $options: 'i' };
    if (description) query.description = { $regex: description, $options: 'i' };

    const user = await User.findOne({ uid }).select('_id stream').lean();
    if (!user) throw new NotFoundError("User not found");

    // Role-based filtering
    if (role === 'instructor') {
      query.instructorId = user._id;
    } else if (role === 'student') {
      query.stream = (user as any).stream;
    }

    // Fetch tests, populate sessionId for commonName
    const tests = await Test.find(query)
      .populate('sessionId', 'commonName year')
      .lean();

    if (!tests.length) {
      res.status(200).json([]);
      return;
    }

    // For students, strip question details
    if (role === 'student') {
      const studentTests = tests.map(test => ({
        _id: test._id,
        description: test.description,
        stream: test.stream,
        session: test.sessionId,
        startDateTime: test.startDateTime,
        isPublished: test.isPublished,
        sections: test.sections.map((s: any) => ({
          name: s.name,
          questionCount: s.questions.length
        })),
      }));
      res.status(200).json(studentTests);
      return;
    }

    res.status(200).json(cleanMongoData(tests));
  } catch (error) {
    next(error);
  }
};

export const getTestById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { testId } = req.params;
    const mUser = await User.findOne({uid: req.user?.uid}).select('_id').lean();
    if(!mUser) throw new AuthenticationError();

    const test = await Test.findById(testId)
      .populate({
        path: 'sections.questions',
        model: 'Question',
      })
      .lean();
    if (!test) {
      return next(new NotFoundError('Test not found'));
    }
    if(req.user?.role === UserRoles[1] && !test.instructorId.toString() === mUser.id) {
      throw new AuthorizationError('You can only view tests you created.');
    }
    if (req.user?.role === UserRoles[0]) {
      throw new AuthorizationError('Students are not allowed to access test details by ID');
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
    const mUser = await User.findOne({uid:req.user?.uid}).select('_id').lean();
    if(!mUser) throw new AuthenticationError();

    const sections = [
      { name: 'A', questions: [] },
      { name: 'B', questions: [] },
      { name: 'C', questions: [] },
      { name: 'D', questions: [] },
    ];

    const test = await Test.create({
      instructorId: mUser._id,
      sections: sections,
      ...validatedData
    });
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
    const mUser = await User.findOne({uid:req.user?.uid}).select('_id').lean();
    if(!mUser) throw new AuthenticationError();
    if (req.user?.role === 'instructor' && !test.instructorId.toString() === mUser.id) {
      throw new AuthorizationError('You do not have permission to delete this test');
    }
    // Collect all question IDs from all sections
    const allQuestionIds = (test.sections || []).flatMap((section: any) => section.questions || []);
    await Question.deleteMany({ _id: { $in: allQuestionIds } });
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
    const { section, ...questionData } = req.body;
    if (!['A', 'B', 'C', 'D'].includes(section)) {
      throw new BadRequestError('Invalid section. Must be A, B, C, or D.');
    }
    const test = await Test.findById(testId);
    if (!test) throw new NotFoundError('Test not found');
    const sectionObj = test.sections.find(s => s.name === section);
    if (!sectionObj) {
      throw new BadRequestError('Section not found in test.');
    }
    if (sectionObj.questions.length >= 25) {
      throw new BadRequestError('Section already has 25 questions.');
    }
    const newQuestion = await Question.create(questionData);
    sectionObj.questions.push((newQuestion as any)._id);
    await test.save();
    res.status(201).json({
      message: 'Question added successfully',
      question: cleanMongoData(newQuestion.toJSON()),
      section: sectionObj.name,
      totalQuestionsInSection: sectionObj.questions.length,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteQuestionFromTest = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { testId, questionId } = req.params;
    const { section } = req.body;
    if (!['A', 'B', 'C', 'D'].includes(section)) {
      throw new BadRequestError('Invalid section. Must be A, B, C, or D.');
    }
    const test = await Test.findById(testId);
    if (!test) throw new NotFoundError('Test not found');
    // Enforce 100-minute window from startDateTime
    const now = new Date();
    const testStart = new Date(test.startDateTime);
    const testEnd = new Date(testStart.getTime() + 100 * 60000); // 100 minutes in ms
    if (now >= testStart && now <= testEnd) {
      return res.status(403).json({ message: 'Cannot delete questions during the test window (100 minutes from start time).' });
    }
    const sectionObj = test.sections.find(s => s.name === section);
    if (!sectionObj) {
      throw new BadRequestError('Section not found in test.');
    }
    sectionObj.questions = sectionObj.questions.filter(qId => qId.toString() !== questionId);
    await test.save();
    await Question.findByIdAndDelete(questionId);
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
    const test = await Test.findById(testId)
      .populate({ path: 'sections.questions', model: 'Question' })
      .lean();
    if (!test) return next(new NotFoundError('Test not found'));

    const now = new Date();
    if (now < test.startDateTime) {
      return next(new AuthorizationError('Test is not available at this time.'));
    }
    // Flatten all questions from all sections
    const allQuestions = test.sections.flatMap((section: any) => section.questions);
    let score = 0;
    const gradedAnswers = validatedData.answers.map((answer: any) => {
      const question = allQuestions.find((q: any) =>
        q._id.toString() === answer.questionId.toString()
      );
      if (!question) return null;
      // Map selectedOption (shuffled index) to original index using optionMap
      if (!Array.isArray(answer.optionMap) || answer.optionMap.length !== question.options.length) {
        return null; // invalid mapping
      }
      const originalIndex = answer.optionMap[answer.selectedOption];
      const isCorrect = originalIndex === (question as any).correctAnswer;
      if (isCorrect) score += (question as any).points;
      return {
        questionId: answer.questionId,
        selectedOption: answer.selectedOption,
        isCorrect,
      };
    }).filter(Boolean);
    const totalPoints = allQuestions.reduce((acc: any, q: any) => acc + (q as any).points, 0);
    const percentageScore = totalPoints > 0 ? (score / totalPoints) * 100 : 0;
    let attempt = await TestAttempt.findOne({ testId: testId, userId: mUser._id });
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
        optionMap: a.optionMap,
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
    const test = await Test.findOne({ _id: testId, isPublished: true })
      .populate({ path: 'sections.questions', model: 'Question' })
      .lean();
    if (!test) throw new NotFoundError('Test not found');

    const now = new Date();
    if (now < test.startDateTime) {
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

    // Shuffle questions and options per section
    const shuffledSections = test.sections.map((section: any) => {
      const shuffledQuestions = [...section.questions]
        .sort(() => Math.random() - 0.5)
        .map((q: any) => {
          // Shuffle options and create a mapping
          const originalOptions = [...q.options];
          const optionIndices = originalOptions.map((_: any, idx: number) => idx);
          for (let i = optionIndices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [optionIndices[i], optionIndices[j]] = [optionIndices[j], optionIndices[i]];
          }
          const shuffledOptions = optionIndices.map(idx => originalOptions[idx]);
          return {
            _id: q._id,
            question: q.question,
            options: shuffledOptions,
            points: q.points,
            optionMap: optionIndices, // send this to frontend
          };
        });
      return {
        name: section.name,
        questions: shuffledQuestions,
      };
    });
    res.status(200).json({
      testId: test._id,
      description: test.description,
      startDateTime: test.startDateTime,
      sections: shuffledSections,
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
    const mUser = await User.findOne({uid:req.user?.uid}).select('_id').lean();
    if(!mUser) throw new AuthenticationError();
    if (req.user?.role === 'instructor' && !test.instructorId.toString() === mUser.id) {
      throw new AuthorizationError('You cannot modify tests owned by other instructors');
    }
    if (updateData.description !== undefined) test.description = updateData.description;
    if (updateData.isPublished !== undefined) test.isPublished = updateData.isPublished;
    if (updateData.sessionId !== undefined) test.sessionId = updateData.sessionId;
    if (updateData.stream !== undefined) test.stream = updateData.stream;
    if (updateData.sections !== undefined) test.sections = updateData.sections;
    if (updateData.startDateTime !== undefined) test.startDateTime = updateData.startDateTime;
    await test.save();
    res.json(cleanMongoData(test.toJSON()));
  } catch (error) {
    next(error);
  }
};


export const getTestAnalytics = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { testId } = req.params;
    
    const totalStudents = await TestPayment.countDocuments({ testId });
    
    const totalSales = await TestPayment.aggregate([
      { $match: { testId: new Types.ObjectId(testId), method: 'ONLINE' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const byWeek = await TestPayment.aggregate([
      { $match: { testId: new Types.ObjectId(testId) } },
      { $group: {
        _id: { $isoWeek: '$createdAt' },
        count: { $sum: 1 },
        sales: { $sum: '$amount' }
      } },
      { $sort: { '_id': 1 } }
    ]);
    
    const byYear = await TestPayment.aggregate([
      { $match: { testId: new Types.ObjectId(testId) } },
      { $group: {
        _id: { $year: '$createdAt' },
        count: { $sum: 1 },
        sales: { $sum: '$amount' }
      } },
      { $sort: { '_id': 1 } }
    ]);
    
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
    const attempts = await TestAttempt.find({ testId, completedAt: { $ne: null } })
      .populate('userId', 'name uid')
      .lean();
    attempts.sort((a: any, b: any) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime();
    });
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
     
      // if (att.userId && (att.userId as any).uid) {
      //   const firebaseUser = await auth.getUser((att.userId as any).uid);
      //   if (firebaseUser.email) {
      //     sendMail({
      //       to: firebaseUser.email,
      //       subject: `Your Rank for Test ${testId}`,
      //       text: `Hi ${firebaseUser.displayName || ''},\n\nYour rank for the test is ${att.rank}. Your score: ${att.score}.\n\nThank you for participating!`,
      //     });
      //   }
      // }
    }
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

export const createOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const mUser = await User.findOne({ uid: req.user?.uid }).lean();
    if (!mUser) throw new AuthenticationError();
    if (!mUser.contactNumber) throw new ConflictError('User does not have a phone number');
    let orderPayload = {
      order_id: `order_${uuid()}`,
      order_currency: 'INR',
      order_amount: config.price,
      customer_details: {
        customer_id: mUser._id.toString(),
        customer_phone: mUser.contactNumber,
      },
      order_meta: {
        return_url: `${config.domainUrl}/order-success?order_id={order_id}`,
        notify_url: `${config.domainUrl}/api/v1/tests/webhook`,
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
    const mUser = await User.findOne({ uid: req.user?.uid }).select('_id').lean();
    if (!mUser) throw new AuthenticationError();
    const existingPaymentRecord = await TestPayment.findOne({
      $or: [
        { userId: mUser._id },
        { orderId: order_id }
      ]
    });
    if (existingPaymentRecord) {
      res.status(200).json({ message: 'Payment successful' });
      return;
    }
    if (order_id) {
      const orderDetails = (await CashFree.PGOrderFetchPayments(order_id.toString())).data;
      const successfulPayment = orderDetails.find(payment => payment.payment_status === 'SUCCESS');
      if (!successfulPayment) throw new NotFoundError('No successful payment found');
      await TestPayment.create({
        userId: mUser._id,
        amount: successfulPayment.payment_amount,
        method: 'ONLINE',
        paymentId: successfulPayment.cf_payment_id,
        orderId: order_id,
      });
      res.status(200).json({ message: 'Payment successful' });
      return;
    }
    throw new NotFoundError('No payment found');
  } catch (err) {
    next(err);
  }
};

export const PaymentHook = async (req: Request, res: Response) => {
  try {
    const testId = (req as any).params.testId;
    if (!testId) throw new ConflictError('Missing test ID');
    if (!CashFree.PGVerifyWebhookSignature(
      req.headers['x-webhook-signature'] as string,
      (req as any).body,
      req.headers['x-webhook-timestamp'] as string
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

export const getPublicTestById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { testId } = req.params;
    const test = await Test.findById(testId).lean();
    if (!test) {
      return next(new NotFoundError('Test not found'));
    }
    const { questions, ...publicTest } = cleanMongoData(test);
    res.status(200).json(publicTest);
  } catch (error) {
    next(error);
  }
};

export const getPublicTest = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const now = new Date();
    const tests = await Test.find(
      { isPublished: true, endDateTime: { $gt: now } },
      { questions: 0 }
    ).lean();
    res.status(200).json(cleanMongoData(tests));
  } catch (error) {
    next(error);
  }
};

export const grantStudent = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { uid, amount } = req.body;
    if (!uid || !amount) {
      throw new BadRequestError('uid and amount are required');
    }
    if (typeof amount !== 'number' || amount <= 0) {
      throw new BadRequestError('Amount must be a positive number');
    }
    if (!['admin', 'test-manager'].includes(req.user?.role || "")) {
      throw new AuthorizationError();
    }
    const user = await User.findOne({ uid }).select('_id').lean();
    if (!user) {
      throw new NotFoundError('Student not found');
    }
    const existing = await TestPayment.findOne({ userId: user._id, method: 'GRANT' });
    if (existing) {
      throw new ConflictError('Grant already exists for this user');
    }
    const payment = await TestPayment.create({ userId: user._id, amount, method: 'GRANT' });
    res.status(201).json({ success: true, payment });
  } catch (error) {
    next(error);
  }
};