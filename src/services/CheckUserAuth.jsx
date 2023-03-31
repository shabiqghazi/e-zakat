import React, { useEffect } from "react";
import { auth } from "../config/fbconfig";
import { useAtomValue } from "jotai";
import { userAtom } from "../states/authstates";
import { useNavigate, useLocation } from "react-router";
export const CheckUserAuth = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    console.log(auth.currentUser);
    if (auth.currentUser === null) {
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
        location.pathname === "/register"
      ) {
        navigate("/");
      }
    }
  });
  return <>{children}</>;
};
