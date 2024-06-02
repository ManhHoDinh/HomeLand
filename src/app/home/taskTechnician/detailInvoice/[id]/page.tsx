"use client";
import React, { useRef } from "react";
import mainStyles from "../../../page.module.css";
import clsx from "clsx";
import styles from "./detailInvoice.module.scss";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import { useQuery } from "react-query";
import axios from "axios";
import { Task } from "@/models/task";
import { format } from "date-fns";
import { RepairInvoice } from "@/models/repairInvoice";
import { futuna } from "../../../../../../public/fonts/futura";
import ReactToPrint from "react-to-print";
const DetailRepairInvoice = ({ params }: { params: { id: string } }) => {
  const { data: task } = useQuery({
    queryKey: "detail_repair_invoice",
    queryFn: () =>
      axios.get(`/api/task/${params.id}`).then((res) => {
        const taskData: Task = res.data;
        const invoice = taskData.invoice as RepairInvoice;
        const createdAt = new Date(invoice.created_at);
        const dataInvoice = {
          resident: taskData.complain.resident,
          invoice,
          createdAt,
        };

        return dataInvoice;
      }),
  });
  const component = useRef(null);
  const handlePrint = () => {
    window.print();
  };
  return (
    <main className={clsx(mainStyles.main, futuna.className)}>
      <div className={clsx(styles.wrapper)}>
        <div className={clsx(styles.action)}>
          <ReactToPrint
            trigger={() => (
              <ButtonComponent className={clsx(styles.printBtn)}>
                Print
              </ButtonComponent>
            )}
            content={() => component.current}
          />
        </div>
        <div ref={component} className={clsx(styles.invoiceBody)}>
          <div className={clsx(styles.header)}>
            <div className="d-flex flex-column">
              <span style={{ fontSize: 14 }}>INVOICE TO</span>
              <span style={{ fontSize: 22, fontWeight: 600 }}>
                {task?.resident.profile.name}
              </span>
              <span>{task?.resident.profile.phone_number}</span>
              <span>{task?.resident.account?.email || ""}</span>
            </div>
            <div
              className="d-flex flex-column"
              style={{ alignItems: "flex-end" }}
            >
              <span
                style={{
                  color: "var(--primary)",
                  fontSize: 30,
                  fontWeight: 600,
                }}
              >
                INVOICE
              </span>
              {task && (
                <span>
                  Date Of Invoice:{" "}
                  {format(new Date(task?.createdAt), "dd/MM/yyyy")}
                </span>
              )}
            </div>
          </div>
          <div className={clsx(styles.invoice)}>
            <table>
              <thead>
                <tr>
                  <th>#$</th>
                  <th>DESCRIPTION</th>
                  <th>PRICE</th>
                </tr>
              </thead>
              <tbody>
                {task?.invoice.items.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.content}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={clsx(styles.total)}>
              <span>TOTAL</span>
              <span style={{ marginLeft: 20 }}>{task?.invoice.total} VND</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailRepairInvoice;
