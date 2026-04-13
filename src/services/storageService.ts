import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  UploadTask,
} from "firebase/storage";
import { storage } from "../lib/firebase";
import { updateProfile } from "firebase/auth";

export interface UploadProgress {
  progress: number;
  bytesTransferred: number;
  totalBytes: number;
}

export const storageService = {
  async uploadAvatar(userId: string, file: File): Promise<string> {
    const storageRef = ref(storage, `avatars/${userId}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  },

  async uploadAvatarWithProgress(
    userId: string,
    file: File,
    onProgress?: (progress: UploadProgress) => void,
  ): Promise<string> {
    const storageRef = ref(storage, `avatars/${userId}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          if (onProgress) {
            onProgress({
              progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
              bytesTransferred: snapshot.bytesTransferred,
              totalBytes: snapshot.totalBytes,
            });
          }
        },
        (error) => {
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.ref);
          resolve(downloadURL);
        },
      );
    });
  },

  async uploadAttachment(taskId: string, file: File): Promise<string> {
    const storageRef = ref(storage, `attachments/${taskId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  },

  async uploadAttachmentWithProgress(
    taskId: string,
    file: File,
    onProgress?: (progress: UploadProgress) => void,
  ): Promise<string> {
    const storageRef = ref(storage, `attachments/${taskId}/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          if (onProgress) {
            onProgress({
              progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
              bytesTransferred: snapshot.bytesTransferred,
              totalBytes: snapshot.totalBytes,
            });
          }
        },
        (error) => {
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.ref);
          resolve(downloadURL);
        },
      );
    });
  },

  async deleteFile(path: string): Promise<void> {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  },

  async deleteAvatar(userId: string): Promise<void> {
    const storageRef = ref(storage, `avatars/${userId}`);
    try {
      await deleteObject(storageRef);
    } catch (error) {
      // Avatar not found or already deleted
    }
  },

  async deleteTaskAttachments(taskId: string): Promise<void> {
    // Note: To delete all files in a folder, you'd need to list them first
    // This is a placeholder - in production, you'd want to track attachment paths
  },
};

export default storageService;
