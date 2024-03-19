"use client";
import { HeaderButton } from "./headerButton/headerButton";
import style from "./customHeader.module.css";
import { LoginButton } from "./loginButton/loginButton";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { CustomModal } from "./customModal/customModal";
import { InfoButton } from "../infoButton/InfoButton";
import {
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";
import { stringify } from "querystring";
const CustomHeader = ({ auth }: { auth: boolean }): JSX.Element => {
  const router = useRouter();
  const handleRoute = (href: string) => {
    router.push(href);
  };
  const [t, i18n] = useTranslation();

  function ChangeLanguage(value: string) {
    i18n.changeLanguage(value);
  }

  return (
    <>
      <header
        style={{
          width: "100%",
          height: "130px",
          display: "flex",
          padding: "0 2rem",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className={style.logoContainer}>
          <div className={style.brandLabel}>HomeLand</div>
        </div>
        <div style={{ alignItems: "center" }} className={style.buttonContainer}>
          <Row className="align-items-center">
            <Col>
              {!auth ? (
                <div className={style.menuContainer}>
                  <HeaderButton
                    title={"Home"}
                    hideIcon={true}
                    onClick={() => handleRoute("/home")}
                  />
                  <HeaderButton
                    title={"Apartments"}
                    onClick={() => handleRoute("apartments")}
                  />
                  <HeaderButton
                    title={"Residents"}
                    onClick={() => handleRoute("residents")}
                  />
                  <HeaderButton
                    title={"Services"}
                    onClick={() => handleRoute("services")}
                  />
                  <div className={style.loginContainer}>
                    <LoginButton
                      onClick={() => {
                        router.push("/login");
                      }}
                    ></LoginButton>
                  </div>
                </div>
              ) : (
                <InfoButton></InfoButton>
              )}
            </Col>
            <Col md="auto">
              <Form.Select
                defaultValue="vi"
                onChange={(e) => ChangeLanguage(e.target.value)}
              >
                <option value="vi">Vi</option>
                <option value="en">En</option>
              </Form.Select>
            </Col>
          </Row>
        </div>
      </header>
    </>
  );
};

export default CustomHeader;
