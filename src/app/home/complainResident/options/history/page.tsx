"use client"
import styles from "./history.module.scss";
import tableStyles from "../../../../../styles/table.module.scss";
import modalStyles from "../../../../../styles/modal.module.scss";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import {
  AssignIcon,
  BillIcon,
  PaidIcon,
  PayIcon,
  UnpaidIcon,
} from "@/components/icons";
import clsx from "clsx";
import axios from "axios";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import { useState } from "react";
import { futuna } from "../../../../../../public/fonts/futura";
import { Complain, complainStatus } from "@/models/complain";
import { useQuery } from "react-query";
import { format } from "date-fns";
import { UserProfile } from "@/libs/UserProfile";
import { Modal } from "react-bootstrap";
import { RepairInvoice } from "@/models/repairInvoice";

const History = () => {
  const [complains, setComplains] = useState<Array<Complain>>([]);
  const [showModalInvoice, setShowModalInvoice] = useState(false);
  const [invoice, setInvoice] = useState<RepairInvoice>();
  const [selectedId, setSelectedId] = useState<string | undefined>("");
  const titleTable = ["Request date", "Complaint content", "Status", "Bill"];
  const titleInvoice = [
    {
      title: "Description",
      width: "60%",
    },
    {
      title: "Price",
      width: "40%",
    },
  ];
  const { refetch } = useQuery("resident-complains", async () => {
    try {
      const user = UserProfile.getProfile();
      loadingFiler(document.body!);
      const res = await axios.get(`/api/complain/resident/${user.id}`);
      const data: Array<Complain> = res.data;
      setComplains(data);
      removeLoadingFilter(document.body!);
    } catch (err) {
      throw err;
    }
  });
  const rejectHandler = async (id: string | undefined) => {
    if (id) {
      try {
        loadingFiler(document.body!);
        await axios.delete(`/api/complain/${id}`);
        refetch();
        removeLoadingFilter(document.body!);
      } catch (e) {
        removeLoadingFilter(document.body!);
        throw e;
      }
      setShowModalInvoice(false);
    }
  };
  const handleShowInvoice = async (id: string | undefined) => {
    if (id) {
      try {
        loadingFiler(document.body!);
        const res = await axios.get(`/api/repairInvoice/${id}`);
        removeLoadingFilter(document.body!);
        const data: RepairInvoice = res.data;
        setInvoice(data);
        setShowModalInvoice(true);
      } catch (e) {
        removeLoadingFilter(document.body!);
        throw e;
      }
    }
  };
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.header}>Complaint handling information</h3>
      <div className={styles.container}>
        <table className={clsx(tableStyles.table, futuna.className)}>
          <thead>
            <tr>
              {titleTable.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {complains.map((complain, index): React.ReactNode => {
              const time = new Date(complain.created_at);
              const status = complain.status.toLowerCase();
              const createAt = format(time, "dd-MM-yyyy HH:mm:ss");
              return (
                <tr key={index}>
                  <td>{createAt}</td>
                  <td>{complain.content}</td>
                  <td>
                    <span
                      className={clsx(styles.status, {
                        [styles.done]: complain.status === complainStatus.DONE,
                        [styles.pending]:
                          complain.status === complainStatus.PENDING,
                        [styles.received]:
                          complain.status === complainStatus.RECEIVED,
                        [styles.fixing]:
                          complain.status === complainStatus.FIXING,
                        [styles.rejected]:
                          complain.status === complainStatus.REJECTED,
                      })}
                    >
                      {status}
                    </span>
                  </td>
                  <td>
                    {complain.task?.invoice ? (
                      <ButtonComponent
                        className={styles.billBtn}
                        preIcon={<BillIcon width={16} height={16} />}
                        onClick={() => {
                          setSelectedId(complain.complain_id);
                          handleShowInvoice(complain.task?.task_id);
                        }}
                      >
                        Detail bill
                      </ButtonComponent>
                    ) : (
                      <span> Processing...</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal
        dialogClassName={clsx(
          modalStyles.modal,
          futuna.className,
          styles.modal
        )}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModalInvoice}
        onHide={() => setShowModalInvoice(false)}
      >
        <Modal.Header className={modalStyles.modalHeader} closeButton>
          <Modal.Title className={modalStyles.titleModal}>Invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body className={modalStyles.bodyModal}>
          <div className={styles.invoice}>
            <div className={styles.titleInvoice}>
              {titleInvoice.map((item, index) => (
                <span style={{ width: item.width }} key={index}>
                  {item.title}
                </span>
              ))}
            </div>
            <div className={styles.bodyInvoice}>
              {invoice?.items?.map((item, index) => {
                return (
                  <div className={styles.itemLine} key={index}>
                    <span
                      style={{ width: "60%" }}
                      className={clsx(styles.line)}
                    >
                      {item.content}
                    </span>
                    <span
                      style={{ width: "40%" }}
                      className={clsx(styles.line)}
                    >
                      {item.price} VND
                    </span>
                  </div>
                );
              })}
            </div>
            <div className={styles.total}>
              <span>Total</span>
              <span>{invoice?.total} VND</span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className={styles.footerModal}>
          <div
            style={{ width: "50%" }}
            className="d-flex align-items-center justify-content-between"
          >
            <ButtonComponent
              onClick={() => rejectHandler(selectedId)}
              preIcon={<PayIcon width={16} height={16} />}
              className={clsx(styles.modalBtn, styles.rejectBtn)}
            >
              Reject
            </ButtonComponent>
            <ButtonComponent
              preIcon={<PayIcon width={16} height={16} />}
              className={clsx(styles.modalBtn, styles.billBtn)}
            >
              Pay
            </ButtonComponent>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default History;
