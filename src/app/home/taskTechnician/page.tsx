"use client";
import React, { FunctionComponent, useState } from "react";
import utilStyles from "@/styles/utils.module.scss";
import styles from "./taskTechnician.module.scss";
import tableStyles from "../../../styles/table.module.scss";
import modalStyles from "../../../styles/modal.module.scss";
import mainStyles from "../page.module.css";
import { futuna } from "../../../../public/fonts/futura";
import clsx from "clsx";
import { Modal, Table } from "react-bootstrap";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import Tippy from "@tippyjs/react/headless";
import { NumericFormat } from "react-number-format";
import {
  AssignIcon,
  BillIcon,
  CloseIcon,
  DetailIcon,
  EditIcon,
  GarbageIcon,
  OptionIcon,
  PaidIcon,
  PlusIcon,
  RejectIcon,
  TrashIcon,
} from "@/components/icons";
import ModalComponent from "@/components/Modal/Modal";
import { ToastContainer } from "react-toastify";
import { format } from "date-fns";
import { Resident } from "@/models/resident";
import Image from "next/image";
import { useQuery } from "react-query";
import axios from "axios";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import { Images } from "../../../../public/images";
import toastMessage from "@/utils/toast";
import { Technician } from "@/models/technician";
import { UserProfile } from "@/libs/UserProfile";
import { Task } from "@/models/task";
import { type } from "os";
import { RepairInvoice } from "@/models/repairInvoice";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
type InvoiceItem = {
  content: string;
  price: number;
};

const TaskTechnician = () => {
  const [t, i18n] = useTranslation();
  const { push } = useRouter();
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [showModalCreateInvoice, setShowModalCreateInvoice] = useState(false);
  const [showModalInvoice, setShowModalInvoice] = useState(false);
  const [invoice, setInvoice] = useState<RepairInvoice>();
  const [selectedId, setSelectedId] = useState("");
  const [lineErrors, setLineErrors] = useState<Array<Number | undefined>>([]);
  const [invoiceItems, setInvoiceItems] = useState<Array<InvoiceItem>>([
    {
      content: "",
      price: 0,
    },
  ]);
  const titleTable = [
    t("Create Date"),
    t("Content"),
    // "Assigner email",
    t("Status"),
    t("Invoice"),
    t("Action"),
  ];
  const titleCreateInvoice = [
    {
      title: t("Description"),
      width: "50%",
    },
    {
      title: t("Price"),
      width: "40%",
    },
    {
      title: t("Action"),
      width: "10%",
    },
  ];
  const titleInvoice = [
    {
      title: t("Description"),
      width: "60%",
    },
    {
      title: t("Price"),
      width: "40%",
    },
  ];
  // const [total, setTotal] = useState(0);
  let total = 0;
  invoiceItems.forEach((item) => {
    total += item.price;
  });

  const createInvoiceHandler = async (task_id: string) => {
    let listErrors:Array<Number | undefined> = [];
    invoiceItems.forEach((item, index) => {
      if (item.content === "") {
      listErrors.push(index);
      }
    });
    setLineErrors(listErrors);
    if (listErrors.length === 0) {
      try {
        await axios.post(`/api/repairInvoice/${task_id}`, invoiceItems);
        refetch();
        setShowModalCreateInvoice(false);
      } catch (err) {
        throw err;
      }
    }
  };
  const handleShowCreateInvoice = async (id: string) => {
    setSelectedId(id);
    setShowModalCreateInvoice(true);
  };
  const handleShowInvoice = async (id: string) => {
    setSelectedId(id);
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
  };
  const doneTaskHandler = async (task_id: string) => {
    try {
      loadingFiler(document.body!);
      await axios.patch(`/api/task/${task_id}/done`);
      refetch();
      removeLoadingFilter(document.body!);
    } catch (e) {
      removeLoadingFilter(document.body!);
      throw e;
    }
  };

  const addLineHandler = () => {
    setInvoiceItems((prev) => [
      ...prev,
      {
        content: "",
        price: 0,
      },
    ]);
  };

  const removeLineHandler = (index: number) => {
    const list = [...invoiceItems];
    list.splice(index, 1);
    setInvoiceItems(list);
  };
  const contentChangeHandler = (value: string, index: number) => {
    const list = [...invoiceItems];
    list[index].content = value;
    setInvoiceItems(list);
  };
  const priceChangeHandler = (value: string, index: number) => {
    let newValue: number;
    if (value === "") newValue = 0;
    else newValue = Number.parseInt(value);
    const list = [...invoiceItems];
    list[index].price = newValue;
    setInvoiceItems(list);
  };
  const redirectDetailPage = (taskId: string) => {
    push(`./taskTechnician/detailInvoice/${taskId}?auth=true`);
  };
  const listOptions = [
    {
      title: "Print Invoice",
      onClick: redirectDetailPage,
    },
    {
      title: "Mark Done",
      onClick: doneTaskHandler,
    },
  ];
  const numberFormat = (x:number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const retrieveTasks = async () => {
    try {
      const user = UserProfile.getProfile();
      loadingFiler(document.body!);
      const res = await axios.get(`/api/task/technician/${user.id}`);
      removeLoadingFilter(document.body!);
      const tasksData: Array<Task> = res.data;
      console.log(tasksData);
      setTasks(tasksData);
      return tasksData;
    } catch (error) {
      removeLoadingFilter(document.body!);
      console.log(error);
    }
  };
  const { isLoading, isError, refetch } = useQuery(
    "tasks-technician",
    retrieveTasks
  );
  return (
    <main className={clsx(mainStyles.main)}>
      <div className={clsx(styles.wrapper, futuna.className)}>
        <h1 className={clsx(utilStyles.headingXl, styles.title)}>
          {t("Received Task")}
        </h1>
        <div className={clsx(styles.header)}>
          <h1 className={clsx(utilStyles.headingLg)}>{t("Task List")}</h1>
        </div>
        <div style={{ overflowX: "auto" }} className="w-100 mt-5">
          <table className={clsx(tableStyles.table, futuna.className)}>
            <thead>
              <tr>
                {titleTable.map((title: String, index) => (
                  <th key={index}>{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 &&
                tasks.map((task, index): React.ReactNode => {
                  const time = new Date(task.complain.created_at);
                  const status = task.status.toLowerCase();
                  const createAt = format(time, "dd-MM-yyyy HH:mm");
                  const resident: Resident = task.complain.resident;
                  const assigner = task.admin || task.manager;
                  console.log(assigner);
                  return (
                    <tr key={index}>
                      <td>{createAt}</td>
                      <td>{task.complain.content}</td>
                      <td>{assigner.account.email}</td>
                      <td>
                        <span
                          className={clsx(styles.status, {
                            [styles.done]: status === "done",
                            [styles.pending]: status === "pending",
                            [styles.processing]: status === "processing",
                            [styles.cancel]: status === "cancel",
                          })}
                        >
                          {t(status)}
                        </span>
                      </td>
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {task.invoice ? (
                          <ButtonComponent
                            preIcon={<BillIcon width={16} height={16} />}
                            className={clsx(styles.cudBtn, styles.invoiceBtn)}
                            onClick={() => handleShowInvoice(task.task_id)}
                          >
                            {t("Invoice")}
                          </ButtonComponent>
                        ) : (
                          <ButtonComponent
                            preIcon={<BillIcon width={16} height={16} />}
                            className={clsx(
                              styles.cudBtn,
                              styles.createInvoiceBtn
                            )}
                            onClick={() =>
                              handleShowCreateInvoice(task.task_id)
                            }
                          >
                            {t("Create Invoice")}
                          </ButtonComponent>
                        )}
                        <Tippy
                          placement="right-start"
                          offset={[0, 0]}
                          interactive
                          render={(attrs) => (
                            <div
                              className={clsx(
                                styles.tippyWrapper,
                                futuna.className
                              )}
                              {...attrs}
                            >
                              {listOptions.map((option, index) => {
                                if (index === 0) {
                                  console.log(task);
                                  if (task.invoice)
                                    return (
                                      <span
                                        onClick={() =>
                                          option.onClick(task.task_id)
                                        }
                                        className={styles.optionItem}
                                        key={index}
                                      >
                                        {option.title}
                                      </span>
                                    );
                                } else
                                  return (
                                    <span
                                      onClick={() =>
                                        option.onClick(task.task_id)
                                      }
                                      className={styles.optionItem}
                                      key={index}
                                    >
                                      {option.title}
                                    </span>
                                  );
                              })}
                            </div>
                          )}
                        >
                          <div className={styles.optionBtn}>
                            <OptionIcon width={16} height={16} />
                          </div>
                        </Tippy>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Modal
        dialogClassName={clsx(
          modalStyles.modal,
          futuna.className,
          styles.modal
        )}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModalCreateInvoice}
        onHide={() => setShowModalCreateInvoice(false)}
      >
        <Modal.Header className={modalStyles.modalHeader} closeButton>
          <Modal.Title className={modalStyles.titleModal}>
            {t(" Create Invoice")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={modalStyles.bodyModal}>
          <div className={styles.titleInvoice}>
            {titleCreateInvoice.map((item, index) => (
              <span style={{ width: item.width }} key={index}>
                {item.title}
              </span>
            ))}
          </div>
          <div className={styles.bodyInvoice}>
            {invoiceItems.map((item, index) => {
              return (
                <div key={index}>
                  <div className={styles.itemLine}>
                    <input
                      value={item.content}
                      className={styles.description}
                      onChange={(e) => {
                        setLineErrors((prev) =>
                          prev.filter((er) => er !== index)
                        );
                        contentChangeHandler(e.target.value, index);
                      }}
                    />
                    <input
                      value={item.price}
                      className={styles.price}
                      onChange={(e) =>
                        priceChangeHandler(e.target.value, index)
                      }
                    />

                    <div
                      onClick={() => removeLineHandler(index)}
                      className={styles.TrashIcon}
                    >
                      <GarbageIcon width={16} height={16} />
                    </div>
                  </div>
                  {lineErrors.includes(index) && (
                    <span className={styles.errors}>
                      {t("Content can not be empty!")}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <ButtonComponent
            onClick={addLineHandler}
            className={styles.addLineBtn}
            preIcon={<PlusIcon width={16} height={16} />}
          >
            {t("Add Empty line")}
          </ButtonComponent>
          <div className={styles.total}>
            <span>{t("Total")}</span>
            <span>{numberFormat(total)} VND</span>
          </div>
        </Modal.Body>
        <Modal.Footer className={modalStyles.footerModal}>
          <ButtonComponent
            className={modalStyles.saveBtn}
            onClick={() => createInvoiceHandler(selectedId)}
          >
            Create
          </ButtonComponent>
        </Modal.Footer>
      </Modal>

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
          <Modal.Title className={modalStyles.titleModal}>
            {t("Invoice")}
          </Modal.Title>
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
                      {numberFormat(item.price)} VND
                    </span>
                  </div>
                );
              })}
            </div>
            <div className={styles.total}>
              <span>{t("Total")}</span>
              <span>{numberFormat(total)} VND</span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default TaskTechnician;
