import React, { useState, useEffect, useRef } from "react";
import { getTransactions } from "../../../../services/dbservices";
import { downloadFile } from "../../../../services/storageservices";
import dayjs from "dayjs";
import { Toast } from "primereact/toast";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { updateTransaction } from "../../../../services/dbservices";
import { getUsersDataByIds } from "../../../../services/authservices";

const ZakatManagement = () => {
  const toast = useRef(null);
  const [transactionsHistory, setTransactionsHistory] = useState([]);
  const [visible, setVisible] = useState(false);
  const [buktiTransferUrl, setBuktiTransferUrl] = useState("");
  const [usersIds, setUsersIds] = useState([]);
  const [usersData, setUsersData] = useState([]);

  const getMuzzakiIds = () => {
    const users_ids = transactionsHistory.map((doc) => {
      return doc.user_uid;
    });
    setUsersIds(Array.from(new Set(users_ids)));
  };

  const accept = (id) => {
    updateTransaction(id, { status: true })
      .then((res) => {
        console.log(res);
        toast.current.show({
          severity: "info",
          summary: "Confirmed",
          detail: "Pembayaran dikonfirmasi",
          life: 3000,
        });
      })
      .catch((err) => console.log(err));
  };

  const confirm1 = (event, isConfirmed, id) => {
    let popupData = {
      target: event.currentTarget,
      message: "Are you sure you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => accept(id),
    };
    if (!isConfirmed) {
      popupData.message = "Konfirmasi Pembayaran?";
    }
    confirmPopup(popupData);
  };
  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    if (transactionsHistory !== []) {
      getMuzzakiIds();
    }
  }, [transactionsHistory]);
  useEffect(() => {
    if (usersIds.length !== 0) {
      setUsersDataWithId();
    }
  }, [usersIds]);
  const setUsersDataWithId = async () => {
    setUsersData(await getUsersDataByIds(usersIds));
  };
  const getMuzzakiName = (id) => {
    for (let user of usersData) {
      if (user.id === id) {
        return user.userData.displayName;
      }
    }
  };
  const init = async () => {
    try {
      const response = await getTransactions();
      setTransactionsHistory(
        response.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };
  const handleLihatBuktiPembayaran = (str) => {
    setVisible(true);
    downloadFile(str).then((url) => setBuktiTransferUrl(url));
  };
  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header="Header"
        visible={visible}
        className="w-full"
        onHide={() => setVisible(false)}
      >
        <a href={buktiTransferUrl} target="_blank">
          <img src={buktiTransferUrl} alt="" />
        </a>
      </Dialog>
      <table
        className="table-auto border-collapse border-y border-slate-400"
        cellPadding={8}
        border="1"
      >
        <thead>
          <tr>
            <th className="border-y px-4 border-slate-300">No</th>
            <th className="border-y px-8 border-slate-300">Muzzaki</th>
            <th className="border-y px-8 border-slate-300">Bank</th>
            <th className="border-y px-8 border-slate-300">No Rekening</th>
            <th className="border-y px-8 border-slate-300">Jenis Zakat</th>
            <th className="border-y px-8 border-slate-300">Jumlah</th>
            <th className="border-y px-8 border-slate-300">Tanggal</th>
            <th className="border-y px-8 border-slate-300">Bukti Pembayaran</th>
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
                  {getMuzzakiName(transaction.user_uid)}
                </td>
                <td className="border-y border-slate-300 px-8">
                  {transaction.nama_bank.name}
                </td>
                <td className="border-y border-slate-300 px-8">
                  {transaction.no_rekening}
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
                <td className="border-y border-slate-300 px-8">
                  <Button
                    onClick={() =>
                      handleLihatBuktiPembayaran(transaction.bukti_pembayaran)
                    }
                  >
                    Lihat
                  </Button>
                </td>
                <td className={`border-y border-slate-300 px-8 py-2`}>
                  <ConfirmPopup />
                  <Button
                    severity={`${transaction.status ? "primary" : "warning"}`}
                    onClick={(e) =>
                      confirm1(e, transaction.status, transaction.id)
                    }
                    disabled={transaction.status ? true : false}
                  >
                    {transaction.status ? "Confirmed" : "Unconfirmed"}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ZakatManagement;
