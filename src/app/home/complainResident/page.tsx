"use client";
import React, { useState } from "react";
import utilStyles from "@/styles/utils.module.scss";
import styles from "./complainResident.module.scss";
import modalStyles from "../../../styles/modal.module.scss";
import mainStyles from "../page.module.css";
import { futuna } from "../../../../public/fonts/futura";
import clsx from "clsx";
import { Modal, Table } from "react-bootstrap";
import { Complain, complainStatus } from "@/models/complain";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import {
  AssignIcon,
  CloseIcon,
  DetailIcon,
  EditIcon,
  RejectIcon,
} from "@/components/icons";
import ModalComponent from "@/components/Modal/Modal";
import { ToastContainer } from "react-toastify";
import { format } from "date-fns";
import { Resident } from "@/models/resident";
import Image from "next/image";
import { useQuery } from "react-query";
import axios from "axios";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import { Images } from "../../../../public/images";
import toastMessage from "@/utils/toast";
import { Technician } from "@/models/technician";
import { UserProfile } from "@/libs/UserProfile";
import { Task } from "@/models/task";
import Nav from "react-bootstrap/Nav";
import SubmitComplain from "./options/submitComplain/page";
import History from "./options/history/page";

const ComplainResident = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [selectedOption, setSelectedOption] = useState(0);
  const options = [
    {
      index: 0,
      title: "Submit a complaint",
      component: <SubmitComplain />,
    },
    {
      index: 1,
      title: "Complaint handling information",
      component: <History />,
    },
  ];
  const deleteHandle = (id: string) => {
    setSelectedId(id);
    setShowModal(true);
  };
  const handleConfirmDelete = async (id: string) => {
    setShowModal(false);
    try {
      await axios.patch(`/api/complain/${id}/reject`);
      toastMessage({ type: "success", title: "Reject successfully!" });
      //   refetch();
    } catch (err) {
      toastMessage({ type: "error", title: "Reject faily!" });
      console.log(err);
    }
  };
  const handleSelectOption = (index:number) => {
    setSelectedOption(index)
  }
  return (
    <main className={clsx(mainStyles.main)}>
      <div className={clsx(styles.wrapper, futuna.className)}>
        <h1 className={clsx(utilStyles.headingXl, styles.title)}>
          Repair request history
        </h1>
        <div className={styles.tabLayout}>
          <div className={styles.tabHeader}>
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelectOption(index)}
                className={clsx(styles.tabItem, {
                  [styles.selectedOption]: selectedOption === index,
                })}
              >
                {option.title}
              </div>
            ))}
          </div>
          <div className={styles.tabContent}>
            {options[selectedOption].component}
          </div>
        </div>
      </div>
      <ModalComponent
        show={showModal}
        content="Residents' complaints were not approved!"
        title="Are you sure to delete this complain?"
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
    </main>
  );
};

export default ComplainResident;
