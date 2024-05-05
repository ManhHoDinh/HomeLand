"use client";
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useCallback, useState } from "react";
import styles from "./addFloor.module.scss";
import mainStyles from "../../page.module.css";
import utilStyles from "@/styles/utils.module.scss";
import Form from "react-bootstrap/Form";
import clsx from "clsx";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import Image from "next/image";
import ToastComponent from "@/components/ToastComponent/ToastComponent";
import { futuna } from "../../../../../public/fonts/futura";
import axios from "axios";
import toastMessage from "@/utils/toast";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import { ToastContainer } from "react-toastify";
import { Building } from "@/models/building";
import SearchDropdown from "@/components/searchDropdown/searchDropdown";
import { Floor } from "@/models/floor";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
type FormValue = {
  name: string;
  building_id: string;
  maxApartment: string;
};
export default function AddFloor() {
  const [formValue, setFormValue] = useState({
    name: "",
    building_id: "",
    maxApartment: "",
  });
  const [errors, setErrors] = useState<any>();
  const validation = () => {
    let err = {} as FormValue;

    if (formValue.name === "") {
      err.name = "Trường tên là bắt buộc!";
    }
    if (formValue.building_id === "") {
      err.building_id = "Trường địa chỉ là bắt buộc!";
    }
    if (formValue.maxApartment === "") {
      err.maxApartment = "Trường số tầng là bắt buộc!";
    }
    return err;
  };
  const [t, i18n] = useTranslation();
  const [Buildings, setBuildings] = useState<Building[]>([]);
  const [Floors, setFloors] = useState<Floor[]>([]);
  const handleBuildingIdChange = (selectedBuildingId: string) => {
    setFormValue({
      ...formValue,
      building_id: selectedBuildingId,
    });
  };
  const ContractSortOptions = [
    {
      title: t("building"),
      child: (
        <SearchDropdown
          title={"Choose Building"}
          selections={Buildings.map((building) => building.name)}
          onChange={(index) => {
            handleBuildingIdChange(Buildings[index].building_id);
            setFloors(Buildings[index].floors);
          }}
          style={{ width: "100%" }}
          className={styles.dropdownWrapper}
        ></SearchDropdown>
      ),
    },
  ];
  useQuery(
    "building",
    () =>
      axios.get("/api/building").then((res) => {
        setBuildings(res.data as Building[]);
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  const router = useRouter();
  const [selectedBuildingId, setSelectedBuildingId] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newObj = { ...formValue, [e.target.name]: e.target.value };
    setFormValue(newObj);
  };

  const createHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('createHandle called');
    console.log('formValue:', formValue);
    const err = validation();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      const selectedBuilding = Buildings.find(building => building.building_id === formValue.building_id);
      if (selectedBuilding) {
        if (selectedBuilding.floors.length > selectedBuilding.max_floor) {
          toastMessage({ type: "error", title: "Số lượng tầng đã đạt tối đa trong building này" });
          return;
        }
      }
      const form = new FormData();
      form.append("name", formValue.name);
      form.append("building_id", formValue.building_id);
      form.append("max_apartment", formValue.maxApartment);
      try {
        loadingFiler(document.body!);
        await axios.post("/api/floor", form);
        setFormValue({ name: "", building_id: "", maxApartment: "" });
        removeLoadingFilter(document.body!);
        toastMessage({ type: "success", title: "Create successfully!" });
        setTimeout(() => {
          router.push('/home/floor?auth=true');
        }, 2000);
      } catch (e) {
        console.log(e);
        removeLoadingFilter(document.body!);
        toastMessage({ type: "error", title: "Create faily!" });
      }
    }
  };
  return (
    <main className={mainStyles.main}>
      <div className={clsx(styles.wapper, futuna.className)}>
        <p className={clsx(utilStyles.headingXl, styles.title)}> {t("create_floor")}</p>

        <Form className={clsx(styles.form, futuna.className)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className={styles.label}>  {t("name")}</Form.Label>
            <Form.Control
              size="lg"
              name="name"
              value={formValue.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter floor name"
            />
            {errors && errors.name && (
              <span className={styles.error}>{errors.name}</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className={styles.label}> {t("max_apartment")}</Form.Label>
            <Form.Control
              size="lg"
              type="number"
              name="maxApartment"
              onChange={handleChange}
              value={formValue.maxApartment}
              placeholder=""
            // pattern="[0-9]*" 
            // title="Chỉ được nhập số" 
            />
            {errors && errors.maxApartment && (
              <span className={styles.error}>{errors.maxApartment}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Row>
              <Col xs={12} sm={8} md={6} lg={8}>
                {ContractSortOptions.map((option) => FilterButton(option))}
              </Col>
              {errors && errors.building_id && (
                <Col xs={12} sm={4} md={6} lg={8}>
                  <span className={styles.error}>{errors.building_id}</span>
                </Col>
              )}
            </Row>
          </Form.Group>
          <ButtonComponent onClick={createHandle} className={styles.creatBtn}>
          {t("create")}
          </ButtonComponent>
        </Form>
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
const FilterButton = ({
  title,
  child,
  required,
}: {
  title: string;
  child?: React.ReactNode;
  required?: boolean;
}): React.ReactNode => {
  return (
    <Container
      className={` ${futuna.className}`}
      style={{ padding: 0, margin: "10px 0" }}
    >
      <Row className="align-items-center">
        <Col md="auto">
          <p
            style={{
              width: "100px",
              alignItems: "center",
              display: "flex",
              padding: 0,
              margin: 0,
              marginRight: "20px",
            }}
            className={required ? styles.required : styles.non}
          >
            {title}
          </p>
        </Col>
        <Col
          style={{
            width: "100px",
            alignContent: "center",
            display: "flex",
            padding: 0,
            height: "50px",
            margin: 0,
          }}
        >
          {child}
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

