import React, { useEffect, useState, useRef } from "react";
import { getTransactionsByUser } from "../../services/dbservices";
import dayjs from "dayjs";
import { Toast } from "primereact/toast";

const History = () => {
  const toast = useRef(null);
  const [transactionsHistory, setTransactionsHistory] = useState([]);
  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    try {
      const response = await getTransactionsByUser();
      setTransactionsHistory(
        response.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: err.message,
        life: 3000,
      });
    }
  };
  return (
    <>
      <Toast ref={toast} />
      <table
        className="table-auto border-collapse border-y border-slate-400"
        cellPadding={8}
        border="1"
      >
        <thead>
          <tr>
            <th className="border-y px-4 border-slate-300">No</th>
            <th className="border-y px-8 border-slate-300">Jenis Zakat</th>
            <th className="border-y px-8 border-slate-300">Jumlah</th>
            <th className="border-y px-8 border-slate-300">Tanggal</th>
            <th className="border-y px-8 border-slate-300">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactionsHistory.map((transaction, index) => {
            const date = transaction.waktu_pembayaran.toDate();

            return (
              <tr key={index}>
                <td className="border-y border-slate-300 px-4 font-bold">
                  {index + 1}
                </td>
                <td className="border-y border-slate-300 px-8">
                  {transaction.jenis_zakat.name}
                </td>
                <td className="border-y border-slate-300 px-8">
                  Rp.{transaction.jumlah_pembayaran}
                </td>
                <td className="border-y border-slate-300 px-8">
                  {dayjs(date).format("DD/MM/YYYY")}
                </td>
                <td className={`border-y border-slate-300 px-8 py-2`}>
                  <div
                    className={`text-white px-4 py-2 ${
                      transaction.status ? "bg-teal-500" : "bg-amber-500"
                    }`}
                  >
                    {transaction.status ? "Confirmed" : "Unconfirmed"}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default History;
