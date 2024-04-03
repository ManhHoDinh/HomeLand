"use client";
import React, { ChangeEvent, useCallback, useState } from "react";
import styles from "../../addFloor/addFloor.module.scss";
import mainStyles from "../../../page.module.css";
import utilStyles from "@/styles/utils.module.scss";
import Form from "react-bootstrap/Form";
import clsx from "clsx";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import Image from "next/image";
import ToastComponent from "@/components/ToastComponent/ToastComponent";
import { futuna } from "../../../../../../public/fonts/futura";
import axios from "axios";
import { Floor } from "@/models/floor";
import { Building } from "@/models/building";
import { useQuery } from "react-query";
import toastMessage from "@/utils/toast";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import { ToastContainer } from "react-toastify";
import SearchDropdown from "@/components/searchDropdown/searchDropdown";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "react-bootstrap";
type FormValue = {
  name: string;
  building_id: string;
  maxApartment: string;
};
export default function UpdateBuilding({ params }: { params: { id: string } }) {
  const [t, i18n] = useTranslation();
  const [formValue, setFormValue] = useState<FormValue>({
    name: "",
    building_id: "",
    maxApartment: "",
  });
  const [errors, setErrors] = useState<any>();
  const [floor, setFloor] = useState<Floor>();
  const validation = () => {
    let err = {} as FormValue;

    if (formValue.name === "") {
      err.name = "Trường tên là bắt buộc!";
    }
    if (formValue.building_id === "") {
      err.building_id = "Trường tòa nhà là bắt buộc!";
    }
    if (formValue.maxApartment === "") {
      err.maxApartment = "Trường số tầng là bắt buộc!";
    }

    return err;
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newObj = { ...formValue, [e.target.name]: e.target.value };
    setFormValue(newObj);
  };

  const createHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      
      const data = {
        name: formValue.name,
        building_id: formValue.building_id,
        max_apartment: formValue.maxApartment,
      };
      try {
        loadingFiler(document.body);
        await axios.patch(`/api/floor/${params.id}`, data);
        removeLoadingFilter(document.body!);
        toastMessage({ type: "success", title: "Update successfully!" });
        refetch();
      } catch (error) {
        removeLoadingFilter(document.body!);
        console.log(error);
        toastMessage({ type: "error", title: "Update fail!" });
      }
    }
  };
  //get detail building
  const retrieveBuilding = async () => {
    try {
      loadingFiler(document.body!);
      const res = await axios.get(`/api/floor/${params.id}`);
      removeLoadingFilter(document.body!);
      const buildingData = res.data as Floor;
      setFloor(buildingData);

      const newformValue: any = {
        name: buildingData.name,
        building_id: buildingData.building.name,
        maxApartment: buildingData.max_apartment,
      };

      setFormValue(newformValue);
      console.log(res.data);
      return res.data;
    } catch (error) {
      removeLoadingFilter(document.body!);
      console.log(error);
    }
  };
  const { isLoading, isError, data, refetch } = useQuery(
    "floor",
    retrieveBuilding,
    {
      staleTime: Infinity,
    }
  );
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
  const [Buildings, setBuildings] = useState<Building[]>([]);
  const [Floors, setFloors] = useState<Floor[]>([]);
  const handleBuildingIdChange = (selectedBuildingId: string) => {
    setFormValue({
      ...formValue,
      building_id: selectedBuildingId,
    });
  };
  const [selectedBuilding, setSelectedBuilding] = useState("");
  if (data) {
    const ContractSortOptions = [
      {
        title: t("building"),
        child: (
          <SearchDropdown
            title={data.building.name?? ""}
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
   
    return (
      <main className={mainStyles.main}>
        <div className={clsx(styles.wapper, futuna.className)}>
          <p className={clsx(utilStyles.headingXl, styles.title)}>
          {t("update_floor")}
          </p>

          <Form className={clsx(styles.form, futuna.className)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className={styles.label}>{t("name")}</Form.Label>
              <Form.Control
                size="lg"
                name="name"
                value={formValue.name}
                onChange={handleChange}
                type="text"
                placeholder="A01..."
              />
              {errors && errors.name && (
                <span className={styles.error}>{errors.name}</span>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className={styles.label}>{t("max_apartment")}</Form.Label>
              <Form.Control
                size="lg"
                type="number"
                name="maxApartment"
                onChange={handleChange}
                value={formValue.maxApartment}
                placeholder=""
              />
              {errors && errors.maxApartment && (
                <span className={styles.error}>{errors.maxApartment}</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">

              <Col>{ContractSortOptions.map((option) => FilterButton(option))}</Col>
              {errors && errors.building_id && (
                <span className={styles.error}>{errors.building_id}</span>
              )}

            </Form.Group>
            <ButtonComponent onClick={createHandle} className={styles.creatBtn}>
            {t("update")}
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

