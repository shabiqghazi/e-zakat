import React, { useRef } from "react";
import { _signOut } from "../../services/authservices";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const Profile = () => {
  const toast = useRef(null);
  const handleLogout = async () => {
    try {
      await _signOut();
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
    <>
      <Toast ref={toast} />
      <Button onClick={() => handleLogout()}>Logout</Button>;
    </>
  );
};

export default Profile;
