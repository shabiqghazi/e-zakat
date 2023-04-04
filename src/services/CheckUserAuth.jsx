import React, { useEffect } from "react";
import { auth } from "../config/fbconfig";
import { useNavigate, useLocation } from "react-router";
import { onAuthStateChanged } from "firebase/auth";
import { getUserData } from "./authservices";
import { useAtom } from "jotai";
import { userDataAtom } from "../states/authstates";

export const CheckUserAuth = ({ children, adminOnly }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useAtom(userDataAtom);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      setUserData(user);
    }
  }, [location]);
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      if (
        location.pathname !== "/splash" &&
        location.pathname !== "/login" &&
        location.pathname !== "/register"
      ) {
        navigate("/login");
      }
    } else {
      if (
        location.pathname === "/splash" ||
        location.pathname === "/login" ||
        location.pathname === "/register" ||
        (!userData.isAdmin && adminOnly === true)
      ) {
        navigate("/");
      }
    }
  });

  // useEffect(() => {
  //   console.log(auth.currentUser);
  //   if (auth.currentUser === null) {
  //   } else {
  //     if (
  //       location.pathname === "/splash" ||
  //       location.pathname === "/login" ||
  //       location.pathname === "/register"
  //     ) {
  //       n;
  //     }
  //   }
  // });

  return <>{children}</>;
};
