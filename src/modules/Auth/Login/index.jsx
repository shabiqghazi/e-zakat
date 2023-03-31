import React, { useState } from "react";
import { _signIn } from "../../../services/authservices";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { AuthPageWrapper } from "../shared-components/AuthPageWrapper";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    await _signIn(email, password);
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
        <div>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </AuthPageWrapper>
  );
};

export default Register;
