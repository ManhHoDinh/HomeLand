"use client";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import styles from "../page.module.css";
import residentStyles from "./resident.module.scss";
import utilStyles from "@/styles/utils.module.scss";
import tableStyles from "../../../styles/table.module.scss";
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
import { useState, useEffect, ReactNode, createRef } from "react";
import ModalComponent from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import { futuna } from "../../../../public/fonts/futura";
import { format } from "date-fns";
import { Resident } from "@/models/resident";
import { useQuery } from "react-query";
import axios from "axios";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import { ToastContainer } from "react-toastify";
import toastMessage from "@/utils/toast";
import { FaCheck } from "react-icons/fa";
import { parse } from "path";
import { UserProfile } from "@/libs/UserProfile";
import { Manager } from "@/models/manager";
import { Building } from "@/models/building";
import { useTranslation } from "react-i18next";
export default function Residents() {
  const [t, i18n] = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [residents, setResidents] = useState<Array<Resident>>([]);
  const [buildings, setBuildings] = useState<Array<Building>>([]);
  const [buildingId, setBuildingId] = useState<string>();
  const [selectedId, setSelectedId] = useState("");
  
  //pagination
  const [totalPages, setTotalPages] = useState(0);
  const [maxPageDisplay, setMaxPageDisplay] = useState(10);
  const searchRef = createRef<HTMLInputElement>();
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
  const deleleHandle = (id: string) => {
    setSelectedId(id);
    setShowModal(true);
  };
  const retrieveResidents = async () => {
    try {
      loadingFiler(document.body!);
      const user = UserProfile.getProfile();
      let buildingId;
      if (user.role === "manager") {
        const res = await axios.get(`/api/manager/${user.id}`);
        const managerData: Manager = res.data;
        if (managerData.building) {
          buildingId = managerData.building.building_id;
        }
      }
      const res = await axios.get("/api/resident/pagination", {
        params: {
          buildingId: buildingId,
        },
      });
      removeLoadingFilter(document.body!);
      const data = res.data;
      setResidents(data.items);
      setTotalPages(data.meta.totalPages);
      return res.data;
    } catch (error) {
      removeLoadingFilter(document.body!);

      console.log(error);
    }
  };
  const pagination = async (
    page?: number,
    limit?: number,
    building_id?: string
  ) => {
    try {
      loadingFiler(document.body!);
      const user = UserProfile.getProfile();
      let buildingId = building_id;
      if (user.role === "manager") {
        const res = await axios.get(`/api/manager/${user.id}`);
        const managerData: Manager = res.data;
        if (managerData.building) {
          buildingId = managerData.building.building_id;
        }
      }
      const res = await axios.get("/api/resident/pagination", {
        params: {
          page,
          limit,
          buildingId,
        },
      });
      removeLoadingFilter(document.body!);
      const data = res.data;
      setResidents(data.items);
      console.log(totalPages);
      setTotalPages(data.meta.totalPages);
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
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await axios.get("/api/building");
      setBuildings(res.data);
    };
    fetchAPI();
  }, []);
  const titleTable = [
    t("Name"),
    t("Apartment"),
    t("Phone Number"),
    t("Create At"),
    t("Action"),
  ];
  const handleSearch = async (e: any) => {
    if (e.key === "Enter") {
      console.log("hah");
      try {
        const res = await axios.get("/api/resident/search", {
          params: {
            query: searchRef.current?.value,
          },
        });
        console.log(res.data);
        setResidents(res.data);
      } catch (e) {
        alert(e);
      }
    }
  };
  const searchIconClick = async () => {
    console.log("hah");
    try {
      const res = await axios.get("/api/resident/search", {
        params: {
          query: searchRef.current?.value,
        },
      });
      console.log(res.data);
      setResidents(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleConfirmDelete = async (id: string) => {
    console.log(id);
    setShowModal(false);
    try {
      await axios.delete(`/api/resident/${id}`);
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
      pagination(currentPage - 1, maxPageDisplay, buildingId);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
      pagination(currentPage + 1, maxPageDisplay, buildingId);
    }
  };

  return (
    <main className={clsx(styles.main)}>
      <div className={clsx(residentStyles.wrapper, futuna.className)}>
        <h1 className={clsx(utilStyles.headingXl)}>{t("Resident Management")}</h1>
        <div className={clsx(residentStyles.header)}>
          <h1 className={clsx(utilStyles.headingLg)}>{t("List Of Residents")} </h1>
          <ButtonComponent
            href="/home/residents/addResident?auth=true"
            preIcon={<AddResidentIcon width={24} height={24} />}
            className={clsx(residentStyles.addBtn, futuna.className)}
          >
            {t("Create Resident")}
          </ButtonComponent>
        </div>
        <div className={residentStyles.searchPageLayout}>
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
          <div className="d-flex flex-lg-row flex-column">
            {UserProfile.getRole() === "admin" && (
              <select
                onChange={(e) => {
                  console.log(e.target.value);
                  if (e.target.value === "") pagination(1, maxPageDisplay);
                  else pagination(1, maxPageDisplay, e.target.value);
                  setBuildingId(e.target.value);
                  setCurrentPage(1);
                }}
                className={residentStyles.buildingSelect}
              >
                <option value="">---{t("All Buildings")}---</option>
                {buildings.map((building, index) => (
                  <option key={index} value={building.building_id}>
                    {building.name}
                  </option>
                ))}
              </select>
            )}
            <SearchLayout
              onKeydown={handleSearch}
              iconClick={searchIconClick}
              placeHolder={t("Search resident") + "..."}
              ref={searchRef}
            />
          </div>
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
        <div style={{ overflowX: "auto" }} className="w-100 mt-5">
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
              {residents.map((resident, index): ReactNode => {
                const time = new Date(resident.created_at);
                const createAt = format(time, "dd-MM-yyyy HH:mm:ss");

                return (
                  <tr key={index}>
                    <td>
                      <span style={{ fontWeight: 700 }}>
                        {resident.profile.name}
                      </span>
                    </td>
                   
                    <td>
                      <span>{resident.stay_at && resident.stay_at.name}</span>
                    </td>
                    <td>
                      <span>{resident.profile.phone_number}</span>
                    </td>
                    <td>
                      <span>{createAt}</span>
                    </td>
                    <td style={{ width: 20 }}>
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
                          href={`/home/residents/updateResident/${resident.id}/?auth=true`}
                        >
                          {t("Edit")}
                        </ButtonComponent>
                        <div
                          onClick={() => deleleHandle(resident.id)}
                          className={residentStyles.TrashIcon}
                        >
                          <GarbageIcon
                            className={residentStyles.trash}
                            width={16}
                            height={16}
                          />
                        </div>
                        {/* <ButtonComponent
                          onClick={() => deleleHandle(resident.id)}
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
        title={t("Are you sure to delete this resident?")}
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
