import React, { useRef, useState } from "react";
import { _signIn } from "../../../services/authservices";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { AuthPageWrapper } from "../shared-components/AuthPageWrapper";
import { userDataAtom } from "../../../states/authstates";
import { useAtom } from "jotai";
import { Toast } from "primereact/toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useAtom(userDataAtom);
  const toast = useRef(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setUserData(await _signIn(email, password));
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: err.message,
        life: 3000,
      });
    }
  };
  return (
    <AuthPageWrapper title="Login">
      <Toast ref={toast} />
      <form
        onSubmit={handleSignIn}
        className="flex flex-col gap-8 items-center pt-8"
      >
        <p className="text-center">
          Sign in to enjoy the convenience of donating and access other features
        </p>
        <div className="flex flex-col w-full">
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="password">Password</label>
          <InputText
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full flex justify-center">
          Login
        </Button>
      </form>
    </AuthPageWrapper>
  );
};

export default Register;
