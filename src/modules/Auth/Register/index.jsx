import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { signUp } from "../../../services/authservices";
import { AuthPageWrapper } from "../shared-components/AuthPageWrapper";
import { Toast } from "primereact/toast";
import { userDataAtom } from "../../../states/authstates";
import { useAtom } from "jotai";

const Register = () => {
  const [userFormData, setUserFormData] = useState({});
  const [userData, setUserData] = useAtom(userDataAtom);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useRef(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setUserData(await signUp(email, password, userFormData));
    } catch (err) {
      console.log(err);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: err.message,
        life: 3000,
      });
    }
  };
  return (
    <AuthPageWrapper title="Register">
      <Toast ref={toast} />
      <form
        onSubmit={handleSignUp}
        className="flex flex-col gap-8 items-center pt-8"
      >
        <p className="text-center">Your Kindness Journey Starts Here!</p>
        <div className="flex flex-col w-full">
          <label htmlFor="displayName">Name</label>
          <InputText
            id="displayName"
            value={userFormData?.displayName}
            onChange={(e) =>
              setUserFormData({ ...userFormData, displayName: e.target.value })
            }
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            type="email"
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
        <div className="flex flex-col w-full">
          <label htmlFor="address">Address</label>
          <InputTextarea
            id="address"
            value={userFormData?.address}
            onChange={(e) =>
              setUserFormData({ ...userFormData, address: e.target.value })
            }
            rows={3}
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="phone">Phone</label>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">+62</span>
            <InputNumber
              id="phone"
              useGrouping={false}
              value={userFormData?.phone}
              onChange={(e) =>
                setUserFormData({ ...userFormData, phone: e.value })
              }
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full flex justify-center">
          <p>Register</p>
        </Button>
      </form>
    </AuthPageWrapper>
  );
};

export default Register;
