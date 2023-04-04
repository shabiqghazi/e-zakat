import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();
export const uploadFile = async (file, fileName) => {
  const storageRef = ref(storage, `transactions/${fileName}.jpg`);
  return uploadBytes(storageRef, file).then((snapshot) => {
    return snapshot;
  });
};
export const downloadFile = async (pathName) => {
  const response = await getDownloadURL(ref(storage, pathName)).then((url) => {
    return url;
  });
  return response;
};
