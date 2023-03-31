import { getStorage, ref, uploadBytes } from "firebase/storage";

export const uploadFile = async (file, fileName) => {
  const storage = getStorage();
  const storageRef = ref(storage, `transactions/${fileName}.jpg`);
  return uploadBytes(storageRef, file).then((snapshot) => {
    return snapshot;
  });
};
