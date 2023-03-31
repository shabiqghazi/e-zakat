import React from "react";
import { useNavigate } from "react-router";
import HomeBanner from "../../shared-components/home-banner.png";
import { useNavigate } from "react-router";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-5 relative">
        <img src={HomeBanner} className="w-full" alt="" />
        <p className="absolute -bottom-4 shadow-xl right-0 text-white bg-teal-500 max-w-[250px] px-5 py-2 rounded-tr-3xl rounded-b-3xl">
          Welcome back, <br />
          <span className="font-bold">Shabiq Ghazi Arkaan</span>
        </p>
      </div>
      <div className="flex flex-col mt-12 w-full gap-2">
        <button
          className="flex flex-col gap-2 items-center w-full py-4 justify-center text-white bg-amber-400"
          onClick={() => navigate("/zakat/calculate")}
        >
          <i className="pi pi-calculator" style={{ fontSize: "20pt" }}></i>
          <p>Calculate Your Zakat</p>
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="flex flex-col gap-2 items-center w-full py-4 justify-center text-white bg-lime-400"
            onClick={() => navigate("/history")}
          >
            <i className="pi pi-history" style={{ fontSize: "20pt" }}></i>
            <p>History</p>
          </button>
          <button onClick={() => navigate("/faq")} className="flex flex-col gap-2 items-center w-full py-4 justify-center text-white bg-red-400">
            <i
              className="pi pi-question-circle"
              style={{ fontSize: "20pt" }}
            ></i>
            <p>FAQ</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Homepage;
