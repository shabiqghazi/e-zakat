import { useAtom } from "jotai";
import { totalAmountAtom, zakatTypeAtom } from "../states/zakatstates";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { PaymentMethods } from "../index";

const ZakatCalculate = () => {
  const [jenis_zakat, setJenis_zakat] = useAtom(zakatTypeAtom);
  const [jenis_perhiasan, setJenis_perhiasan] = useState(null);
  const [jenis_pengairan, setJenis_pengairan] = useState(null);
  const [nilai_harta, setNilai_harta] = useState(0);
  const [jumlah_pembayaran, setJumlah_pembayaran] = useAtom(totalAmountAtom);
  const type = [
    { name: "Perhiasan", code: "perhiasan" },
    { name: "Uang", code: "uang" },
    { name: "Pendapatan", code: "hasil_pendapatan" },
    { name: "Hasil Pertanian", code: "hasil_pertanian" },
    { name: "Harta Temuan", code: "harta_temuan" },
    { name: "Hasil Pertambangan", code: "hasil_pertambangan" },
  ];
  const perhiasan = [
    { name: "Emas", code: "emas" },
    { name: "Perak", code: "perak" },
  ];
  const pengairan = [
    { name: "Alami (Sungai, Mata air, dsb)", code: "alami" },
    { name: "Irigasi/disiram", code: "irigasi" },
  ];
  useEffect(() => {
    if (nilai_harta < 84000000) {
      setJumlah_pembayaran(0);
    }
    switch (jenis_zakat?.code) {
      case "perhiasan":
        if (nilai_harta > 84000000) {
          setJumlah_pembayaran(0.025 * nilai_harta);
        }
        break;
      case "uang":
        if (nilai_harta > 84000000) {
          setJumlah_pembayaran(0.025 * nilai_harta);
        }
        break;
      case "hasil_pendapatan":
        if (nilai_harta > 84000000) {
          setJumlah_pembayaran(0.025 * nilai_harta);
        }
        break;
      case "harta_temuan":
        setJumlah_pembayaran(0.2 * nilai_harta);
        break;
      case "hasil_pertanian":
        if (nilai_harta > 84000000) {
          if (jenis_pengairan?.code !== "alami") {
            setJumlah_pembayaran(0.05 * nilai_harta);
          } else {
            setJumlah_pembayaran(0.1 * nilai_harta);
          }
        }
        break;
      case "hasil_pertambangan":
        if (nilai_harta > 84000000) {
          setJumlah_pembayaran(0.025 * nilai_harta);
        }
        break;
    }
  });
  return (
    <>
      <form onSubmit={(e) => e.preventDefault}>
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
          {jenis_zakat?.code === "perhiasan" ? (
            <>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="jenis_perhiasan">Jenis Perhiasan</label>
                <Dropdown
                  value={jenis_perhiasan}
                  onChange={(e) => setJenis_perhiasan(e.value)}
                  options={perhiasan}
                  optionLabel="name"
                  placeholder="Pilih Jenis Perhiasan"
                  className="w-full md:w-14rem"
                />
              </div>
            </>
          ) : (
            ""
          )}
          {jenis_zakat?.code === "hasil_pertanian" ? (
            <>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="jenis_pengairan">Jenis Pengairan</label>
                <Dropdown
                  value={jenis_pengairan}
                  onChange={(e) => setJenis_pengairan(e.value)}
                  options={pengairan}
                  optionLabel="name"
                  placeholder="Pilih Jenis Pengairan"
                  className="w-full md:w-14rem"
                />
              </div>
            </>
          ) : (
            ""
          )}
          {jenis_zakat !== null ? (
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="nilai_harta">Nilai Harta (Jika diuangkan)</label>
              <InputText
                type="number"
                id="nilai_harta"
                value={nilai_harta}
                onChange={(e) => setNilai_harta(e.target.value)}
                required
              />
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-col gap-2 w-full">
            <p>Total Zakat Yang Harus Dibayarkan :</p>
            <p className="text-3xl font-bold text-teal-500 text-end">
              Rp. {jumlah_pembayaran.toFixed(0)}
            </p>
          </div>
        </div>
      </form>
      {jumlah_pembayaran > 0 ? (
        <div className="flex flex-col gap-2 mt-4 justify-end">
          <PaymentMethods />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ZakatCalculate;
