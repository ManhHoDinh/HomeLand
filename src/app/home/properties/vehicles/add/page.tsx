"use client";
import { format } from "date-fns";

import DragDropFileInput from "@/components/dragDropFileInput/drapDropFileInput";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { FaUpload } from "react-icons/fa";

import styles from "./addVehicle.module.css";
import { ReactNode, useRef, useState } from "react";
import { Resident } from "@/models/resident";
import { futuna } from "../../../../../../public/fonts/futura";
import axios from "axios";
import { loadingFiler, removeLoadingFilter, search } from "@/libs/utils";
import { useQuery } from "react-query";
import React from "react";
import { ToastContainer } from "react-toastify";
import toastMessage from "@/utils/toast";
import { t } from "i18next";
import SearchLayout from "@/components/searchLayout/searchLayout";
export default function AddVehicle(): React.ReactNode {
  const [selectedRes, setSelectedRes] = useState<Resident | undefined>(
    undefined
  );
  const [show, setShow] = useState(false);
  const [residents, setResidents] = useState<Array<Resident>>([]);
  const [imageList, setImageList] = useState<(File | URL)[]>(Array(3));
  const inputRef = useRef<HTMLButtonElement>(null);
  const ResidentModel = (): ReactNode => {
    return (
      <Modal
        dialogClassName={styles.modal}
        show={show}
        style={futuna.style}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("residentsList")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className={styles.itemContainer}
            style={{
              position: "absolute",
              height: "40px",
              width: "40%",
              borderStyle: "none",
              margin: 0,
              right: "5%",
            }}
          >
            <SearchLayout
              onChange={(e) => {
                setResidents(search(data, "id", e.target.value));
              }}
              placeHolder={t("search_resident")}
            />
          </div>

          <Table style={{ width: "100%", marginTop: "50px" }} striped hover>
            <thead>
              <tr>
                <th style={{ width: "20%" }}>{t("ID")}</th>
                <th style={{ width: "23%" }}>{t("name")}</th>
                <th style={{ width: "25%" }}>{t("phone_number")} </th>
                <th style={{ width: "10%" }}>{t("apartment")}</th>
                <th style={{ width: "22%" }}>{t("create_at")}</th>
              </tr>
            </thead>
            <tbody>
              {residents.map((resident, index): ReactNode => {
                const time = new Date(resident.created_at);
                const createAt = format(time, "yyyy-MM-dd HH:mm:ss");
                const handleRowClick = () => {
                  setSelectedRes(resident);
                  setShow(false);
                };

                return (
                  <tr
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleRowClick()}
                  >
                    <td>{resident.id}</td>
                    <td>{resident.profile && resident.profile.name}</td>
                    <td>{resident.profile.phone_number}</td>
                    <td>{resident.stay_at && resident.stay_at.name}</td>
                    <td>{createAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    );
  };

  function handleFileChange(file: URL | File, index: number): void {
    const temp = [...imageList];
    if (temp.length > index) temp[index] = file;
    setImageList(temp);
  }
  const retrieveResidents = async () => {
    try {
      loadingFiler(document.body!);
      const res = await axios.get("/api/resident");
      removeLoadingFilter(document.body!);
      setResidents(res.data);
      return res.data;
    } catch (error) {
      removeLoadingFilter(document.body!);
      console.log(error);
    }
  };
  const { isLoading, isError, data, refetch } = useQuery(
    "residents",
    retrieveResidents,
    {
      staleTime: Infinity,
    }
  );
  function handleOnFocus(): void {
    if (inputRef.current) inputRef.current.click();
  }
  function missingField(element: HTMLElement) {
    element.className = element.className.split("missing")[0];
    element.className += " " + styles.missing;
    element.onfocus = () => {
      element.className = element.className.split("missing")[0];
      element.onfocus = null;
    };
  }
  function validateData(): boolean {
    var flag = false;
    if (selectedRes == null) {
      flag = true;
      toastMessage({ type: "error", title: "Hãy chọn cư dân" });
      return flag;
    }
    const licensePlate = document.getElementById("vehicleLicense");
    if (!licensePlate) {
      flag = true;
      missingField(document.getElementById("vehicleLicense_container")!);
    }
    const frontRegistrationPhotoURL = document.getElementById(
      "frontRegistrationPhotoURL"
    );
    if (!frontRegistrationPhotoURL) {
      flag = true;
      missingField(
        document.getElementById("frontRegistrationPhotoURL_container")!
      );
    }
    const backRegistrationPhotoURL = document.getElementById(
      "backRegistrationPhotoURL"
    );
    if (!backRegistrationPhotoURL) {
      flag = true;
      missingField(
        document.getElementById("backRegistrationPhotoURL_container")!
      );
    }
    return flag;
  }
  async function handleSubmit() {
    loadingFiler(document.body!);
    if (validateData()) {
      removeLoadingFilter(document.body!);
      return;
    }
    const data = new FormData();

    if (selectedRes) data.append("residentId", selectedRes.id);
    else {
      toastMessage({ type: "error", title: "Có lỗi đã xảy ra" });
      removeLoadingFilter(document.body!);
      return;
    }
    async function addImage(data: FormData, fileList: (File | URL)[]) {
      if (fileList[0] instanceof URL)
        data.append("licensePlate", fileList[0].href);
      else data.append("licensePlate", fileList[0]);
      if (fileList[1] instanceof URL)
        data.append("frontRegistrationPhoto", fileList[1].href);
      else data.append("frontRegistrationPhoto", fileList[1]);
      if (fileList[2] instanceof URL)
        data.append("backRegistrationPhoto", fileList[2].href);
      else data.append("backRegistrationPhoto", fileList[2]);
    }

    await addImage(data, imageList).then(async () => {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "/api/vehicle",
        data: data,
      };
      await axios
        .request(config)
        .then((res) => {
          toastMessage({ type: "success", title: "Đã đăng ký thành công" });
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          toastMessage({ type: "error", title: "Có lỗi đã xảy ra" });
        });
      removeLoadingFilter(document.body!);
    });
  }
  return (
    <>
      <div className={`${styles.container} ${futuna.className}`}>
        <Form style={{ width: "100%" }}>
          <Form.Group className={styles.form}>
            <Form.Group style={{ marginRight: "2vw" }}>
              <Form.Label className={`${styles.label} ${styles.required}`}>
                Biển số xe
              </Form.Label>
              <DragDropFileInput
                imageid={"vehicleLicense"}
                onChange={(files) => {
                  handleFileChange(files[0], 0);
                }}
                multiFile={false}
                className={styles.vehicleIdImage}
              >
                <div
                  className={styles.uploadIcon}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaUpload size={"3vw"}></FaUpload>
                </div>
              </DragDropFileInput>
              <Form.Label className={`${styles.label} ${styles.required}`}>
                Mặt trước giấy tờ xe
              </Form.Label>
              <DragDropFileInput
                imageid={"frontRegistrationPhotoURL"}
                onChange={(files) => {
                  handleFileChange(files[0], 1);
                }}
                multiFile={false}
                className={styles.vehicleIdImage}
              >
                <div
                  className={styles.uploadIcon}
                  style={{
                    width: "100%",
                    height: "100%",

                    display: "flex",
                    flexWrap: "wrap",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaUpload size={"3vw"}></FaUpload>
                </div>
              </DragDropFileInput>
              <Form.Label className={`${styles.label} ${styles.required}`}>
                Mặt sau giấy tờ xe
              </Form.Label>
              <DragDropFileInput
                imageid={"backRegistrationPhotoURL"}
                onChange={(files) => {
                  handleFileChange(files[0], 2);
                }}
                multiFile={false}
                className={styles.vehicleIdImage}
              >
                <div
                  className={styles.uploadIcon}
                  style={{
                    width: "100%",
                    height: "100%",

                    display: "flex",
                    flexWrap: "wrap",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaUpload size={"3vw"}></FaUpload>
                </div>
              </DragDropFileInput>
            </Form.Group>
            <div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "2vw",
                }}
              >
                Cư dân
              </div>
              {selectedRes == undefined ? (
                <div>
                  <div>Please select resident first</div>
                  <Button
                    style={{
                      width: "fit-content",
                      height: "fit-content",
                    }}
                    onClick={() => setShow(true)}
                  >
                    Select resident
                  </Button>
                </div>
              ) : (
                <Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label
                      className={`${styles.label} ${styles.required}`}
                    >
                      Mã cư dân
                    </Form.Label>

                    <InputGroup style={{ width: "80%" }}>
                      <Form.Control
                        id="inputId"
                        size="lg"
                        name="id"
                        type="text"
                        onClick={() => handleOnFocus()}
                        onChange={(e) => {
                          setResidents(search(data, "id", e.target.value));
                        }}
                        style={{
                          margin: "0",
                        }}
                        value={selectedRes.id}
                      />

                      <Button
                        style={{ float: "right", borderRadius: "0.5vw" }}
                        onClick={() => {
                          setShow(true);
                        }}
                      >
                        Change resident
                      </Button>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label
                      className={`${styles.label} ${styles.required}`}
                    >
                      Họ và tên
                    </Form.Label>
                    <Form.Control
                      id={"inputName"}
                      size="lg"
                      name="name"
                      type="text"
                      value={selectedRes.profile.name ?? ""}
                      disabled={selectedRes ? true : false}
                      placeholder="Nguyễn Văn A..."
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label
                      className={`${styles.label} ${styles.required}`}
                    >
                      CCCD
                    </Form.Label>
                    <Form.Control
                      id={"inputCCCD"}
                      size="lg"
                      name="CCCD"
                      type="text"
                      value={selectedRes.profile.identify_number ?? ""}
                      placeholder="CCCD is appeared here"
                      disabled={true}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label
                      className={`${styles.label} ${styles.required}`}
                    >
                      Số điện thoại
                    </Form.Label>
                    <Form.Control
                      id={"inputSDT"}
                      size="lg"
                      name="SDT"
                      type="phone"
                      value={selectedRes.profile.phone_number ?? ""}
                      placeholder="03**************"
                      disabled={true}
                    />
                  </Form.Group>
                </Form.Group>
              )}
            </div>
          </Form.Group>
          <Form.Group
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "2vw",
            }}
          >
            <Button onClick={handleSubmit} className={styles.creatBtn}>
              Tạo
            </Button>
          </Form.Group>
        </Form>
      </div>
      {ResidentModel()}
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
    </>
  );
}
