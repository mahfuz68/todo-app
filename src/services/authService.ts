import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  AuthError,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

const googleProvider = new GoogleAuthProvider();

export const authService = {
  async register(
    email: string,
    password: string,
    displayName: string,
  ): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const user = userCredential.user;

    await updateProfile(user, { displayName });

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      displayName,
      email: user.email,
      photoURL: null,
      role: "member",
      createdAt: serverTimestamp(),
      onboardingComplete: false,
      preferences: {
        theme: "light",
        notifications: true,
      },
    });

    return user;
  },

  async login(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return userCredential.user;
  },

  async loginWithGoogle(): Promise<User> {
    const userCredential = await signInWithPopup(auth, googleProvider);

    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "member",
        createdAt: serverTimestamp(),
        onboardingComplete: true,
        preferences: {
          theme: "light",
          notifications: true,
        },
      });
    }

    return user;
  },

  async logout(): Promise<void> {
    await signOut(auth);
  },

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  },

  getAuthErrorMessage(error: any): string {
    console.error("Auth error:", error);

    if (!error || !error.code) {
      return "An unexpected error occurred";
    }

    switch (error.code) {
      case "auth/invalid-email":
        return "Invalid email address";
      case "auth/user-disabled":
        return "This account has been disabled";
      case "auth/user-not-found":
        return "No account found with this email";
      case "auth/wrong-password":
        return "Incorrect password";
      case "auth/email-already-in-use":
        return "Email already registered";
      case "auth/weak-password":
        return "Password must be at least 6 characters";
      case "auth/too-many-requests":
        return "Too many attempts. Please try again later";
      case "auth/popup-closed-by-user":
        return "Sign in was cancelled";
      case "auth/network-request-failed":
        return "Network error. Please check your connection";
      case "auth/internal-error":
        return "Internal error. Please try again";
      default:
        return `Error: ${error.message || error.code}`;
    }
  },
};

export default authService;
