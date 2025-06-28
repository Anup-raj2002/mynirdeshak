import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase.config';
import { UserRoles, UserRole } from '../schemas/user.validator';
import { AuthenticationError, AuthorizationError } from '../middleware/errorHandler';
import { User } from '../models/user.model';

export interface AuthRequest extends Request {
  user?: {
    uid: string;
    role?: UserRole;
  };
}

export const authenticate = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AuthenticationError('No token provided');
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);

    const user = await auth.getUser(decodedToken.uid);
    const customClaims = user.customClaims || {};

    let role = customClaims.role;
    
    if (!role) {
      try {
      const mUser = await User.findOne({ uid: decodedToken.uid }).select('role').lean();
      role = mUser?.role || UserRoles[0]; 
    }
    catch (error) {
      role = UserRoles[0];
      }
     }
    req.user = {
      uid: decodedToken.uid,
      role,
    };

    next();
  } catch (error) {
    next(new AuthenticationError());
  }
};

export const authorize = (roles: UserRole[]) => {
  const normalizedRoles = roles.map((r) => r.toLowerCase());
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    const userRole = req.user?.role?.toLowerCase();
    if (!userRole || !normalizedRoles.includes(userRole)) {
      throw new AuthorizationError();
    }
    next();
  };
};
