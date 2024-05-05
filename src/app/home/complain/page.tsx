"use client";
import React, { useState } from "react";
import utilStyles from "@/styles/utils.module.scss";
import styles from "./complain.module.scss";
import modalStyles from '../../../styles/modal.module.scss';
import tableStyles from '../../../styles/table.module.scss';
import residentStyles from '@/app/home/residents/resident.module.scss'
import pageStyles from '@/styles/page.module.scss';
import mainStyles from "../page.module.css";
import { futuna } from "../../../../public/fonts/futura";
import clsx from "clsx";
import { Form, Modal, Table } from "react-bootstrap";
import { Complain, complainStatus } from "@/models/complain";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import { AssignIcon, CloseIcon, DetailIcon, EditIcon, RejectIcon } from "@/components/icons";
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
import Spinner from 'react-bootstrap/Spinner';
import { Manager } from "@/models/manager";
import { useTranslation } from "react-i18next";
const ComplainPage = () => {
  const [t, i18n] = useTranslation();
  const titleTable = [
    t("Resident"),
    t("Status"),
    t("Complain details"),
    t("Create At"),
    t("Action"),
  ];
  const listOptions = [
    {
      value: 10,
    },
    {
      value: 20,
    },
    {
      value: 50,
    },
    {
      value: 100,
    },
  ];
   //pagination
   const [totalPages, setTotalPages] = useState(0);
   const [maxPageDisplay, setMaxPageDisplay] = useState(10);
  const titleAssign = [t("ID"), t("Name"), t("Phone Number"), t("Email"), t("Create At")];
  const [complains, setComplains] = useState<Array<Complain>>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const [technicians, setTechnicians] = useState<Array<Technician>>([]);
  const [checked, setChecked] = useState("");
  const [showModalAssign, setShowModalAssign] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const deleteHandle = (id: string) => {
    setSelectedId(id);
    setShowModal(true);
  };
  const handleConfirmDelete = async (id: string) => {
    setShowModal(false);
    try {
      await axios.patch(`/api/complain/${id}/reject`);
      toastMessage({ type: "success", title: "Reject successfully!" });
      refetch();
    } catch (err) {
      toastMessage({ type: "error", title: "Reject faily!" });
      console.log(err);
    }
  };
  const pagination = async (page?: number, limit?: number) => {
    try {
      console.log(page, limit);
      loadingFiler(document.body!);
      const res = await axios.get("/api/technician", {
        params: {
          page,
          limit,
        },
      });
      removeLoadingFilter(document.body!);
      const data = res.data;
      setTechnicians(data.items);
      console.log(totalPages);
      setTotalPages(data.meta.totalPages);
      return res.data;
    } catch (error) {
      removeLoadingFilter(document.body!);

      console.log(error);
    }
  };
    //handle check
   
    const handleShowTechnicianModal = async (id:string) => {
      const res = await axios.get("/api/technician/pagination");
      const data = res.data;
      setTechnicians(data.items);
       setTotalPages(data.meta.totalPages);
    setSelectedId(id);

      setShowModalAssign(true);
    };
    const handleCheck = (id: string) => {
      const isCheck = !!(checked === id);
      let newCheckedItem;
      if (isCheck) {
        newCheckedItem = "";
      } else newCheckedItem = id;
    
      setChecked(newCheckedItem)
    };
    const handleSave = async (selectedId:string) => {
      try {
        const form = new FormData();
        const user = UserProfile.getProfile();
        form.append("complain_id", selectedId);
        form.append("assigner_id", user.id);
        setLoading(true);
        const res = await axios.post(
          `/api/task`,
          form,
          {
            params: {
              assigneeId: checked,
            }
            
          }
        );
        refetch();
        setChecked("");
        setLoading(false);
        toastMessage({type:'success', title:'Assign successfully'})
      } catch (e: any) {
        toastMessage({type:'error', title:'Assign failed'})
        setLoading(false);
        throw new Error(e.message);
      }
      
      setShowModalAssign(false);
    };
  const retrieveComplains = async () => {
    try {
      const user = UserProfile.getProfile();
      loadingFiler(document.body!);
      const res = await axios.get(`/api/complain/building/${user.id}`);
      removeLoadingFilter(document.body!);
      const complainsData: Array<Complain> = res.data;
      const data = complainsData.filter(complain => complain.status !== complainStatus.REJECTED)
      setComplains(data);
      return data;
    } catch (error) {
      removeLoadingFilter(document.body!);
      console.log(error);
    }
  };
  const { isLoading, isError, data, refetch } = useQuery(
    "complains",
    retrieveComplains
  );
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const handleSetActive = (count: any) => {
    const limit: number = parseInt(count);
    setCurrentPage(1);
    setMaxPageDisplay(count);
    pagination(1, limit);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      pagination(currentPage - 1, maxPageDisplay);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      pagination(currentPage + 1, maxPageDisplay);
    }
  };
  return (
    <main className={clsx(mainStyles.main)}>
      <div className={clsx(styles.wrapper, futuna.className)}>
        <h1 className={clsx(utilStyles.headingXl, styles.title)}>
          {t("Received Complain")}
        </h1>
        <div className={clsx(styles.header)}>
          <h1 className={clsx(utilStyles.headingLg)}>{t("Complain List")}</h1>
        </div>
        <div style={{overflowX: 'auto'}} className="w-100 mt-5">
          <table className={clsx(tableStyles.table, futuna.className)}>
            <thead>
              <tr>
                {titleTable.map((title: String, index) => (
                  <th key={index}>{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {complains.map((complain, index): React.ReactNode => {
                const time = new Date(complain.created_at);
                const status = complain.status.toLowerCase();
                const createAt = format(time, "yyyy-MM-dd HH:mm:ss");
                const resident:Resident = complain.resident;
                return (
                  <tr key={index}>
                    <td>
                      <div className={styles.residentInfo}>
                        <Image
                          alt=""
                          width={40}
                          height={40}
                          style={{borderRadius: '50%'}}
                          src={resident.profile.avatarURL}
                        />
                        <div className={styles.info}>
                          <span className={styles.residentName}>{resident.profile.name}</span>
                          <span style={{marginTop: 4}} className={styles.residentEmail}>{resident.profile.phone_number}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={clsx(styles.status, {
                          [styles.done]: status === "done",
                          [styles.pending]: status === "pending",
                          [styles.received]: status === "received",
                          [styles.fixing]: status === "fixing ",
                          [styles.rejected]: status === "rejected ",
                        })}
                      >
                        {t(status)}
                      </span>
                    </td>
                    <td>{complain.content}</td>
                    <td>{createAt}</td>

                    <td>
                      <div className="d-flex align-items-center justify-content-center">
                      {complain.task?<ButtonComponent
                          preIcon={<AssignIcon width={16} height={16} />}
                          className={clsx(styles.cudBtn, styles.assignedBtn)}
                        >
                          {t("Assigned")}
                         
                        </ButtonComponent>:<ButtonComponent
                          preIcon={<AssignIcon width={16} height={16} />}
                          className={clsx(styles.cudBtn, styles.assignBtn)}
                          onClick={() => handleShowTechnicianModal(complain.complain_id)}

                        >
                          {t("Assign")}
                         
                        </ButtonComponent> }
                       
                        <ButtonComponent
                          onClick={() => deleteHandle(complain.complain_id)}
                          preIcon={<RejectIcon width={16} height={16} />}
                          className={clsx(styles.cudBtn, styles.rejectBtn)}
                        >
                         {t("Reject")} 
                        </ButtonComponent>
                        {/* <ButtonComponent
                        onClick={() => deleleHandle(complain.complain_id)}
                        preIcon={<CloseIcon width={16} height={16} />}
                        className={clsx(
                          styles.cudBtn,
                          styles.deleteBtn
                        )}
                      >
                        Xóa
                      </ButtonComponent> */}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
         <Modal
        dialogClassName={clsx(modalStyles.modal, futuna.className)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModalAssign}
        onHide={() => setShowModalAssign(false)}
      >
        <Modal.Header className={modalStyles.modalHeader} closeButton>
          <Modal.Title className={modalStyles.titleModal}>
            Assign Task To Technicians
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={modalStyles.bodyModal}>
          <h3 className={modalStyles.bodyHeader}>Technician List</h3>
          <div className="d-flex w-100 mt-3 align-items-center justify-content-between">
          <div style={{marginTop: 0}} className={pageStyles.pageContainer}>
          <ButtonComponent
            onClick={handlePrevPage}
            className={clsx(pageStyles.changePageBtn, {
              [pageStyles.disableBtn]: currentPage === 1,
            })}
          >
            Previous
          </ButtonComponent>
          <p>
            {currentPage}/{totalPages}
          </p>
          <ButtonComponent
            onClick={handleNextPage}
            className={clsx(pageStyles.changePageBtn, {
              [pageStyles.disableBtn]: currentPage === totalPages,
            })}
          >
            Next
          </ButtonComponent>
        </div>
          <div className={clsx(residentStyles.perPage)}>
            <span>Show</span>
            <span>
              <Form.Select
                onChange={(e) => handleSetActive(e.target.value)}
                aria-label="Default select example"
              >
                {listOptions.map(
                  (option, index): JSX.Element => (
                    <option
                      className={clsx({
                        [residentStyles.active]:
                          maxPageDisplay === option.value,
                      })}
                      key={index}
                      value={option.value}
                    >
                      {option.value}
                    </option>
                  )
                )}
              </Form.Select>
            </span>
            <span>Entries</span>
          </div>

         
        </div>
          <table
          style={{marginTop: 20}}
            className={clsx(modalStyles.table, futuna.className)}
          >
            <thead>
              <tr>
                <th style={{ width: 20 }}>
                  
                </th>
                {titleTable.map((title: String, index) => (
                  <th key={index}>{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {technicians.map((technician, index): React.ReactNode => {
                const time = new Date(technician.created_at);
                const createAt = format(time, "yyyy-MM-dd HH:mm:ss");
                return (
                  <tr key={index}>
                    <td>
                      <input
                        value={technician.id}
                        type="checkbox"
                        onChange={(e) => handleCheck(e.target.value)}
                        checked={checked === technician.id}
                      />
                    </td>
                    <td>{technician.id}</td>
                    <td>{technician.profile.name}</td>
                    <td>{technician.profile.phone_number}</td>
                    <td>{technician.account.email}</td>
                    <td>{createAt}</td>
                    {/* <td>{building.technician_id}</td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer className={modalStyles.footerModal}>
          <ButtonComponent className={modalStyles.saveBtn} onClick={() => handleSave(selectedId)}>
            Save
          </ButtonComponent>
        </Modal.Footer>
        {loading && showModalAssign && <Spinner className={utilStyles.spinner}   animation="border" />}
      </Modal>
    

    </main>
  );
};

export default ComplainPage;
