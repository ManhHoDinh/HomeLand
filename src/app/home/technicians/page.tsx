"use client";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import styles from "../page.module.css";
import residentStyles from "../residents/resident.module.scss";
import tableStyles from "../../../styles/table.module.scss";
import utilStyles from "@/styles/utils.module.scss";
import pageStyles from "@/styles/page.module.scss";
import { clsx } from "clsx";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import SearchLayout from "@/components/searchLayout/searchLayout";
import {
  AddResidentIcon,
  CloseIcon,
  EditIcon,
  GarbageIcon,
  SortIcon,
  TrashIcon,
} from "@/components/icons";
import { useTranslation } from "react-i18next";
import { useState, ReactNode, createRef } from "react";
import ModalComponent from "@/components/Modal/Modal";
import { futuna } from "../../../../public/fonts/futura";
import { format } from "date-fns";
import { useQuery } from "react-query";
import axios from "axios";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import { ToastContainer } from "react-toastify";
import toastMessage from "@/utils/toast";
import { Technician } from "@/models/technician";
import { FaTableTennis } from "react-icons/fa";

export default function Residents() {
  const [t, i18n] = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [technicians, setTechnicians] = useState<Array<Technician>>([]);
  const [selectedId, setSelectedId] = useState("");
  const searchRef = createRef<HTMLInputElement>();
  //pagination
  const [totalPages, setTotalPages] = useState(0);
  const [maxPageDisplay, setMaxPageDisplay] = useState(10);
  const listOptions = [
    {
      value: 1,
    },
    {
      value: 2,
    },
    {
      value: 3,
    },
    {
      value: 4,
    },
  ];
  const deleleHandle = (id: string) => {
    setSelectedId(id);
    setShowModal(true);
  };
  const retrieveTechnicians = async () => {
    try {
      loadingFiler(document.body!);
      const res = await axios.get("/api/technician/pagination");
      removeLoadingFilter(document.body!);
      const data = res.data;
      setTechnicians(data.items);
      setTotalPages(data.meta.totalPages);

      return res.data;
    } catch (error) {
      removeLoadingFilter(document.body!);

      console.log(error);
    }
  };
  const pagination = async (page?: number, limit?: number) => {
    try {
      console.log(page, limit);
      loadingFiler(document.body!);
      const res = await axios.get("/api/technician/pagination", {
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
  const { isLoading, isError, data, refetch } = useQuery(
    "technicians",
    retrieveTechnicians,
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
  const titleTable = [t("Name"), t("Email"), t("Phone Number"), t("Create At"), t("Action")];
  const handleSearch = async (e: any) => {
    if (e.key === "Enter") {
      console.log("hah");
      try {
        const res = await axios.get("/api/technician/search", {
          params: {
            query: searchRef.current?.value,
          },
        });
        console.log(res.data);
        setTechnicians(res.data);
      } catch (e) {
        alert(e);
      }
    }
  };
  const searchIconClick = async () => {
    console.log("hah");
    try {
      const res = await axios.get("/api/technician/search", {
        params: {
          query: searchRef.current?.value,
        },
      });
      console.log(res.data);
      setTechnicians(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleConfirmDelete = async (id: string) => {
    console.log(id);
    setShowModal(false);
    try {
      await axios.delete(`/api/technician/${id}`);
      toastMessage({ type: "success", title: "Delete successfully!" });

      refetch();
    } catch (err) {
      toastMessage({ type: "errpr", title: "Delete faily!" });
      console.log(err);
    }
  };
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
    <main className={clsx(styles.main)}>
      <div className={clsx(residentStyles.wrapper, futuna.className)}>
        <h1 className={clsx(utilStyles.headingXl)}>
         {t("Technical staff management")} 
        </h1>
        <div className={clsx(residentStyles.header)}>
          <h1 className={clsx(utilStyles.headingLg)}>List Of Technicians</h1>
          <ButtonComponent
            href="/home/technicians/addTechnician?auth=true"
            preIcon={<AddResidentIcon width={24} height={24} />}
            className={clsx(residentStyles.addBtn, futuna.className)}
          >
           {t("Create Technician")} 
          </ButtonComponent>
        </div>
        <div className="d-flex flex-column flex-lg-row w-100 mt-3 justify-content-between">
          <div className={clsx(residentStyles.perPage)}>
            <span>{t("Show")}</span>
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
            <span>{t("Entries")}</span>
          </div>
          <SearchLayout
            onKeydown={handleSearch}
            iconClick={searchIconClick}
            placeHolder={t("Search Technician") + "..."}
            ref={searchRef}
          />  
        </div>
        <div className={pageStyles.pageContainer}>
          <ButtonComponent
            onClick={handlePrevPage}
            className={clsx(pageStyles.changePageBtn, {
              [pageStyles.disableBtn]: currentPage === 1,
            })}
          >
            {t("Previous")}
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
            {t("Next")}
          </ButtonComponent>
        </div>
        <div style={{overflowX: 'auto'}} className="w-100 mt-5">
          <table className={clsx(tableStyles.table, futuna.className)}>
            <thead>
              <tr>
                {titleTable.map((title: String, index) => (
                  <th key={index}>
                    {title}
                    {/* <SortIcon width={12} height={12} /> */}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {technicians.map((technician, index): ReactNode => {
                const time = new Date(technician.created_at);
                const createAt = format(time, "dd-MM-yyyy HH:mm:ss");

                return (
                  <tr key={index}>
                    <td style={{ fontWeight: 700 }}>
                      {technician.profile.name}
                    </td>
                    <td>{technician.account?.email}</td>
                    <td>{technician.profile.phone_number}</td>
                    <td>{createAt}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <ButtonComponent
                          preIcon={
                            <EditIcon
                              className={residentStyles.editIcon}
                              width={16}
                              height={16}
                            />
                          }
                          className={clsx(
                            residentStyles.cudBtn,
                            residentStyles.editBtn
                          )}
                          href={`/home/technicians/updateTechnician/${technician.id}/?auth=true`}
                        >
                          Edit
                        </ButtonComponent>
                        <div
                          onClick={() => deleleHandle(technician.id)}
                          className={residentStyles.TrashIcon}
                        >
                          <GarbageIcon
                            className={residentStyles.trash}
                            width={16}
                            height={16}
                          />
                        </div>
                        {/* <ButtonComponent
                          onClick={() => deleleHandle(technician.id)}
                          preIcon={<CloseIcon width={16} height={16} />}
                          className={clsx(
                            residentStyles.cudBtn,
                            residentStyles.deleteBtn
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
        title="Có chắc chắn xóa nhân viên kĩ thuật này?"
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
}
