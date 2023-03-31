import React from "react";
import { _signOut } from "../../services/authservices";
import { useNavigate } from "react-router";
import { Button } from "primereact/button";

const Profile = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await _signOut();
    navigate("/login");
  };
  return <Button onClick={() => handleLogout()}>Logout</Button>;
};

export default Profile;
