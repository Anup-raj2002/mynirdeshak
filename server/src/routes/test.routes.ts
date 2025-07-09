import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  createTest,
  getTestById,
  getTests,
  updateTest,
  deleteTest,
  addQuestionToTest,
  deleteQuestionFromTest,
  startTestAttempt,
  submitTestAttempt,
  getTestResult,
  getTestRankings,
  createOrder,
  orderComplete,
  PaymentHook,
  grantStudent,
  getExamSessions,
  createExamSession,
  uploadTestResult,
} from '../controllers/test.controller';

const testRouter = Router();

testRouter.post('/webhook', PaymentHook);

testRouter.use(authenticate);

testRouter.get('/', getTests);
testRouter.get('/sessions', getExamSessions);

testRouter.post('/order', authorize(['student']), createOrder);
testRouter.get('/order', authorize(['student']), orderComplete);
testRouter.post('/:testId/attempt/start', authorize(['student']), startTestAttempt);
testRouter.post('/:testId/attempt/submit', authorize(['student']), submitTestAttempt);
testRouter.get('/:testId/result', authorize(['student']), getTestResult);

testRouter.post('/', authorize(['instructor']), createTest);
testRouter.post('/grant', authorize(['admin', 'test-manager']), grantStudent);
testRouter.post('/sessions', authorize(['admin', 'test-manager']), createExamSession);

testRouter.use(authorize(['admin', 'test-manager', 'instructor']));
testRouter.get('/:testId', getTestById);
testRouter.patch('/:testId', updateTest);
testRouter.delete('/:testId', deleteTest);
testRouter.post('/:testId/questions', addQuestionToTest);
testRouter.delete('/:testId/questions/:questionId', deleteQuestionFromTest);
testRouter.get('/:testId/rankings', getTestRankings);
testRouter.post('/:testId/result', uploadTestResult);

export default testRouter; 