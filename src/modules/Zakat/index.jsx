import React, { useState } from "react";
import { useNavigate } from "react-router";
import briLogo from "../../shared-components/bri.png";
import bsiLogo from "../../shared-components/bsi.png";
import { useAtom, useAtomValue } from "jotai";
import { paymentMethodAtom, creditCardAtom } from "./states/zakatstates";
import { userDataAtom } from "../../states/authstates";

export const PaymentMethods = () => {
  const [showPaymentMethods, setShowPaymetMethods] = useState(false);
  const [nama_bank_tujuan, setNama_bank_tujuan] = useAtom(paymentMethodAtom);
  const [no_rekening_tujuan, setNo_rekening_tujuan] = useAtom(creditCardAtom);
  const navigate = useNavigate();
  const handleChoosePaymentMethod = (nama_bank, no_rekening) => {
    setNama_bank_tujuan(nama_bank);
    setNo_rekening_tujuan(no_rekening);
    navigate("/zakat/pay");
  };
  return (
    <>
      <button
        onClick={() => setShowPaymetMethods(!showPaymentMethods)}
        className="flex items-center bg-red-400 text-white"
      >
        <i className="pi pi-credit-card py-6 px-4"></i>
        <p>Pay Your Zakat</p>
      </button>
      <div
        className={`border-gray-500 rounded-lg overflow-hidden duration-300 ${
          showPaymentMethods ? "h-fit p-4 border" : "h-0 p-0 border-0"
        }`}
      >
        <p>Choose Payment Method</p>
        <div className="flex flex-col gap-8">
          <div
            className="flex flex-col py-4 items-center active:bg-blue-300"
            onClick={() =>
              handleChoosePaymentMethod(
                { name: "BRI", code: "bri" },
                "89123981273981"
              )
            }
          >
            <img src={briLogo} className="w-28" alt="" />
            <p>BANK BRI</p>
            <p>89123981273981</p>
            <p>(Shabiq Ghazi Arkaan)</p>
          </div>
          <div
            className="flex flex-col py-4 items-center active:bg-amber-300"
            onClick={() =>
              handleChoosePaymentMethod(
                { name: "BSI", code: "bsi" },
                "7213268583"
              )
            }
          >
            <img src={bsiLogo} className="w-28" alt="" />
            <p>BANK BSI</p>
            <p>7213268583</p>
            <p>(Shabiq Ghazi Arkaan)</p>
          </div>
        </div>
      </div>
    </>
  );
};
const Zakat = () => {
  const userData = useAtomValue(userDataAtom);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col gap-2">
        {/* {console.log(userData)} */}
        {userData?.isAdmin ? (
          <button
            onClick={() => navigate("/zakat/manage")}
            className="flex items-center bg-lime-400 text-white"
          >
            <i className="pi pi-sliders-h py-6 px-4"></i>
            <p>Manage Zakat</p>
          </button>
        ) : (
          ""
        )}
        <button
          onClick={() => navigate("/zakat/calculate")}
          className="flex items-center bg-amber-400 text-white"
        >
          <i className="pi pi-calculator py-6 px-4"></i>
          <p>Calculate Your Zakat</p>
        </button>
        <PaymentMethods />
      </div>
    </>
  );
};

export default Zakat;
