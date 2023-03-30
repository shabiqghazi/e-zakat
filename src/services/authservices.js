import { atom } from "jotai";
import { auth } from "../config/fbconfig";

const email = atom("");
const password = atom("");

export const signUpAtom = atom(async (get) => {
  await createUserWithEmailAndPassword(auth, get(email), get(password));
});
export const logInAtom = atom(async (get) => {
  await signInWithEmailAndPassword(auth, get(email), get(password));
});
export const logOutAtom = atom(async () => {
  await signOut(auth);
});
