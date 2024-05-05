"use client";
import styles from "./page.module.css";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Image,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import Furniture from "../../../../components/apartmentDetail/furniture";
import { futuna } from "../../../../../public/fonts/futura";
import { useEffect, useState } from "react";
import { endpoint } from "@/constraints/endpoints";
import { useQuery } from "react-query";
import axios from "axios";
import Resident from "../../../../components/apartmentDetail/resident";
import { ToastContainer } from "react-toastify";
import toastMessage from "../../../../utils/toast";
import { Invoice } from "../../../../models/invoice";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
export default function Page({ params }: { params: { id: string } }) {
  const [showModal, setShowModal] = useState(false);
  const [t, i18n] = useTranslation();

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = async () => {
    await refetch();
    setShowModal(false);
  };

  const { isLoading, data, isError, refetch } = useQuery(
    "invoice",
    () =>
      axios.get("/api/invoice/" + params.id).then((res) => res.data as Invoice),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (data != null) {
    return (
      <main className={styles.main} style={futuna.style}>
        <div style={{ padding: "50px" }}>
          {/* <h1 style={{ textAlign: "right", paddingRight: "50px" }}>Invoice</h1> */}
          <Container>
            <Row>
              <Col>
              <h2>{t('invoiceTo')}</h2>
                <p>{data.buyer.profile.name}</p>
                <p>
                  {format(
                    new Date(data.buyer.profile.date_of_birth),
                    "dd-MM-yyyy"
                  )}
                </p>
                <p>SDT: {data.buyer.profile.phone_number}</p>
              </Col>
              <Col style={{ textAlign: "right" }}>
                <h2>{t('payTo')}</h2>
                <p>Home Land</p>
                <p>Thu Duc, Ho Chi Minh</p>
                <p>Viet Nam</p>
                <p>homeland@gmail.com</p>
              </Col>
            </Row>
          </Container>
          <Container style={{padding:0}}>
            <Row style={{padding:0}}>
              <Card style={{ width: "100%", height: "100%", padding:0 }}>
                <Card.Header style={{background:"#094DF8", width:"100%", color:"white"}} as="h2">Thông tin đơn hàng</Card.Header>
                <Card.Body>
                  <Container>
                    <Row>
                      <Col>
                        <Row>
                          <Col md={3}>
                            <p>{t("service_name")}:</p>
                          </Col>
                          <Col md={9}>
                            <p>{data.servicePackage.service.name}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={3}>
                            <p>{t("servicePackageName")}:</p>
                          </Col>
                          <Col md={9}>
                            <p>{t(data.servicePackage.name)}</p>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={3}>
                            <p>{t("price")}:</p>
                          </Col>
                          <Col md={9}>
                            <p>{data.servicePackage.per_unit_price}</p>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Row>
                          <Col md={3}>
                            <p>{t("expired_date_number")}:</p>
                          </Col>
                          <Col md={9}>
                            <p>{data.servicePackage.expired_date}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={3}>
                            <p>{t("create_at")}:</p>
                          </Col>
                          <Col md={9}>
                            <p>
                              {format(new Date(data.created_at), "dd-MM-yyyy")}
                            </p>
                          </Col>
                        </Row>

                        <Row>
                          <Col md={3}>
                            <p>{t("expire_at")}:</p>
                          </Col>
                          <Col md={9}>
                            <p>
                              {format(new Date(data.expired_at), "dd-MM-yyyy")}
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                      <Col>
                        {" "}
                        <h4>
                          {t("Amount")}: {data.amount}
                        </h4>
                      </Col>
                      <Col>
                        <h4>
                          {t("total")}:  {data.total.toLocaleString()} VND
                        </h4>
                      </Col>
                    </Row>
                  </Container>
                </Card.Body>
              </Card>
            </Row>
          </Container>
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
      </main>
    );
  }

  if (isLoading)
    return (
      <main className={styles.main} style={futuna.style}>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            margin: "50px 0px",
            justifyContent: "center",
            alignContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Spinner></Spinner>
        </div>
      </main>
    );
  if (isError)
    return (
      <main className={styles.main} style={futuna.style}>
        <div
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignContent: "center",
            flexWrap: "wrap",
          }}
        >
          Co loi
        </div>
      </main>
    );
  return <div></div>;
}
