import * as admin from 'firebase-admin';
import { User } from '../models/user.model';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

export const auth = admin.auth();
export const firestore = admin.firestore();

export const verifyToken = async (token: string) => {
  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const getUserRole = async (uid: string) => {
  try {
    const user = await auth.getUser(uid);
    return user.customClaims?.role || null;
  } catch (error) {
    throw new Error('Error fetching user role');
  }
};


const createAdminUser = async () => {
  try {
    // Create the user
    const userRecord = await auth.createUser({
      email: 'admin@test.com',
      password: 'password',
      emailVerified: true,
    });

    // Set custom user claims
    await auth.setCustomUserClaims(userRecord.uid, { role: 'admin' });
    await User.create({
      uid: userRecord.uid,
      name: 'admin',
      role: 'admin',
      contactNumber: '7899874565',
    });

    console.log(`Admin user created with UID: ${userRecord.uid}`);
  } catch (error: any) {
    if (error.code === 'auth/email-already-exists') {
      const existingUser = await auth.getUserByEmail('admin@test.com');
      await auth.setCustomUserClaims(existingUser.uid, { role: 'admin' });
      console.log('Admin role set for existing user.');
    } else {
      console.error('Error creating admin user:', error.message);
    }
  }
};


createAdminUser();
