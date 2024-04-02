"use client";
import {
  Button,
  Form,
  FormGroup,
  Image,
  InputGroup,
  Modal,
  Spinner,
} from "react-bootstrap";
import styles from "./add.module.css";
import { futuna } from "../../../../../../public/fonts/futura";
import {
  FaBed,
  FaCheckCircle,
  FaList,
  FaPersonBooth,
  FaShower,
  FaSquare,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import DragDropFileInput from "@/components/dragDropFileInput/drapDropFileInput";
import { Person } from "@/models/person";
import { useEffect, useRef, useState } from "react";
import SearchBar from "@/components/searchBar/searchBar";
import { useQuery } from "react-query";
import axios from "axios";
import toastMessage from "../../../../../utils/toast";
import { loadingFiler, removeLoadingFilter, search } from "@/libs/utils";
import { useRouter } from "next/navigation";
import { Service } from "../../../../../models/service";
import { useTranslation } from "react-i18next";

export default function UpdateService({ params }: { params: { id: string } }) {
  const [selectedFiles, setSelectedFiles] = useState<(File | URL)[]>([]);
  function handleFileChange(files: (File | URL)[]): void {
    setSelectedFiles(files);
  }
  const router = useRouter();
  function missingField(element: HTMLElement) {
    element.className = element.className.split("missing")[0];
    element.className += " " + styles.missing;
    element.onfocus = () => {
      element.className = element.className.split("missing")[0];
      element.onfocus = null;
    };
  }
  const { isLoading, data, isError, refetch } = useQuery(
    "service",
    () =>
      axios.get("/api/service/" + params.id).then((res) => res.data as Service),
    {
      refetchOnWindowFocus: false,
    }
  );
  const [t, i18n] = useTranslation();

  function validateData() {
    let flag: boolean = true;
    const field = ["name"];
    const grid = document.getElementById("imageBlobGrid");
    if (!grid) {
      missingField(document.getElementById("label-file-upload")!);
      flag = false;
    }

    field.forEach((element) => {
      const inputElement = document.getElementById(element) as HTMLInputElement;
      if (inputElement.value.length === 0) {
        missingField(inputElement);
        flag = false;
      }
    });
    return flag;
  }
  async function addImage(data: FormData, fileList: (File | URL)[]) {
    for await (const iterator of fileList) {
      if (iterator instanceof URL) data.append("images", iterator.href);
      else data.append("images", iterator);
    }
    return data;
  }
  async function handleSubmit() {
    loadingFiler(document.body!);
    console.log("submit");
    if (!validateData()) {
      removeLoadingFilter(document.body!);
      return;
    }
    const data = new FormData();

    console.log("no error");
    data.append(
      "name",
      (document.getElementById("name") as HTMLInputElement).value
    );
    data.append(
      "description",
      (document.getElementById("description") as HTMLInputElement).value
    );
    await addImage(data, selectedFiles).then(async () => {
      console.log(data.get("images"));
      await axios
        .patch("/api/service/" + params.id, data)
        .then((response) => {
          router.back();
          toastMessage({
            type: "success",
            title: "Update service successfully!",
          });
        })
        .catch((err) => {
          alert(err.response.data);
        });
    });
    removeLoadingFilter(document.body!);
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

  if (data) {
    return (
      <>
        <div className={styles.content}>
          <Form
            className={futuna.className}
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Form.Control
              id="name"
              type="text"
              placeholder={t("service_name") + "..."}
              defaultValue={data.name}
              style={{ width: "30%" }}
            ></Form.Control>
            <div style={{ width: "100%", height: "20px" }}></div>
            <DragDropFileInput
              onChange={handleFileChange}
              id="label-file-upload"
              initFileList={
                data.imageURLs ? data.imageURLs.map((url) => new URL(url)) : []
              }
            >
              <div
                className={styles.uploadIcon}
                style={{
                  width: "50%",
                  height: "200px",
                  display: "flex",
                  flexWrap: "wrap",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <FaUpload size={"3rem"}></FaUpload>
              </div>
            </DragDropFileInput>
            <FormGroup className={styles.formGroupContainer}>
              <Form.Label
                style={{
                  fontWeight: "medium",
                  fontSize: "20px",
                  marginLeft: "20px",
                }}
              >
                 {t("description")}
              </Form.Label>
              <Form.Control
                id={"description"}
                as={"textarea"}
                type="text"
                defaultValue={data.description}
                placeholder="Description..."
                aria-multiline={true}
                style={{ height: "248px" }}
              />
            </FormGroup>
            <FormGroup
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "2rem 0",
              }}
            >
              <Button
                style={{
                  backgroundColor: "#FF4747",
                  borderColor: "#FF4747",
                  fontSize: "2rem",
                  paddingLeft: "3rem",
                  paddingRight: "3rem",
                  paddingBottom: "1rem",
                  borderRadius: "1rem",
                }}
                type="reset"
                // onClick={() => router.refresh()}
              >
                {t("clear")}
              </Button>
              <Button
                type="submit"
                style={{
                  backgroundColor: "#2A9928",
                  borderColor: "#2A9928",
                  fontSize: "2rem",
                  paddingLeft: "3rem",
                  paddingBottom: "1rem",
                  paddingRight: "3rem",
                  borderRadius: "1rem",
                }}
              >
                {t("save")}
              </Button>
            </FormGroup>
          </Form>
        </div>
      </>
    );
  }
  return <div></div>;
}
