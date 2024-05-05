"use client";
import { futuna } from "../../../../../../public/fonts/futura";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import styles from "./detailFloor.module.scss";
import mainStyles from "../../../page.module.css";
import utilStyles from "@/styles/utils.module.scss";
import buildingStyles from "../../floor.module.scss";
import Form from "react-bootstrap/Form";
import clsx from "clsx";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import Image from "next/image";
import ToastComponent from "@/components/ToastComponent/ToastComponent";
import axios from "axios";
import { Floor } from "@/models/floor";
import { useQuery } from "react-query";
import toastMessage from "@/utils/toast";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import { ToastContainer } from "react-toastify";
import { Button, Modal, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  AddResidentIcon,
  CloseIcon,
  DetailIcon,
  EditIcon,
} from "@/components/icons";
import ModalComponent from "@/components/Modal/Modal";
import { format } from "date-fns";
import { Manager } from "@/models/manager";
import { Apartment } from "@/models/apartment";
const DetailFloor = ({ params }: { params: { id: string } }) => {
  // init modal add manager
  const [showModalApartment, setShowModalApartment] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [listChecked, setListChecked] = useState<String[]>([]);
  const [floor, setFloor] = useState<Floor>();
  const [apartment, setApartment] = useState<Array<Apartment>>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [t, i18n] = useTranslation();
  const retrieveFloor = async () => {
    try {
      loadingFiler(document.body!);
      const id = decodeURIComponent(params.id);
      const res = await axios.get(`/api/floor/${id}`);
      removeLoadingFilter(document.body!);
      const floorData = res.data as Floor;
      console.log(floorData);
      setFloor(floorData);
      return res.data;
    } catch (error) {
      removeLoadingFilter(document.body!);
      console.log(error);
    }
  };
  const handleCheckAll = () => {
    setCheckAll(!checkAll);
    let newList: String[];
    if (!checkAll) newList = apartment.map((item) => item.apartment_id);
    else newList = [];
    setListChecked(newList);
  };
  const handleCheck = (id: string) => {
    const isCheck = listChecked?.includes(id);
    let newList: String[];
    if (isCheck) {
      newList = listChecked?.filter((item) => item !== id);
    } else newList = [...listChecked, id];
    if (newList.length === apartment.length) {
      setCheckAll(true);
    } else setCheckAll(false);
    setListChecked(newList);
  };
  const titleTable = ["ID",  t("name"), t("length"),t("width"),t("price")];
  const deleleHandle = (id: string) => {
    setSelectedId(id);
    setShowModal(true); ``
  };
  const handleConfirmDelete = async (id: string) => {
    console.log(id);
    setShowModal(false);
    try {
      await axios.delete(`/api/floor/${params.id}/deleteApartment`, {
        params: {
          apartmentId: id,
        },
      });
      toastMessage({ type: "success", title: "Delete successfully!" });
      refetch();
    } catch (err) {
      toastMessage({ type: "error", title: "Delete failed!" });
      console.log(err);
    }
  };
  useEffect(() => {
    if (floor?.apartments) {
      setApartment(floor.apartments);
    }
  }, [floor]);
  useEffect(() => {
    retrieveFloor();
  }, []);
  const handleSave = async () => {
    try {
      const res = await axios.post(
        `/api/floor/${params.id}/addApartment`,
        undefined,
        {
          params: {
            apartmentIds: listChecked,
          },
          paramsSerializer: {
            indexes: null,
          },
        }
      );
      const updateFloor = res.data;
      if (updateFloor.apartments) {
      }
      refetch();
      setListChecked([]);
    } catch (e: any) {
      throw new Error(e.message);
    }
    setShowModalApartment(false);
  };
  const handleShowManagerModal = async () => {
    const page = 1;
    try {
      const res = await axios.get(`/api/apartment?page=${page}`);
      console.log('API response:', res);
      const data: Apartment[] = res.data;
      const newData = data.filter((item) => item.floorId !== null);
      console.log('Filtered apartments:', newData);
      setApartment(newData);
      setShowModalApartment(true);
    } catch (error) {
      console.log('API error:', error);
    }
  };
  const { refetch } = useQuery("detail-floor", retrieveFloor, {
    staleTime: Infinity,
  });
  return (
    <main className={mainStyles.main}>
      <div className={clsx(styles.wapper, futuna.className)}>
        <p className={clsx(utilStyles.headingXl, styles.title)}>
        {t("detail_floor")}
        </p>
        <div className={styles.container}>
          <p> {t("info")}</p>
          <table className={styles.tableInfo}>
            <tr>
              <td className="col-6">
                <label className="col-2">Id:</label>{" "}
                <span className="col-10 "> {floor?.floor_id}</span>
              </td>
              <td className="col-6">
                <label className="col-2"> {t("name")}:</label>{" "}
                <span className="col-10">{floor?.name}</span>
              </td>
            </tr>
            <tr>
              <td className="col-6">
                <label className="col-2"> {t("building")}:</label>
                <span className="col-10">{" " + floor?.building_id}</span>
              </td>
              <td className="col-6">
                <label className="col-3 "> {t("max_apartment")}:</label>
                <span className="col-10">{" " + floor?.max_apartment}</span>
              </td>

            </tr>
          </table>
        </div>
        <div className={styles.managerList}>
          <div className="d-flex justify-content-between align-items-end">
            <span> {t("list_apartment")}</span>
            {/* <ButtonComponent
              onClick={handleShowManagerModal}
              preIcon={<AddResidentIcon width={24} height={24} />}
              className={clsx(styles.addBtn, futuna.className)}
            >
              Thêm phòng
            </ButtonComponent> */}
          </div>
          {floor?.apartments && floor.apartments?.length > 0 ? (
            <Table
              className={clsx(styles.tableBuilding, futuna.className)}
              striped
              bordered
              hover
            >
              <thead>
                <tr>
                  {titleTable.map((title: String, index) => (
                    <th key={index}>{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {floor.apartments.map((apartment, index): React.ReactNode => {

                  return (
                    <tr key={index}>
                      <td>{apartment.apartment_id}</td>
                      <td>{apartment.name}</td>
                      <td>{apartment.width}</td>
                      <td>{apartment.length}</td>
                      <td>{apartment.rent}</td>


                    
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <p style={{ textAlign: "center", marginTop: "100px" }}>
              Chưa có phòng nào trong tầng
            </p>
          )}
        </div>
      </div>
     
      <ModalComponent
        show={showModal}
        title="Có chắc chắn xóa phòng này khỏi tầng?"
        handleConfirm={() => handleConfirmDelete(selectedId)}
        setShow={setShowModal}
      />
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
      <Modal
        dialogClassName={clsx(styles.modal, futuna.className)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModalApartment}
        onHide={() => setShowModalApartment(false)}
      >
        <Modal.Header className={styles.modalHeader} closeButton>
          <Modal.Title className={styles.titleModal}>
            Thêm phòng cho tầng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.bodyModal}>
          <h3 className={styles.bodyHeader}>Danh sách phòng</h3>
          {apartment.length > 0 ? (
            <Table
              className={clsx(buildingStyles.tableBuilding, futuna.className)}
              striped
              bordered
              hover

            >
              <thead>
                <tr>
                  <th style={{ width: 20 }}>
                    <input
                      type="checkbox"
                      checked={checkAll}
                      onChange={handleCheckAll}
                    />
                  </th>
                  {titleTable.map((title: String, index) => (
                    <th key={index}>{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {apartment.map((apartment, index): React.ReactNode => {

                  return (
                    <tr key={index}>
                      <td>
                        <input
                          value={apartment.apartment_id}
                          type="checkbox"
                          onChange={(e) => handleCheck(e.target.value)}
                          checked={listChecked.includes(apartment.apartment_id)}
                        />
                      </td>
                      <td>{apartment.apartment_id}</td>
                      <td>{apartment.name}</td>

                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <p>Không có căn hộ để hiển thị</p>
          )}
        </Modal.Body>
        <Modal.Footer className={styles.footerModal}>
          <ButtonComponent className={styles.saveBtn} onClick={handleSave}>
            Save
          </ButtonComponent>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default DetailFloor;