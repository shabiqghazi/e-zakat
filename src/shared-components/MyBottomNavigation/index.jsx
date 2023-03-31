import React, { useState } from "react";

const MyBottomNavigation = () => {
  const [value, setValue] = useState(0);
  return (
    <div
      className="flex w-screen h-16 justify-around border-t border-slate-200 text-gray-700"
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <div
        className={`flex flex-col gap-1 text-sm w-full justify-center active:bg-teal-100 items-center ${
          value === 0 ? "border-b-4 border-teal-500 text-teal-500" : ""
        }`}
        onClick={() => {
          setValue(0);
        }}
      >
        <i className="pi pi-home"></i>
        <p>Home</p>
      </div>
      <div
        className={`flex flex-col gap-1 text-sm w-full justify-center active:bg-teal-100 items-center ${
          value === 1 ? "border-b-4 border-teal-500 text-teal-500" : ""
        }`}
        onClick={() => {
          setValue(1);
        }}
      >
        <i className="pi pi-credit-card"></i>
        <p>Zakat</p>
      </div>
      <div
        className={`flex flex-col gap-1 text-sm w-full justify-center active:bg-teal-100 items-center ${
          value === 2 ? "border-b-4 border-teal-500 text-teal-500" : ""
        }`}
        onClick={() => {
          setValue(2);
        }}
      >
        <i className="pi pi-comment"></i>
        <p>Message</p>
      </div>
      <div
        className={`flex flex-col gap-1 text-sm w-full justify-center active:bg-teal-100 items-center ${
          value === 3 ? "border-b-4 border-teal-500 text-teal-500" : ""
        }`}
        onClick={() => {
          setValue(3);
        }}
      >
        <i className="pi pi-user"></i>
        <p>Profile</p>
      </div>
    </div>
  );
};

export default MyBottomNavigation;
