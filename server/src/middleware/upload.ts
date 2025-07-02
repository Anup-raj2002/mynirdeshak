import multer, { FileFilterCallback } from 'multer';
import { Response, NextFunction } from 'express';
import { config } from '../config/variables.config';
import { AuthRequest } from './auth';
import { AppError, BadRequestError } from './errorHandler';
import path from 'path';
import { v4 as uuid } from 'uuid';
import fs from 'fs';

const profilePhotoStorage = multer.diskStorage({
  destination: (
    req: AuthRequest,
    _file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void,
  ) => {
    const uploadPath = path.resolve(config.photoUploadPath, req.user?.role!);
    if(!fs.existsSync(uploadPath)){
      fs.mkdirSync(uploadPath, { recursive: true});
    }
    cb(null, uploadPath);
  },
  filename: (
    _req: AuthRequest,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) => {
    const sanitizedFileName = file.originalname.replace(/\s/g, '_');
    cb(
      null,
      `${uuid()}.${sanitizedFileName.split('.').pop()}`,
    );
  },
});

const photoFilter = (
  _req: AuthRequest,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new BadRequestError('Invalid file type. Only JPEG, PNG, GIF images are allowed.'),
    );
  }
};

const handleUploadError = (
  err: Error,
  _req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return new BadRequestError('File too large. Maximum size is 5MB for photos and 50MB for PDFs.');
    }
    return new BadRequestError(err.message);
  }

  if (err instanceof AppError) {
    return next(err);
  }

  if (err) {
    return new BadRequestError(err.message);
  }

  next();
  return;
};

export const uploadUserProfile = () => [
  multer({
    storage: profilePhotoStorage,
    fileFilter: photoFilter,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  }).single('photo'),
  handleUploadError,
];