import { auth } from "../config/fbconfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const signUp = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
};
export const _signIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};
export const _signOut = async () => {
  await signOut(auth);
};
