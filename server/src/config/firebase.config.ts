import * as admin from 'firebase-admin';

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
