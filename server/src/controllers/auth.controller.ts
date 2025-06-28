import { Response, NextFunction } from 'express';
import { auth } from '../config/firebase.config';
import { AuthRequest } from '../middleware/auth';
import {
  AppError,
  AuthenticationError,
  AuthorizationError,
  ConflictError,
  NotFoundError,
} from '../middleware/errorHandler';
import { cleanMongoData } from '../services/dataCleaner.service';
import fs from 'fs';
import path from 'path';
import { config } from '../config/variables.config';
import { User } from '../models/user.model';
import { createStudentValidationSchema, createUserValidationSchema, CreateUserInput, UserRoles, deleteStudentValidationSchema, DeleteStudent } from '../schemas/user.validator';
import { baseUserValidationSchema } from '../schemas/user.validator';
import { sendMail } from '../services/mail.service';

const generateRandomString = (length: number) => {
  return Math.random().toString(36).substring(2, 2 + length).padEnd(length, 'z');
};

export const newStudent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user?.uid) {
      throw new AppError('User ID is required', 400, true);
    }

    await auth.setCustomUserClaims(req.user.uid, { role: UserRoles[0] });
    const user = await auth.getUser(req.user.uid);
    const { displayName, photoURL, phoneNumber } = user;

    const mUser = await User.findOne({ uid: req.user.uid }).lean();
    if (mUser) {
      throw new ConflictError('User already registered');
    }

    await User.create({
      uid: req.user.uid,
      name: displayName,
      photoUrl: photoURL,
      contactNumber: phoneNumber,
      role: UserRoles[0],
    });
    res.status(201).json({ message: 'Student role assigned and created' });
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
      throw new AppError('User ID is required', 400, true);
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
      throw new AppError('User ID is required', 400, true);
    }
    let values: any = await baseUserValidationSchema.partial().parseAsync(req.body);

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const photoFile = files?.photo ? files.photo[0] : undefined;

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
      throw new AppError('User not found after update attempt.', 404, true);
    }

    return res.status(200).json(cleanMongoData(user!));
  } catch (error) {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const photoFile = files?.photo ? files.photo[0] : undefined;

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
    } else {
      delete (userDetail as any).school;
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

    // Pagination logic
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
    const details: DeleteStudent = await deleteStudentValidationSchema.parseAsync(req.body);
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

    if (!mongoUserToDelete) {
      await auth.deleteUser(details.profileUID);
      return res.status(204).send();
    }

    await mongoUserToDelete.deleteOne();

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

// export const createUsers = async (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//     try {
//       const rawUsersData = req.body;
  
//       if (!Array.isArray(rawUsersData) || rawUsersData.length === 0) {
//         throw new AppError('Invalid input: Expected an array of users.', 400, true);
//       }
  
//       const results = [];
//       const domainUrl = process.env.DOMAIN_URL || "http://localhost:3000";
  
//       for (const userDataFromExcel of rawUsersData) {
//         let firebaseUid = null;
//         let generatedEmail = null;
//         let generatedPassword = null;
//         const providedName = userDataFromExcel.Name || 'Unknown User';
//         const providedEmail = userDataFromExcel.Email;
//         const providedPassword = userDataFromExcel.Password;
//         const providedRole = userDataFromExcel.Role;
//         const providedContactNumber = userDataFromExcel.ContactNumber ? String(userDataFromExcel.ContactNumber) : undefined;
//         const providedSchool = userDataFromExcel.School;
  
//         try {
//           if (!providedName) {
//             throw new AppError('User "Name" is missing in Excel row.', 400, true);
//           }
//           if (!providedRole || !UserRoles.includes(providedRole.toLowerCase())) {
//             throw new AppError(`Invalid or missing "Role" for user ${providedName}. Allowed roles: ${UserRoles.join(', ')}.`, 400, true);
//           }
//           const role = providedRole.toLowerCase();
  
//           if (!providedEmail) {
//             const initials = providedName.split(' ').map((n: string) => n[0]).join('').toLowerCase();
//             const uniquePart = generateRandomString(4);
//             let accessId = `${initials.substring(0, 2)}${uniquePart}`;
//             generatedEmail = `${accessId}learnocept.in`;
//           }
  
//           if (!providedPassword) {
//             const base = providedName.substring(0, Math.min(providedName.length, 3)).toLowerCase();
//             generatedPassword = `${base}${generateRandomString(Math.max(0, 6 - base.length))}`;
//           } else {
//             generatedPassword = String(providedPassword);
//             if (generatedPassword.length < 6) {
//                 throw new Error('Provided password must be at least 6 characters long.');
//             }
//           }
//           const userPayload = {
//             name: providedName,
//             email: generatedEmail,
//             password: generatedPassword,
//             contactNumber: providedContactNumber,
//             role: role,
//             school: providedSchool,
//           };
  
//           let validationResult;
//           if (role === 'student') {
//             validationResult = await createStudentValidationSchema.parseAsync(userPayload);
//           } else {
//             validationResult = await createUserValidationSchema.parseAsync(userPayload);
//           }
  
//           const userRecord = await auth.createUser({
//             email: validationResult.email,
//             password: validationResult.password,
//             emailVerified: true,
//           });
//           firebaseUid = userRecord.uid;

//           let userDocData = {
//             uid: userRecord.uid,
//             name: providedName,
//             role: role,
//             contactNumber: providedContactNumber,
//           };
  
//           if (role === 'student') {
//             Object.assign(userDocData, {
//               school: providedSchool
//             });
//           }
  
//           const newUser = new User(userDocData);
//           await newUser.save();
  
//           results.push({
//             status: 'success',
//             name: providedName,
//             role: role,
//           });
          
//           let message = `Welcome ${role}, your access ID is ${generatedEmail} and password ${generatedPassword}. Please access it here ${domainUrl}`;
//           console.log(message);
//         } catch (error) {
//           if (firebaseUid) {
//             try {
//               await auth.deleteUser(firebaseUid);
//               console.warn(`Rolled back Firebase user ${firebaseUid} due to subsequent error.`);
//             } catch (firebaseError: any) {
//               console.error(`Failed to rollback Firebase user ${firebaseUid}:`, firebaseError.message);
//             }
//           }
//           console.error(`Error processing user ${providedEmail || providedName}:`, error.message);
//           results.push({
//             status: 'error',
//             name: providedName,
//             error: error.message,
//           });
//         }
//       }
  
//       res.status(200).json({ message: 'Bulk user processing complete', results });
  
//     } catch (error) {
//       next(error);
//     }
//   };
