import {
  doc,
  getDoc,
  getDocs,
  query,
  where,
  collection,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  role?: "member" | "admin";
  createdAt?: any;
}

export const userService = {
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    const docSnap = await getDoc(doc(db, "users", uid));
    if (!docSnap.exists()) return null;
    return { uid: docSnap.id, ...docSnap.data() } as UserProfile;
  },

  async getUserProfiles(uids: string[]): Promise<UserProfile[]> {
    if (uids.length === 0) return [];

    const profiles: UserProfile[] = [];
    for (const uid of uids) {
      const profile = await this.getUserProfile(uid);
      if (profile) profiles.push(profile);
    }
    return profiles;
  },

  async searchUsers(searchTerm: string): Promise<UserProfile[]> {
    // Note: Firestore doesn't support full-text search
    // This is a simple implementation - in production you'd use Algolia
    const q = query(
      collection(db, "users"),
      where("email", ">=", searchTerm),
      where("email", "<=", searchTerm + "\uf8ff"),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    })) as UserProfile[];
  },

  async updateUserPreferences(
    uid: string,
    preferences: { theme?: string; notifications?: boolean },
  ): Promise<void> {
    const { updateDoc } = await import("firebase/firestore");
    await updateDoc(doc(db, "users", uid), {
      preferences,
    });
  },

  async updateUserRole(uid: string, role: "member" | "admin"): Promise<void> {
    const { updateDoc } = await import("firebase/firestore");
    await updateDoc(doc(db, "users", uid), { role });
  },

  async completeOnboarding(uid: string): Promise<void> {
    const { updateDoc } = await import("firebase/firestore");
    await updateDoc(doc(db, "users", uid), { onboardingComplete: true });
  },
};

export default userService;
