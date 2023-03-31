import React from "react";
import logo from "../Vector.svg";
import MyBottomNavigation from "../MyBottomNavigation";

export const PageWrapper = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="h-16 flex items-center shrink-0 bg-teal-500 text-white">
        <div className="flex items-center active:bg-teal-600 h-full ">
          <img src={logo} className="px-4 w-14" />
        </div>
      </div>
      <div className="flex flex-col p-5 overflow-y-auto grow">{children}</div>
      <MyBottomNavigation />
    </div>
  );
};
