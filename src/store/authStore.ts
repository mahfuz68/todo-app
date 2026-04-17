import { create } from "zustand";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import authService from "../services/authService";
import { User } from "../types";

interface AuthState {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  _initialized: boolean;
  initializeAuth: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  firebaseUser: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  _initialized: false,

  initializeAuth: () => {
    const alreadyInitialized = get()._initialized;
    if (alreadyInitialized) {
      return;
    }

    set({ _initialized: true });

    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, "users", firebaseUser.uid);
          let userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            await setDoc(userDocRef, {
              uid: firebaseUser.uid,
              displayName: firebaseUser.displayName || "",
              email: firebaseUser.email,
              photoURL: firebaseUser.photoURL || null,
              role: "member",
              createdAt: new Date(),
              onboardingComplete: true,
              preferences: { theme: "light", notifications: true },
            });
            userDoc = await getDoc(userDocRef);
          }

          const userData = userDoc.exists() ? userDoc.data() : null;

          const user: User = {
            id: firebaseUser.uid,
            name: userData?.displayName || firebaseUser.displayName || "",
            email: firebaseUser.email || "",
            avatar: userData?.photoURL || firebaseUser.photoURL || undefined,
            calendarConnected: userData?.calendarConnected || false,
            fcmToken: userData?.fcmToken || undefined,
          };

          set({ firebaseUser, user, isAuthenticated: true, isLoading: false });
        } catch (err: any) {
          console.error("[Auth] Error loading user:", err.code || err.message);
          set({
            firebaseUser,
            user: {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || "",
              email: firebaseUser.email || "",
            },
            isAuthenticated: true,
            isLoading: false,
          });
        }
      } else {
        set({
          firebaseUser: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    });
  },

  login: async (email, password) => {
    set({ error: null, isLoading: true });

    try {
      const firebaseUser = await authService.login(email, password);

      const userDocRef = doc(db, "users", firebaseUser.uid);
      let userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || "",
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL || null,
          role: "member",
          createdAt: new Date(),
          onboardingComplete: true,
          preferences: { theme: "light", notifications: true },
        });
        userDoc = await getDoc(userDocRef);
      }

      const userData = userDoc.exists() ? userDoc.data() : null;

      const user: User = {
        id: firebaseUser.uid,
        name: userData?.displayName || firebaseUser.displayName || "",
        email: firebaseUser.email || "",
        avatar: userData?.photoURL || firebaseUser.photoURL || undefined,
      };

      set({ firebaseUser, user, isAuthenticated: true, isLoading: false });
      return true;
    } catch (error: any) {
      console.error("[Auth] Login error:", error);
      const errorMessage = authService.getAuthErrorMessage(error);
      set({ error: errorMessage, isLoading: false });
      return false;
    }
  },

  register: async (name, email, password) => {
    set({ error: null, isLoading: true });

    try {
      const firebaseUser = await authService.register(email, password, name);

      const userDocRef = doc(db, "users", firebaseUser.uid);
      await setDoc(userDocRef, {
        uid: firebaseUser.uid,
        displayName: name,
        email: firebaseUser.email,
        photoURL: null,
        role: "member",
        createdAt: new Date(),
        onboardingComplete: true,
        preferences: { theme: "light", notifications: true },
      });

      const user: User = {
        id: firebaseUser.uid,
        name: name,
        email: email,
      };

      set({ firebaseUser, user, isAuthenticated: true, isLoading: false });
      return true;
    } catch (error: any) {
      console.error("[Auth] Register error:", error);
      const errorMessage = authService.getAuthErrorMessage(error);
      set({ error: errorMessage, isLoading: false });
      return false;
    }
  },

  loginWithGoogle: async () => {
    set({ error: null, isLoading: true });

    try {
      const firebaseUser = await authService.loginWithGoogle();

      const userDocRef = doc(db, "users", firebaseUser.uid);
      let userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || "",
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL || null,
          role: "member",
          createdAt: new Date(),
          onboardingComplete: true,
          preferences: { theme: "light", notifications: true },
        });
        userDoc = await getDoc(userDocRef);
      }

      const userData = userDoc.exists() ? userDoc.data() : null;

      const user: User = {
        id: firebaseUser.uid,
        name: userData?.displayName || firebaseUser.displayName || "",
        email: firebaseUser.email || "",
        avatar: userData?.photoURL || firebaseUser.photoURL || undefined,
        calendarConnected: userData?.calendarConnected || false,
        fcmToken: userData?.fcmToken || undefined,
      };

      set({ firebaseUser, user, isAuthenticated: true, isLoading: false });
      return true;
    } catch (error: any) {
      console.error("[Auth] Google login error:", error);
      const errorMessage = authService.getAuthErrorMessage(error);
      set({ error: errorMessage, isLoading: false });
      return false;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
      set({
        user: null,
        firebaseUser: null,
        isAuthenticated: false,
        _initialized: false,
      });
    } catch (error) {
      console.error("[Auth] Logout error:", error);
    }
  },

  resetPassword: async (email) => {
    set({ error: null });
    try {
      await authService.resetPassword(email);
      alert("Password reset email sent! Check your inbox.");
    } catch (error: any) {
      console.error("[Auth] Reset password error:", error);
      set({ error: authService.getAuthErrorMessage(error) });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
