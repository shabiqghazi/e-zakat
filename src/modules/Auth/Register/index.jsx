import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { signUp } from "../../../services/authservices";
import { AuthPageWrapper } from "../shared-components/AuthPageWrapper";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    await signUp(email, password);
  };
  return (
    <AuthPageWrapper title="Register">
      <form
        onSubmit={handleSignUp}
        className="flex flex-col gap-8 items-center pt-8"
      >
        <p className="text-center">Your Kindness Journey Starts Here!</p>
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
          <Button type="submit">Register</Button>
        </div>
      </form>
    </AuthPageWrapper>
  );
};

export default Register;
