import {
  setDoc,
  doc,
  serverTimestamp,
  getDoc,
  documentId,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { auth } from "../config/fbconfig";
import { db } from "../config/fbconfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const signUp = async (email, password, userData) => {
  return await createUserWithEmailAndPassword(auth, email, password).then(
    async (res) => {
      return saveUser(res.user.uid, userData);
    }
  );
};
export const saveUser = async (id, userData) => {
  userData.isAdmin = false;
  userData.createdAt = serverTimestamp();
  userData.phone = "0" + userData.phone;
  await setDoc(doc(db, "users", id), userData);
  localStorage.setItem("userData", JSON.stringify(userData));
  return userData;
};
export const _signIn = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password).then(
    async (res) => {
      const userData = await getUserData(res.user.auth.currentUser.uid);
      localStorage.setItem("userData", JSON.stringify(userData));
      return userData;
    }
  );
};
export const getUserData = async (id) => {
  const userData = await getDoc(doc(db, "users", id));
  return userData.data();
};
export const getUsersDataByIds = async (ids) => {
  const q = query(collection(db, "users"), where(documentId(), "in", ids));
  const usersData = await getDocs(q);
  const result = usersData.docs.map((doc) => {
    return { id: doc.id, userData: doc.data() };
  });
  return result;
};
export const _signOut = async () => {
  localStorage.removeItem("userData");
  await signOut(auth);
};
