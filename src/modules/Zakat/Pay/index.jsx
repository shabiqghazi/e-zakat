import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import {
  paymentMethodAtom,
  creditCardAtom,
  zakatTypeAtom,
  totalAmountAtom,
} from "../states/zakatstates";
import { addTransaction } from "../../../services/dbservices";
import { useAtom } from "jotai";
import { uploadFile } from "../../../services/storageservices";
import { v4 as uuidv4 } from "uuid";
import { serverTimestamp } from "firebase/firestore";
import { Toast } from "primereact/toast";
import { auth } from "../../../config/fbconfig";

const ZakatPay = () => {
  const toast = useRef(null);
  const show = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
    });
  };
  const [jenis_zakat, setJenis_zakat] = useAtom(zakatTypeAtom);
  const [nama_bank, setNama_bank] = useState(null);
  const [nama_bank_tujuan, setNama_bank_tujuan] = useAtom(paymentMethodAtom);
  const [no_rekening_tujuan, setNo_rekening_tujuan] = useAtom(creditCardAtom);
  const [jumlah_pembayaran, setJumlah_pembayaran] = useAtom(totalAmountAtom);
  const [buktiTransaksi, setBuktiTransaksi] = useState("");
  const [transactionData, setTransactionData] = useState({
    keterangan: "",
    no_rekening: "",
  });
  const type = [
    { name: "Perhiasan", code: "perhiasan" },
    { name: "Uang", code: "uang" },
    { name: "Pendapatan", code: "hasil_pendapatan" },
    { name: "Harta Temuan", code: "harta_temuan" },
    { name: "Hasil Pertambangan", code: "hasil_pertambangan" },
  ];
  const banks = [
    { name: "BRI", code: "bri" },
    { name: "BCA", code: "bca" },
    { name: "Mandiri", code: "mandiri" },
    { name: "BNI", code: "bni" },
    { name: "CIMB Niaga", code: "cimb" },
    { name: "BSI", code: "bsi" },
    { name: "Seabank", code: "seabank" },
    { name: "Others", code: "others" },
  ];
  const handleChooseFile = (data) => {
    setBuktiTransaksi(data.target.files[0]);
  };
  const handlePayment = (e) => {
    e.preventDefault();
    uploadFile(buktiTransaksi, uuidv4()).then((res) =>
      addTransaction({
        jenis_zakat,
        jumlah_pembayaran,
        bukti_pembayaran: res.metadata.fullPath,
        nama_bank,
        nama_bank_tujuan,
        no_rekening_tujuan,
        status: false,
        user_uid: auth.currentUser.uid,
        ...transactionData,
        waktu_pembayaran: serverTimestamp(),
      })
        .then((res) => {
          show("success", "Berhasil", "Pembayaran Berhasil");
          setJenis_zakat(null);
          setJumlah_pembayaran(0);
          setBuktiTransaksi("");
          setNama_bank(null);
          setTransactionData({
            keterangan: "",
            no_rekening: "",
          });
          setNama_bank_tujuan(null);
          setNo_rekening_tujuan("");
        })
        .catch((err) => {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: err.message,
            life: 3000,
          });
        })
    );
  };
  return (
    <>
      <form onSubmit={handlePayment}>
        <Toast ref={toast} />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="jenis_zakat">Jenis Zakat</label>
            <Dropdown
              value={jenis_zakat}
              onChange={(e) => setJenis_zakat(e.value)}
              options={type}
              optionLabel="name"
              placeholder="Select Zakat Type"
              className="w-full md:w-14rem"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="jumlah_pembayaran">Jumlah Pembayaran</label>
            <InputText
              id="jumlah_pembayaran"
              value={jumlah_pembayaran}
              onChange={(e) => setJumlah_pembayaran(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="bukti_pembayaran">Bukti Pembayaran</label>
            <input
              type="file"
              name="bukti_transaksi"
              onChange={handleChooseFile}
            />
            {/* <FileUpload
              mode="basic"
              name="demo"
              accept="image/*"
              maxFileSize={1000000}
              onSelect={handleUploadFile}
            /> */}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="nama_bank">Nama Bank</label>
            <Dropdown
              value={nama_bank}
              onChange={(e) => setNama_bank(e.value)}
              options={banks}
              optionLabel="name"
              placeholder="Select Bank Name"
              className="w-full md:w-14rem"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="no_rekening">No Rekening</label>
            <InputText
              id="no_rekening"
              type="number"
              value={transactionData.no_rekening}
              onChange={(e) =>
                setTransactionData({
                  ...transactionData,
                  no_rekening: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="nama_bank_tujuan">Nama Bank Tujuan</label>
            <Dropdown
              value={nama_bank_tujuan}
              onChange={(e) => setNama_bank_tujuan(e.value)}
              options={banks}
              optionLabel="name"
              placeholder="Select Bank Name"
              className="w-full md:w-14rem"
              disabled
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="no_rekening_tujuan">No Rekening Tujuan</label>
            <InputText
              id="no_rekening_tujuan"
              type="number"
              value={no_rekening_tujuan}
              onChange={(e) => setNo_rekening_tujuan(e.target.value)}
              disabled
              required
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="keterangan">Keterangan</label>
            <InputText
              id="keterangan"
              value={transactionData.keterangan}
              onChange={(e) =>
                setTransactionData({
                  ...transactionData,
                  keterangan: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="flex justify-center">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ZakatPay;
