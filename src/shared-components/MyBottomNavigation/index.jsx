import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
const MyBottomNavigation = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    switch (location.pathname.split("/")[1]) {
      case "zakat":
        setValue(1);
        break;
      case "chat":
        setValue(2);
        break;
      case "profile":
        setValue(3);
        break;
    }
  });

  const menu = [
    {
      id: 0,
      title: "Home",
      icon: "pi pi-home",
      url: "/",
    },
    {
      id: 1,
      title: "Zakat",
      icon: "pi pi-credit-card",
      url: "/zakat",
    },
    {
      id: 2,
      title: "Message",
      icon: "pi pi-comments",
      url: "/chat",
    },
    {
      id: 3,
      title: "Profile",
      icon: "pi pi-user",
      url: "/profile",
    },
  ];
  return (
    <div
      className="flex w-screen h-16 shrink-0 justify-around border-t border-slate-200 text-gray-700"
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      {menu.map((m, index) => (
        <div
          key={index}
          className={`flex flex-col gap-1 text-sm w-full justify-center active:bg-teal-100 items-center ${
            value === m.id ? "border-b-4 border-teal-500 text-teal-500" : ""
          }`}
          onClick={() => {
            navigate(m.url);
            setValue(m.id);
          }}
        >
          <i className={m.icon}></i>
          <p>{m.title}</p>
        </div>
      ))}
    </div>
  );
};

export default MyBottomNavigation;
