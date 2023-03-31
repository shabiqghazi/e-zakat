import React from "react";
import splash from "../../shared-components/splash.png";
import { useNavigate } from "react-router";

const Splash = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen justify-evenly p-5 bg-teal-500">
      <p className="text-2xl font-bold text-center text-white">Zakat</p>
      <img src={splash} alt="" />
      <div className="flex flex-col gap-4">
        <button
          className="border-white border-2 py-3 rounded-lg text-white shadow-lg"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="bg-white rounded-lg py-3 text-teal-500 shadow-lg"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Splash;
