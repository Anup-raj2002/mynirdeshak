import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  createTest,
  getTest,
  updateTest,
  deleteTest,
  addQuestionToTest,
  deleteQuestionFromTest,
  startTestAttempt,
  submitTestAttempt,
  getTestResult,
  getTestRankings,
  grantTestToStudent,
  createOrder,
  orderComplete,
  PaymentHook,
  getPublicTest,
} from '../controllers/test.controller';

const testRouter = Router();

testRouter.post('/:testId/webhook', PaymentHook);

// Public test details (no questions)
testRouter.get('/public/:testId', getPublicTest);

testRouter.use(authenticate);

testRouter.post('/:testId/order', authorize(['student']), createOrder);
testRouter.post('/:testId/order/complete', authorize(['student']), orderComplete);
testRouter.post('/:testId/attempt/start', authorize(['student']), startTestAttempt);
testRouter.post('/:testId/attempt/submit', authorize(['student']), submitTestAttempt);
testRouter.get('/:testId/result', authorize(['student']), getTestResult);

testRouter.post('/', authorize(['instructor']), createTest);
testRouter.post('/:testId/grant', authorize(['admin', 'test-manager']), grantTestToStudent);


testRouter.use(authorize(['admin', 'test-manager', 'instructor']));
testRouter.get('/:testId', getTest);
testRouter.patch('/:testId', updateTest);
testRouter.delete('/:testId', deleteTest);
testRouter.post('/:testId/questions', addQuestionToTest);
testRouter.delete('/:testId/questions/:questionId', deleteQuestionFromTest);
testRouter.get('/:testId/rankings', getTestRankings);


export default testRouter; 