import { auth } from "../utils/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { registerUser } from "./users";

export const getErrorMessage = (error) => {
  const code = error.code;
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/invalid-credential':
      return 'Invalid credentials.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'This email is already in use.';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/missing-password':
      return 'Please enter your password.';
    case 'auth/invalid-login-credentials':
      return 'Invalid email or password.';
    case 'auth/requires-recent-login':
      return 'For security reasons, please log in again to perform this action.';
    case 'auth/id-token-expired':
      return 'Your session has expired. Please log in again.';
    case 'auth/popup-closed-by-user':
      return 'Popup closed before completing sign in.';
    case 'auth/popup-blocked':
      return 'Sign-in popup was blocked by your browser.';
    case 'auth/popup-request-cancelled':
      return 'Sign-in process was cancelled.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection and try again.';
    default:
      return error.message || 'Something went wrong. Please try again later.';
  }
};

export const signupWithEmail = async (email, password, extraData) => {
  try {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    if (signInMethods.length > 0) {
      throw new Error("Email is already registered");
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await sendEmailVerification(user);
    await registerUser(extraData);
    return user;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (!user.emailVerified) {
      throw new Error("Please verify your email before logging in");
    }
    return user;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const resendVerificationEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user && !user.emailVerified) {
      await sendEmailVerification(user);
      return "Verification email sent!";
    } else if (user && user.emailVerified) {
      throw new Error("Your email is already verified.");
    } else {
      throw new Error("Could not find user to send verification email.");
    }
  } catch (error) {
    throw new Error(getErrorMessage(error));
  } finally {
    if (auth.currentUser) {
      await signOut(auth);
    }
  }
};

export const changeEmail = async (newEmail) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateEmail(user, newEmail);
      await sendEmailVerification(user);
      return "Email updated and verification sent!";
    } catch (error) {
      throw new Error(getErrorMessage(error));
    }
  } else {
    throw new Error("Please log in to update your email");
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Please log in to change your password");
  }
  try {
    const credential = EmailAuthProvider.credential(user.email, oldPassword);
    await reauthenticateWithCredential(user, credential); 
    await updatePassword(user, newPassword);
    return "Password updated successfully!";
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return "Password reset email sent!";
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};