import { db } from "../config/fbconfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const transactionsDBRef = collection(db, "transactions");

export const addTransaction = (data) => {
  return addDoc(transactionsDBRef, data);
};
export const getTransactions = () => {
  return getDocs(transactionsDBRef);
};
export const getTransaction = (id) => {
  const transactionsRef = doc(db, "transactions", id);
  return getDoc(transactionsRef);
};
export const updateTransaction = (id, data) => {
  const transactionsRef = doc(db, "transactions", id);
  return updateDoc(transactionsRef, data);
};
export const deleteTransaction = (id) => {
  const transactionsRef = doc(db, "transactions", id);
  return deleteDoc(transactionsRef);
};
