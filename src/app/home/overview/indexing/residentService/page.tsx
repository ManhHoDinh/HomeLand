"use client"
import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Invoice } from "../../../../../models/invoice";
import { Button, Container, Row, Table } from "react-bootstrap";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import styles from "../../overview.module.scss";

const ResidentService = () => {
  const [invoices, setInvoice] = useState<Invoice[]>([]);
  useQuery(
    "invoice",
    () =>
      axios.get("/api/invoice/" + "used").then((res) => {
        setInvoice(res.data as Invoice[]);
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  const [t, i18n] = useTranslation();
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <h4>{t("service_use")}</h4>
      <Container style={{padding:0}}>
      
      <Row
        style={{
          borderRadius: "20px",
          paddingTop: "20px ",
        }}
      >
        <Table responsive="sm">
          <thead>
            <tr style={{ width: "100%" }}>
              <th>{t("service_name")}</th>
              <th>{t("servicePackageName")}</th>
              <th>{t("price")}</th>
              <th>{t("create_at")}</th>
              <th>{t("expire_at")}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {invoices ? (
              invoices.map((value, index) => (
                <tr key={index} style={{ cursor: "pointer" }}>
                  <td>{value.servicePackage.service.name}</td>
                  <td>{t(value.servicePackage.name)}</td>
                  <td>{value.total.toLocaleString()} VND</td>

                  <td>
                    {format(new Date(value.created_at), "HH:mm dd/MM/yyyy")}
                  </td>
                  <td>
                    {format(new Date(value.expired_at), "HH:mm dd/MM/yyyy")}
                  </td>
                  <td style={{ width: 100 }}>
                    <div className="d-flex">
                      <Button
                        onClick={() => {
                          router.push(
                            "/home/invoices/" + value.invoice_id + "?auth=true"
                          );
                        }}
                        variant="warning"
                      >
                        {t("detail")}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </Table>
      </Row>
    </Container>
    </div>
  );
};

export default ResidentService;
