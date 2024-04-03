"use client";
import { FaSearch } from "react-icons/fa";
import styles from "./contracts.module.css";
import { futuna } from "../../../../public/fonts/futura";
import { Button, Card, Spinner, Table, Toast } from "react-bootstrap";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "react-query";
import SearchBar from "@/components/searchBar/searchBar";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Contract } from "@/models/contract";
import { useTranslation } from "react-i18next";
import SearchDropdown from "@/components/searchDropdown/searchDropdown";
import { format, set } from "date-fns";
import ModalComponent from "../../../components/Modal/Modal";
import toastMessage from "../../../utils/toast";
import { ToastContainer } from "react-toastify";
import { search, searchingContract } from "../../../libs/utils";
import { Apartment } from "../../../models/apartment";
import { Floor } from "../../../models/floor";
import { Building } from "../../../models/building";
import FilterButton from "./filter";
export default function Contracts() {
  const [ContractList, setContractList] = useState<Contract[]>([]);
  const [Apartments, setApartments] = useState<Apartment[]>([]);
  const [Buildings, setBuildings] = useState<Building[]>([]);
  const [Floors, setFloors] = useState<Floor[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building>();
  const [selectedFloor, setSelectedFloor] = useState<Floor>();
  const [selectedApartment, setSelectedApartment] = useState<Apartment>();
  const [selectedStatus, setSelectedStatus] = useState<string>();

  const [resetFloorsDropdown, setResetFloorsDropdown] =
    useState<boolean>(false);
  const [resetApartmentsDropdown, setResetApartmentsDropdown] =
    useState<boolean>(false);

  const [t, i18n] = useTranslation();
  const router = useRouter();

  var loadingMore = useMemo<boolean | undefined>(() => undefined, []);
  var page = useMemo(() => {
    return Math.floor(ContractList.length / 30) + 1;
  }, [ContractList]);
  const { isLoading, isError, data, refetch } = useQuery(
    "contract",
    () =>
      axios.get("/api/contract").then((res) => {
        setContractList(res.data as Contract[]);
        let result = [...(res.data as Contract[])];
        return result;
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  const [searchParam, setSearchParam] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedContractId, setSelectedContractId] = useState("");
  const handleConfirmDelete = async (id: string) => {
    console.log(id);
    setShowModal(false);
    try {
      await axios.delete(`/api/contract/${id}`);
      toastMessage({ type: "success", title: "Delete successfully!" });
      setContractList(ContractList.filter((item) => item.contract_id !== id));
    } catch (err) {
      toastMessage({ type: "error", title: "Delete fail!" });
      console.log(err);
    }
  };
  const deleteHandle = (id: string) => {
    console.log(id);
    setSelectedContractId(id);
    setShowModal(true);
  };
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
  
  const ContractSortOption = [
    {
      title: t("building"),
      selections: ["All", ...Buildings.map((building) => building.name)],
      onChange: (index: number) => {
        if (index == 0) {
          setFloors([]);
          setSelectedBuilding(undefined);
        } else {
          setFloors(Buildings[index - 1].floors);
          setSelectedBuilding(Buildings[index - 1]);
        }
        ///To filter in search
        setSelectedFloor(undefined);
        setApartments([]);
        setSelectedApartment(undefined);
        setResetFloorsDropdown(true);
        setResetApartmentsDropdown(true);
      },
    },
    {
      title: t("floor"),
      selections: ["All", ...Floors.map((floor) => floor.name)],
      onChange: (index: number) => {
        if (index == 0) {
          setApartments([]);
          setSelectedFloor(undefined);
        } else {
          setApartments(Floors[index - 1].apartments);
          setSelectedFloor(Floors[index - 1]);
        }
        setSelectedApartment(undefined);
        setResetFloorsDropdown(false);
        setResetApartmentsDropdown(true);
      },
      resetDropdown: resetFloorsDropdown,
    },
    {
      title: t("apartment"),
      selections: ["All", ...Apartments.map((apartment) => apartment.name)],
      onChange: (index: number) => {
        if (index == 0) setSelectedApartment(undefined);
        else setSelectedApartment(Apartments[index - 1]);
        setResetFloorsDropdown(false);
        setResetApartmentsDropdown(false);
      },
      resetDropdown: resetApartmentsDropdown,
    },
    {
      title: t("status"),
      selections: ["All", "Inactive", "Active"],
      onChange: (index: number) => {
        if (index == 0) setSelectedStatus(undefined);
        else setSelectedStatus(["Inactive", "Active"][index - 1]);
      },
    },
  ];
  useEffect(() => {
    if (!data) return;
    let result = [...data];
    if (selectedBuilding)
      result = result.filter(
        (item) => item.apartment.building_id == selectedBuilding.building_id
      );

    if (selectedFloor)
      result = result.filter(
        (item) => item.apartment.floor_id == selectedFloor.floor_id
      );
    if (selectedApartment)
      result = result.filter(
        (item) => item.apartment.apartment_id == selectedApartment.apartment_id
      );
    if (selectedApartment)
      result = result.filter(
        (item) => item.apartment.apartment_id == selectedApartment.apartment_id
      );
    if (selectedStatus)
      result = result.filter(
        (item) => item.status.toLowerCase() == selectedStatus.toLowerCase()
      );

    if (searchParam != "") result = searchingContract(result, searchParam);
    setContractList([...result]);
  }, [data, searchParam, selectedApartment, selectedBuilding, selectedFloor]);
  function handleSearch(params: string): void {
    setSearchParam(params);
  }

  async function handleScrollEnd() {
    if (!loadingMore) {
      loadingMore = true;
      refetch();
      loadingMore = false;
    }
  }
  if (isLoading)
    return (
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
    );
  if (isError)
    return (
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
    );
  return (
    <main className={styles.main} style={futuna.style}>
      <h1>{t("see_all_contract")}</h1>
      <div className={styles.container}>
        <div
          className={styles.itemContainer}
          style={{
            height: "100%",
            width: "35%",
            borderStyle: "none",
            padding: "10px 0",
            margin: 0,
          }}
        >
          <SearchBar
            className={styles.searchBar}
            placeholder={t("search_contract")}
            onChange={handleSearch}
          ></SearchBar>
        </div>
        {ContractSortOption.map((value, index) => (
          <div
            key={index}
            className={styles.itemContainer}
            style={{ height: "100%", width: "15%", padding: "0 1rem" }}
          >
            <FilterButton
              title={value.title}
              selections={value.selections}
              onChange={value.onChange}
              resetDropdown={value.resetDropdown}
            ></FilterButton>
          </div>
        ))}
        <div
          className={styles.itemContainer}
          style={{
            height: "100%",
            width: "15%",
            padding: "0 1rem",
            alignItems: "center",
            alignContent: "center",
            margin: "auto",
            display: "flex",
          }}
        >
          <Button
            onClick={() => {
              router.push("/home/contracts/add?auth=true");
            }}
            style={{ alignItems: "center", fontWeight: 600 }}
          >
            {t("add_contract")}
          </Button>
        </div>
      </div>
      <Table responsive="sm">
        <thead>
          <tr style={{ width: "100%" }} className=" text-center">
            <th>{t("ID")}</th>
            <th>{t("name")}</th>
            <th>{t("phone_number")}</th>
            <th>{t("apartment")}</th>
            <th>{t("status")}</th>
            <th>{t("create_at")}</th>
            <th>{t("expire_at")}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ContractList.map((value, index): ReactNode => {
            return (
              <tr
                key={index}
                className="align-middle text-center"
                style={{ cursor: "pointer" }}
              >
                <td>{value.contract_id}</td>
                <td>{value.resident.profile.name}</td>
                <td>{value.resident.profile.phone_number}</td>
                <td>{value.apartment.name}</td>
                <td>{value.status}</td>
                <td>{format(new Date(value.created_at), "dd-MM-yyyy")}</td>
                <td>
                  {value.expire_at
                    ? format(new Date(value.expire_at), "dd-MM-yyyy")
                    : null}
                </td>{" "}
                <td style={{ width: 20 }}>
                  <div className="d-flex">
                    <Button
                      onClick={() => {
                        router.push(
                          "/home/contracts/update/" +
                            value.contract_id +
                            "?auth=true"
                        );
                      }}
                      variant="warning"
                    >
                      {t("edit")}
                    </Button>

                    <Button
                      onClick={() => deleteHandle(value.contract_id)}
                      variant="danger"
                      style={{ marginLeft: "20px" }}
                    >
                      {t("delete")}
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {loadingMore ? (
        <div
          style={{
            width: "100%",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Spinner></Spinner>
        </div>
      ) : (
        <></>
      )}
      <ModalComponent
        show={showModal}
        title="Có chắc chắn xóa hợp đồng này?"
        handleConfirm={() => handleConfirmDelete(selectedContractId)}
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
