import { Response, NextFunction } from 'express';
import { auth } from '../config/firebase.config';
import { AuthRequest } from '../middleware/auth';
import {
  AppError,
  AuthenticationError,
  AuthorizationError,
  ConflictError,
  NotFoundError,
  BadRequestError,
} from '../middleware/errorHandler';
import { cleanMongoData } from '../services/dataCleaner.service';
import fs from 'fs';
import path from 'path';
import { config } from '../config/variables.config';
import { User } from '../models/user.model';
import { createStudentValidationSchema, createUserValidationSchema, CreateUserInput, UserRoles, deleteUserValidationSchema, DeleteStudent, registerStudentValidationSchema } from '../schemas/user.validator';
import { baseUserValidationSchema } from '../schemas/user.validator';

export const newStudent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user?.uid) {
      throw new BadRequestError('User ID is required');
    }

    await auth.setCustomUserClaims(req.user.uid, { role: UserRoles[0] });
    // const user = await auth.getUser(req.user.uid);  //TODO: Google login
    // const { displayName, photoURL, phoneNumber } = user;

    const mUser = await User.findOne({ uid: req.user.uid }).lean();
    if (mUser) {
      throw new ConflictError('User already registered');
    }

    const validated = await registerStudentValidationSchema.parseAsync(req.body);

    await User.create({
      uid: req.user.uid,
      ...validated,
      role: UserRoles[0],
    });
    res.status(201).json({ message: 'Student role created' });
  } catch (err) {
    next(err);
  }
};

export const getUserDetail = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user?.uid) {
      throw new BadRequestError('User ID is required');
    }

    const firebaseUser = await auth.getUser(req.user.uid);
    let mongoUser = await User.findOne({ uid: req.user.uid }).lean();
    mongoUser = cleanMongoData(mongoUser!);
    if (!mongoUser) {
      throw new NotFoundError('User not found in database');
    }

    return res.status(200).json({
      ...mongoUser,
      email: firebaseUser.email,
      emailVerified: firebaseUser.emailVerified,
      disabled: firebaseUser.disabled,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateUserDetails = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user?.uid) {
      throw new BadRequestError('User ID is required');
    }
    let values: any = await baseUserValidationSchema.partial().parseAsync(req.body);

    const photoFile = req.file;
    const oldUser = await User.findOne({ uid: req.user.uid }).lean();
    if (!oldUser) throw new AuthenticationError();
    if (photoFile) {
      values.photoUrl = `/profiles/${req.user?.role!}/${photoFile.filename}`;
      if (oldUser.photoUrl) {
        try {
          const oldPhotoPath = path.resolve(config.photoUploadPath, req.user?.role!, path.basename(oldUser.photoUrl));
          if (fs.existsSync(oldPhotoPath)) {
            fs.unlinkSync(oldPhotoPath);
          }
        } catch (err) {
          console.warn(`Failed to delete old profile photo: ${config.photoUploadPath + oldUser.photoUrl}`, err);
        }
      }
    }

    const user = await User.findOneAndUpdate(
      { uid: req.user.uid },
      { $set: values },
      { new: true, lean: true }
    );
    
    if (!user) {
      throw new NotFoundError('User not found after update attempt.');
    }
    return res.status(200).json(cleanMongoData(user!));
  } catch (error) {
    const photoFile = req.file;

    if (photoFile) {
      try {
        fs.unlinkSync(path.resolve(photoFile.path));
      } catch (err) {
        console.warn(`Failed to delete photo on error: ${photoFile.path}`, err);
      }
    }
    return next(error);
  }
};

export const createUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    let userDetail: CreateUserInput = await createUserValidationSchema.parseAsync(req.body);

    if (
      (userDetail.role === UserRoles[3] || userDetail.role == UserRoles[2]) &&
      req.user?.role !== UserRoles[3]
    ) {
      throw new AuthorizationError();
    }

    if (userDetail.role === UserRoles[0]) {
      userDetail = await createStudentValidationSchema.parseAsync(req.body);
    }

    const { email, password, ...userData } = userDetail;
    const userCredential = await auth.createUser({
      email: email,
      password: password,
      emailVerified: true,
    });
    const finalUserData = {
      ...userData,
      uid: userCredential.uid,
    };
    await auth.setCustomUserClaims(finalUserData.uid, { role: finalUserData.role });
    await User.create(finalUserData);
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const { email, role, page = '1', limit = '20' } = req.query;

  const pageNumber = Math.max(Number(page) || 1, 1);
  const pageSize = Math.max(Number(limit) || 20, 1);

  try {
    const listAllUsers = async (): Promise<import('firebase-admin').auth.UserRecord[]> => {
      let nextPageToken: string | undefined;
      const users: import('firebase-admin').auth.UserRecord[] = [];
      do {
        const result = await auth.listUsers(1000, nextPageToken);
        users.push(...result.users);
        nextPageToken = result.pageToken;
      } while (nextPageToken);
      return users;
    };

    const allFirebaseUsers = await listAllUsers();

    const requesterRole = req.user?.role;
    const allowedRolesForManager = [UserRoles[0], UserRoles[1]];

    const filteredFirebaseUsers = allFirebaseUsers.filter(user => {
      const userRole = user.customClaims?.role;

      if (
        requesterRole === UserRoles[2] &&
        userRole &&
        !allowedRolesForManager.includes(userRole)
      ) {
        return false;
      }

      const matchesEmail =
        email && typeof email === 'string'
          ? user.email?.toLowerCase().includes(email.toLowerCase())
          : true;

      const matchesRole =
        role && typeof role === 'string'
          ? userRole?.toLowerCase() === role.toLowerCase()
          : true;

      return matchesEmail && matchesRole;
    });

    
    const total = filteredFirebaseUsers.length;
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, total);
    const paginatedFirebaseUsers = filteredFirebaseUsers.slice(startIndex, endIndex);

    const paginatedUids = paginatedFirebaseUsers.map(user => user.uid);

    let mongoUsers = await User.find({ uid: { $in: paginatedUids } }).lean();
    mongoUsers = cleanMongoData(mongoUsers!);

    const firebaseUsersMap = new Map(paginatedFirebaseUsers.map(user => [user.uid, user]));

    const mergedUsers = mongoUsers.map(mongoUser => {
      const firebaseUser = firebaseUsersMap.get(mongoUser.uid);
      return {
        ...mongoUser,
        email: firebaseUser?.email,
        emailVerified: firebaseUser?.emailVerified,
        disabled: firebaseUser?.disabled,
      };
    });

    return res.status(200).json({
      users: mergedUsers,
      pagination: {
        total,
        page: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(total / pageSize),
        hasNextPage: endIndex < total,
        hasPrevPage: startIndex > 0,
      },
    });
  } catch (error) {
    return next(new AppError(`Fetching all users failed with ${error}`, 500));
  }
};

export const deleteUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const details: DeleteStudent = await deleteUserValidationSchema.parseAsync(req.body);
    const userToDelete = await auth.getUser(details.profileUID);
    const userRole = userToDelete.customClaims?.role;

    const allowedRolesForManager = [UserRoles[0], UserRoles[1]];

    if (
      req.user?.role === UserRoles[2] &&
      userRole &&
      !allowedRolesForManager.includes(userRole)
    ) {
      throw new AuthorizationError('Course managers can only delete students and instructors');
    }

    const mongoUserToDelete = await User.findOne({ uid: details.profileUID });

    if (mongoUserToDelete) {
      await mongoUserToDelete.deleteOne();
    }

    try {
      await auth.deleteUser(details.profileUID);
    } catch (firebaseError: any) {
      console.log(firebaseError);
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};