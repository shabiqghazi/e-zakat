import React, { useState } from "react";
import { _signIn } from "../../../services/authservices";
import { auth } from "../../../config/fbconfig";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { AuthPageWrapper } from "../shared-components/AuthPageWrapper";
import { useAtom } from "jotai";
import { userAtom } from "../../../states/authstates";
import { useNavigate } from "react-router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await _signIn(email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AuthPageWrapper title="Login">
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
