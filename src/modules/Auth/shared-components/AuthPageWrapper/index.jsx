import React from "react";
import { useNavigate } from "react-router";

export const AuthPageWrapper = ({ children, title }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen">
      <div className="h-16 flex items-center shrink-0 bg-teal-500 text-white">
        <div
          className="flex items-center active:bg-teal-600 h-full"
          onClick={() => navigate("/splash")}
        >
          <i className="pi pi-arrow-left px-4"></i>
        </div>
        <p className="px-2 font-bold">{title}</p>
      </div>
      <div className="flex flex-col p-5 overflow-y-auto grow">{children}</div>
    </div>
  );
};
