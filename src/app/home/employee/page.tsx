"use client";
import styles from "../page.module.css";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import dashboardStyles from "./dashboard.module.scss";
import Link from "next/link";
import Form from 'react-bootstrap/Form';
import classNames from 'classnames';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { AiOutlineSearch } from 'react-icons/ai'
import React, { ReactNode, createRef, useMemo, useRef, useState } from "react";
import Container from 'react-bootstrap/Container';
import { futuna } from "../../../../public/fonts/futura";
import {
  Button,
  CardHeader,
  CardBody,
  CardImg,
} from "react-bootstrap/";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import axios from "axios";
import { Employee } from "@/models/employee";
import { useQuery } from "react-query";
import { profile } from "console";
import SearchLayout from "@/components/searchLayout1/searchLayout";
import { useRouter } from "next/router";
import { AddResidentIcon } from "@/components/icons";
import { useTranslation } from "react-i18next";
export default function Employee() {
  const [isSearchResult, setIsSearchResult] = useState(false);
  const [t, i18n] = useTranslation();
  const [selectedId, setSelectedId] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const [imageLoaded, setImageLoaded] = useState(true);
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  var loadingMore = useMemo<boolean | undefined>(() => undefined, []);
  var page = useMemo(() => {
    return Math.floor(employeeList.length / 30) + 1;
  }, [employeeList]);
  const [employee, setEmployee] = useState<Array<Employee>>([]);
  const [showDialog, setShowDialog] = useState(false);
  const whiteBackground = {
    backgroundColor: "#E8EAEC",
  };
  const customCardStyle = {
    backgroundColor: "white",

  }
  const retrieveEmployee = async () => {
    try {
      loadingFiler(document.body!);
      const res = await axios.get("/api/employee");
      removeLoadingFilter(document.body!);
      setEmployee(res.data);
      console.log(res.data);
      return res.data;
    } catch (error) {
      removeLoadingFilter(document.body!);
      console.log(error);
    }
  };
  const { isLoading, isError, data, refetch } = useQuery(
    "employee",
    retrieveEmployee,
    {
      staleTime: Infinity,
    }
  );
  const handleSearch = async (e: any) => {
    if (e.key === "Enter") {
      console.log("hah");
      try {
        loadingFiler(document.body!);

        const res = await axios.get("/api/employee/search", {
          params: {
            query: searchRef.current?.value,
          },
        });
        console.log(res.data);

        removeLoadingFilter(document.body!);
        setEmployee(res.data);
        setIsSearchResult(true);
      } catch (e) {
        alert(e);
      }
    }
  };

  const clearSearch = () => {
    setIsSearchResult(false);
    searchRef.current?.focus();

    if (searchRef && searchRef.current) {
      searchRef.current.value = '';
      refetch();
    }
  };

  const renderGender = (gender: string) => {
    return gender === 'male' ? t("male") : t("female");
  };
  const searchIconClick = async () => {
    console.log("hah");
    try {
      const res = await axios.get("/api/employee/search", {
        params: {
          query: searchRef.current?.value,
        },
      });
      console.log(res.data);
      setEmployee(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
 

  return (
    <main className={styles.main}>
        <div className={classNames(dashboardStyles.wrapper, futuna.className)}>
          <h1 className={classNames(dashboardStyles.headingXl)}>{t("Manage Employee")}</h1>
          <div className={classNames(dashboardStyles.header)}>
            <h1 className={classNames(dashboardStyles.headingLg)}>{t("employeelist")}</h1>
            <ButtonComponent
              href="/home/employee/addemployee?auth=true"
              preIcon={<AddResidentIcon width={24} height={24} />}
              className={classNames(dashboardStyles.addBtn, futuna.className)
              }>
            {t("create")}
            </ButtonComponent>
          </div>
          <div className="d-flex w-100 mt-3 justify-content-between">
          <div className={classNames(dashboardStyles.perPage)}>
          </div>
            <SearchLayout
              onKeydown={handleSearch}
              iconClick={searchIconClick}
              placeHolder={t("placefindemployee")}
              ref={searchRef}
              xClick={clearSearch}
            />
          </div>
          <div className={classNames(dashboardStyles.carddiv , futuna.className)}>
            <Row xs={1} md={2} className="g-4">
              {employee.map((employee, idx): ReactNode => {
                const dateOfBirth = new Date(employee.profile.date_of_birth);
                const employeeName = employee.profile.name.toLowerCase();
                const searchTerm = searchRef.current?.value.toLowerCase();
                if (searchTerm && employeeName.includes(searchTerm)) {
                }
                return (
                  <Col key={idx} sm={6} md={4} lg={3} className={dashboardStyles.col}>
                    <Link href={`/home/employee/${employee.id}/?auth=true`} className={dashboardStyles.link}>
                      <Card style={customCardStyle}
                        onMouseEnter={() => setHoveredCard(idx)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className={idx === hoveredCard ? dashboardStyles.hoveredCard : dashboardStyles.card}
                        onClick={() => setShowDialog(true)} >

                        <CardImg
                          alt="..."
                          onLoad={(e: any) => URL.revokeObjectURL(e.target.src)}
                          src={
                            employee.profile.avatarURL
                          }
                          variant="top"
                          height="250"
                          className="img-fluid"
                          style={{ objectFit: 'cover', height: '250px', borderRadius: "60%", padding: '20px' }}
                        ></CardImg>
                        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                          <div className="d-flex justify-content-between">
                          </div>
                        </CardHeader>
                        <CardBody className={classNames(dashboardStyles.ch)}>
                          <Row>
                            <div className="col">
                              <div className="card-profile-stats d-flex justify-content-center">
                                <div className="profile-stat">
                                  <span className="name no-underline"> {t("name")}: </span>
                                  <span className="description no-underline" style={{ marginBottom: '10px' }}>{employee.profile.name}</span>
                                </div>
                              </div>
                            </div>
                          </Row>
                          <div className="text-center">
                            <span className="birth">
                            {t("birthday")}: <span className="ni location_pin mr-2">{dateOfBirth.toLocaleDateString('vi-VN')}</span>

                            </span>
                            <div className="address">

                            {t("gender")}: <span className="ni location_pin mr-2">{renderGender(employee.profile.gender)}</span>
                            </div>
                            <div className="phonenumber">
                            {t("phone_number")}: <span className="ni location_pin mr-2">{employee.profile.phone_number}</span>
                            </div>

                          </div>
                        </CardBody>
                      </Card>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
    </main >
  );
}