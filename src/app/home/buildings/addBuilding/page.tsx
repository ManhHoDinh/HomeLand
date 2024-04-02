"use client";
import React, { ChangeEvent, useCallback, useState } from "react";
import styles from "./addBuilding.module.scss";
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
type FormValue = {
  name: string;
  address: string;
  maxFloor: string;
  managerId: string;
};
const AddBuilding = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    address: "",
    maxFloor: "",
  });
  const [errors, setErrors] = useState<any>();
  const validation = () => {
    let err = {} as FormValue;

    if (formValue.name === "") {
      err.name = "Field name is required!";
    }
    if (formValue.address === "") {
      err.address = "Field address is required!";
    }
    if (formValue.maxFloor === "") {
      err.maxFloor = "Field max floor is required!";
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
      const form = new FormData();
      form.append("name", formValue.name);
      form.append("address", formValue.address);
      form.append("max_floor", formValue.maxFloor);
      try {
        loadingFiler(document.body!);
        await axios.post("/api/building", form);
        setFormValue({ name: "", address: "", maxFloor: "" });
        removeLoadingFilter(document.body!);
        toastMessage({ type: "success", title: "Create successfully!" });
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
        <p className={clsx(utilStyles.headingXl, styles.title)}>Create Building</p>

        <Form className={clsx(styles.form, futuna.className)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className={styles.label}>Name</Form.Label>
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
            <Form.Label className={styles.label}>Address</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="address"
              value={formValue.address}
              onChange={handleChange}
            />
            {errors && errors.address && (
              <span className={styles.error}>{errors.address}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className={styles.label}>Max Floor</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              name="maxFloor"
              onChange={handleChange}
              value={formValue.maxFloor}
              placeholder=""
            />
            {errors && errors.maxFloor && (
              <span className={styles.error}>{errors.maxFloor}</span>
            )}
          </Form.Group>
          <ButtonComponent onClick={createHandle} className={styles.creatBtn}>
            Create
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
};

export default AddBuilding;
