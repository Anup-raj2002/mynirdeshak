import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { AppError, errorHandler } from './middleware/errorHandler';
import { loggerMiddleware } from './middleware/logger';
import helmet from 'helmet';
import { config } from './config/variables.config';
import { rateLimiter } from './services/rateLimiter.service';
import authRouter from './routes/auth.routes';
import testRouter from './routes/test.routes';

const app = express();
app.set('trust proxy', 1);

app.use(helmet());
app.use(
  cors({
    origin: config.domainUrl,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'uid'],
    credentials: true,
  }),
);
app.use('/v1/testId/:id/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware());

app.use('/v1', rateLimiter);

if (config.nodeEnv === 'development') {
  app.use('/profiles', express.static(config.photoUploadPath, {
    setHeaders: (res) => {
      res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    }
  }));
}

app.use('/v1/auth', authRouter);
app.use('/v1/tests', testRouter);

app.use((req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404, true));
});

app.use(errorHandler);

export default app;
