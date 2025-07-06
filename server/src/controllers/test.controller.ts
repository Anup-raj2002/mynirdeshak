import { Response, Request, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { AuthenticationError, AuthorizationError, NotFoundError, ConflictError, BadRequestError } from '../middleware/errorHandler';
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
import { questionValidationSchema } from '../schemas/question.validator';
import xlsx from 'xlsx';
import { ExamSession } from '../models/examSession.model';

export const getTests = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { role, uid } = req.user!;

    const query: any = {};

    const user = await User.findOne({ uid }).select('_id stream').lean();
    if (!user) throw new NotFoundError("User not found");

    // Role-based filtering
    if (role === 'instructor') {
      query.instructorId = user._id;
    } else if (role === 'student') {
      query.isPublished = true;
      query.stream = (user as any).stream;
    }

    // Fetch tests, populate sessionId for commonName
    const tests = await Test.find(query)
      .populate('sessionId', 'commonName year')
      .sort({createdAt: -1})
      .lean();

    if (!tests.length) {
      res.status(200).json([]);
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
    await Question.deleteMany({ testId });
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
    // const now = new Date();
    // const testStart = new Date(test.startDateTime);
    // if (now >= testStart && test.isPublished) {
    //   throw new AuthorizationError('Cannot add questions after test start');
    // }
    const sectionObj = test.sections.find(s => s.name === section);
    if (!sectionObj) {
      throw new BadRequestError('Section not found in test.');
    }
    if (sectionObj.questions.length >= 25) {
      throw new BadRequestError('Section already has 25 questions.');
    }
    // Validate question data
    const validatedQuestion = await questionValidationSchema.parseAsync(questionData);
    const newQuestion = await Question.create({testId, ...validatedQuestion});
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
    const now = new Date();
    const testStart = new Date(test.startDateTime);
    if (now >= testStart && test.isPublished) {
      throw new AuthorizationError('Cannot delete questions after test start');
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
    const testStart = new Date(test.startDateTime);
    const testEnd = new Date(testStart.getTime() + 100 * 60000); // 100 minutes in ms
    if (now < testStart || now > testEnd) {
      return next(new AuthorizationError('Test is not available at this time.'));
    }
    const FIXED_POINTS = 2;
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
      if (isCorrect) {
        score += FIXED_POINTS;
      } else {
        score -= (1/3);
      }
      return {
        questionId: answer.questionId,
        selectedOption: answer.selectedOption,
        isCorrect,
      };
    }).filter(Boolean);
    // No normalization, use raw score
    let attempt = await TestAttempt.findOne({ testId: testId, userId: mUser._id });
    if (!attempt) {
      attempt = new TestAttempt({
        testId,
        userId: mUser._id,
        answers: validatedData.answers,
        score: score,
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
      attempt.score = score;
      attempt.completedAt = now;
    }
    await attempt.save();
    res.status(200).json({
      score,
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
    const testEndTime = new Date(new Date(test.startDateTime).getTime() + 100 * 60000);
    const now = new Date();
    if (now < test.startDateTime || now > testEndTime) {
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
            optionMap: optionIndices,
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
      endDateTime: testEndTime,
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
      expectedScore: attempt.score,
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
    // const now = new Date();
    // const testStart = new Date(test.startDateTime);
    // if (now >= testStart && test.isPublished) {
    //   throw new AuthorizationError('Cannot update after test start');
    // } //TODO remove comment
    const mUser = await User.findOne({uid:req.user?.uid}).select('_id').lean();
    if(!mUser) throw new AuthenticationError();
    if (req.user?.role === 'instructor' && !test.instructorId.toString() === mUser.id) {
      throw new AuthorizationError('You cannot modify tests owned by other instructors');
    }
    if (updateData.description !== undefined) test.description = updateData.description;
    if (updateData.isPublished !== undefined) test.isPublished = updateData.isPublished;
    if (updateData.sessionId !== undefined) test.sessionId = new Types.ObjectId(updateData.sessionId);
    if (updateData.stream !== undefined) test.stream = updateData.stream;
    if (updateData.sections !== undefined) {
      test.sections = updateData.sections.map((section: any) => ({
        name: section.name,
        questions: (section.questions || []).map((q: any) => new Types.ObjectId(q)),
      }));
    }
    if (updateData.startDateTime !== undefined) test.startDateTime = updateData.startDateTime;
    await test.save();
    res.json(cleanMongoData(test.toJSON()));
  } catch (error) {
    next(error);
  }
};

export const getTestRankings = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { testId } = req.params;

    const attempts = await TestAttempt.aggregate([
      {
        $match: {
          testId: new Types.ObjectId(testId),
          completedAt: { $ne: null }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $lookup: {
          from: 'tests',
          localField: 'testId',
          foreignField: '_id',
          as: 'test'
        }
      },
      { $unwind: '$test' },
      {
        $lookup: {
          from: 'examsessions',
          localField: 'test.sessionId',
          foreignField: '_id',
          as: 'session'
        }
      },
      { $unwind: '$session' },
      {
        $project: {
          score: 1,
          completedAt: 1,
          'user.name': 1,
          'user.uid': 1,
          'user.fatherName': 1,
          'user.motherName': 1,
          'user.contactNumber': 1,
          'test.stream': 1,
          'session.year': 1,
          'session.commonName': 1
        }
      }
    ]);

    attempts.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(a.completedAt || 0).getTime() - new Date(b.completedAt || 0).getTime();
    });

    let currentRank = 1;
    let lastScore = 0;
    let lastTime = 0;
    for (let i = 0; i < attempts.length; i++) {
      const att = attempts[i];
      const currentCompletedTime = new Date(att.completedAt || 0).getTime();
      if (lastScore === att.score && lastTime === currentCompletedTime) {
        att.rank = currentRank;
      } else {
        currentRank = i + 1;
        att.rank = currentRank;
        lastScore = att.score;
        lastTime = currentCompletedTime;
      }
    }

    const stream = attempts[0]?.test?.stream || 'unknown';
    const sessionYear = attempts[0]?.session?.year || 'unknown';
    const commonName = attempts[0]?.session?.commonName || 'Rankings';

    const sheetData = [
      [commonName],
      ['UID', 'Rank', 'Name', 'Score', 'Father Name', 'Mother Name', 'Contact Number'],
      ...attempts.map(att => [
        att.user.uid || '',
        att.rank || '',
        att.user.name || '',
        att.score || '',
        att.user.fatherName || '',
        att.user.motherName || '',
        att.user.contactNumber || '',
      ])
    ];

    const ws = xlsx.utils.aoa_to_sheet(sheetData);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Ranking');
    const buf = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

    const fileName = `test-ranking-${stream}-${sessionYear}.xlsx`;
    res.statusCode = 200;
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/vnd.ms-excel');
    res.end(buf);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const mUser = await User.findOne({ uid: req.user?.uid }).lean();
    const {phone} = req.body;
    if (!mUser) throw new AuthenticationError();
    if (!mUser.contactNumber) mUser.contactNumber = phone;
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
    ]);
    res.status(200).send('Webhook received');
  } catch (err) {
    res.status(200).send('Error processing webhook');
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

export const getExamSessions = async (_req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const sessions = await ExamSession.find({}, { _id: 1, commonName: 1, year: 1 })
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json(sessions);
  } catch (error) {
    next(error);
  }
};

export const createExamSession = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { commonName, year } = req.body;
    if (!commonName || !year) {
      throw new BadRequestError('commonName and year are required');
    }
    const existing = await ExamSession.exists({ year }).lean();
    if (existing) {
      throw new ConflictError('Session for this year already exists');
    }
    const session = await ExamSession.create({ commonName, year });
    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
};