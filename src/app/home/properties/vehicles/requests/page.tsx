"use client";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import styles from "../../../page.module.css";
import vehicleStyles from "./vehicle.module.scss";
import utilStyles from "@/styles/utils.module.scss";
import { clsx } from "clsx";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import SearchLayout from "@/components/searchLayout/searchLayout";
import {
  AddResidentIcon,
  CloseIcon,
  EditIcon,
  SortIcon,
} from "@/components/icons";
import {
  useState,
  ReactNode,
  createRef,
  useRef,
  KeyboardEvent,
  ChangeEventHandler,
  ChangeEvent,
  MouseEvent,
} from "react";
import ModalComponent from "@/components/Modal/Modal";
import { usePathname, useRouter } from "next/navigation";
import { futuna } from "../../../../../../public/fonts/futura";
import { useQuery } from "react-query";
import axios from "axios";
import { loadingFiler, removeLoadingFilter, search } from "@/libs/utils";
import { ToastContainer } from "react-toastify";
import toastMessage from "@/utils/toast";
import PageIndicator from "@/components/pageIndicator/PageIndicator";
import { SortOrder } from "@/models/enums";
import { Vehicle } from "@/models/vehicle";
import {
  FaArrowCircleRight,
  FaArrowLeft,
  FaArrowRight,
  FaBackward,
  FaFacebookMessenger,
  FaPlusCircle,
  FaSearchPlus,
  FaStepBackward,
  FaTicketAlt,
  FaTrash,
} from "react-icons/fa";
import { Button, Image, Stack } from "react-bootstrap";
import { Resident } from "@/models/resident";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
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
export default function Vehicles() {
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const router = useRouter();
  if (!user.id) router.push("/home");
  const [t, i18n] = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [vehicles, setVehicles] = useState<Array<Vehicle>>([]);
  const [showLimit, setShowLimit] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedId, setSelectedId] = useState("");
  const [sortField, setSortField] = useState<String | undefined>(undefined);
  const [selectecVehicle, setSelectedVehicle] = useState<Vehicle | undefined>(
    undefined
  );
  const [selectedResident, setSelectedResident] = useState<
    Resident | undefined
  >(undefined);
  const searchRef = createRef<HTMLInputElement>();
  const retrieveResidents = async () => {
    try {
      loadingFiler(document.body!);
      const res = await axios.get("/api/vehicle");
      removeLoadingFilter(document.body!);
      var data = res.data;
      setVehicles(search(data, "status", "PENDING"));
      return data;
    } catch (error) {
      removeLoadingFilter(document.body!);
      console.log(error);
    }
  };
  const { isLoading, isError, data, refetch } = useQuery(
    "vehicles",
    retrieveResidents,
    {
      staleTime: Infinity,
    }
  );
  const titleTable = [
    { name: "ID", field: "id" },
    { name: t("license_plate"), field: "licensePlate" },
    { name: t("Status"), field: "status" },
    { name: t("vehicle_owner"), field: "residentId" },
  ];
  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(data);
    if (e.currentTarget.value == "") setVehicles(data);
    else setVehicles(search(data, "licensePlate", e.currentTarget.value));
  };
  const handleConfirmDelete = async (id: string) => {
    loadingFiler(document.body!);
    setShowModal(false);
    //Axios goes here
    removeLoadingFilter(document.body!);
  };
  const handleShowLimit = (event: React.ChangeEvent) => {
    event.preventDefault();
    const value = (event.target! as HTMLSelectElement).value;
    setShowLimit(Number.parseInt(value));
  };
  const handlePageNumberChange = (value: number) => {
    if (Math.ceil(vehicles.length / showLimit) >= value) setPageNumber(value);
  };
  function handleChangeOrder(order: SortOrder, title: String) {
    setVehicles([
      ...vehicles.sort(
        (a, b) =>
          -order *
          (a[title as keyof Vehicle] ?? "")
            .toString()
            .localeCompare((b[title as keyof Vehicle] ?? "").toString())
      ),
    ]);
    setSortField(title);
  }
  async function handleMoreInfo(vehicle: Vehicle | undefined) {
    setSelectedVehicle(vehicle);
    if (!vehicle) return;
    await axios
      .get("/api/resident/" + vehicle.residentId)
      .then((res) => setSelectedResident(res.data as Resident))
      .catch((error) => {
        console.log(error);
        toastMessage({
          type: "error",
          title: "Đã có lỗi xảy ra",
        });
      });
  }
  function handleZoomIn(e: MouseEvent<HTMLButtonElement>): void {}

  async function handleAccept(vehicle: Vehicle | undefined) {
    if (!vehicle) return;
    loadingFiler(document.body!);
    await axios
      .patch("/api/vehicle/" + vehicle?.id, {
        status: "APPROVED",
      })
      .then((res) => {
        toastMessage({
          type: "Success",
          title: "Chấp nhận yêu cầu thành công",
        });
        setSelectedVehicle(undefined);
        handleMoreInfo(undefined);
      })
      .catch((error) => {
        toastMessage({
          type: "Error",
          title: "Đã có lỗi xảy ra.",
        });
      });
    refetch();
    removeLoadingFilter(document.body!);
  }

  async function handleReject(vehicle: Vehicle | undefined) {
    if (!vehicle) return;
    loadingFiler(document.body!);
    await axios
      .patch("/api/vehicle/" + vehicle?.id, {
        status: "REJECTED",
      })
      .then((res) => {
        toastMessage({
          type: "Success",
          title: "Từ chối yêu cầu thành công.",
        });
        setSelectedVehicle(undefined);
        handleMoreInfo(undefined);
      })
      .catch((error) => {
        console.log(error);
        toastMessage({
          type: "Error",
          title: "Đã có lỗi xảy ra.",
        });
      });
    refetch();
    removeLoadingFilter(document.body!);
  }

  return (
    <main className={clsx(styles.main)}>
      <div className={clsx(vehicleStyles.wrapper, futuna.className)}>
        <h1 className={clsx(utilStyles.headingXl)}>
          Danh sách yêu cầu đăng ký phương tiện
        </h1>

        <div style={{ display: "flex" }}>
          {!selectecVehicle ? (
            <motion.div
              className={`${vehicleStyles.show}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              layoutId="detailInfo"
              id="vehicleTable"
            >
              <div className="d-flex w-100 mt-3 justify-content-between">
                <div className={clsx(vehicleStyles.perPage)}>
                  <span>Show</span>
                  <span>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={(e) => handleShowLimit(e)}
                    >
                      {listOptions.map(
                        (option, index): JSX.Element => (
                          <option key={index} value={option.value}>
                            {option.value}
                          </option>
                        )
                      )}
                    </Form.Select>
                  </span>
                  <span>Entries</span>
                </div>
                <SearchLayout
                  onChange={handleSearch}
                  placeHolder="Tìm phương tiện..."
                  ref={searchRef}
                />
              </div>
              <div className="w-100 mt-5">
                <Table
                  className={clsx(
                    vehicleStyles.tableResident,
                    futuna.className
                  )}
                  striped
                  bordered
                  hover
                >
                  <thead>
                    <tr>
                      {titleTable.map((title, index) => (
                        <th key={index}>
                          {title.name}{" "}
                          <SortIcon
                            width={12}
                            height={12}
                            isUsed={sortField == title.field}
                            onChangeOrder={(order) => {
                              handleChangeOrder(order, title.field);
                            }}
                          />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles
                      .slice(
                        (pageNumber - 1) * showLimit,
                        (pageNumber - 1) * showLimit + showLimit - 1
                      )
                      .map((vehicle, index): ReactNode => {
                        return (
                          <tr key={index}>
                            <td>{vehicle.id}</td>
                            <td>{vehicle.licensePlate}</td>
                            <td>{vehicle.status}</td>
                            <td>{vehicle.residentId}</td>
                            <td
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <div className="d-flex">
                                <ButtonComponent
                                  onClick={() => handleAccept(vehicle)}
                                  preIcon={
                                    <FaArrowCircleRight></FaArrowCircleRight>
                                  }
                                  className={clsx(
                                    vehicleStyles.cudBtn,
                                    vehicleStyles.approveBtn
                                  )}
                                >
                                  {t("accept")}
                                </ButtonComponent>
                                <ButtonComponent
                                  onClick={() => handleReject(vehicle)}
                                  preIcon={<CloseIcon width={16} height={16} />}
                                  className={clsx(
                                    vehicleStyles.cudBtn,
                                    vehicleStyles.deleteBtn
                                  )}
                                >
                                  {t("reject")}
                                </ButtonComponent>
                                <ButtonComponent
                                  onClick={() => handleMoreInfo(vehicle)}
                                  className={clsx(
                                    vehicleStyles.cudBtn,
                                    vehicleStyles.editBtn
                                  )}
                                  sufIcon={<FaArrowRight />}
                                >
                                  {t("info")}
                                </ButtonComponent>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
              {vehicles.length ? (
                <PageIndicator
                  pageLength={Math.ceil(vehicles.length / showLimit)}
                  currentPage={pageNumber}
                  clickHandler={handlePageNumberChange}
                />
              ) : (
                <div style={{ width: "100%", textAlign: "center" }}>
                  Nothing to show
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              id={"vehicleInfo"}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              layoutId="detailInfo"
              className={`${vehicleStyles.show}`}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={() => handleMoreInfo(undefined)}>
                  <FaArrowLeft />
                </button>
                <div style={{ display: "flex" }}>
                  <ButtonComponent
                    className={clsx(vehicleStyles.pendingBtn, futuna.className)}
                    onClick={() => handleAccept(selectecVehicle)}
                  >
                    Đồng ý
                  </ButtonComponent>
                  <div style={{ width: "1vw" }} />
                  <ButtonComponent
                    onClick={() => handleReject(selectecVehicle)}
                    className={clsx(
                      vehicleStyles.cudBtn,
                      vehicleStyles.deleteBtn
                    )}
                  >
                    Từ chối
                  </ButtonComponent>
                </div>
              </div>
              <div style={{ padding: "1vw" }}>
                <div style={{ display: "flex" }}>
                  {" "}
                  <div style={{ width: "50%", padding: "2vw" }}>
                    <h4>Biển số xe</h4>
                    <Image
                      src={selectecVehicle!.licensePlatePhotoURL}
                      alt="LicensePlate"
                      fluid
                      style={{ marginBottom: "1vw" }}
                    />
                  </div>
                  <div style={{ width: "50%" }}>
                    <h3 style={{ textAlign: "center" }}>{t("vehicle_owner")}</h3>
                    <p>Họ và tên: {selectedResident?.profile.name}</p>
                    <p>SĐT: {selectedResident?.profile.phone_number}</p>
                    <p
                      style={{
                        color: selectedResident?.profile.identify_number
                          ? "black"
                          : "GrayTextF",
                      }}
                    >
                      CCCD:{" "}
                      {selectedResident?.profile.identify_number ??
                        "Chưa cập nhật"}
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div
                    className={vehicleStyles.itemImage}
                    style={{ marginRight: "3vw" }}
                  >
                    <h5>Mặt trước giấy tờ xe</h5>
                    <Stack style={{ position: "relative", height: "10vw" }}>
                      <Image
                        src={selectecVehicle!.frontRegistrationPhotoURL}
                        alt="LicensePlate"
                        fluid
                        className={vehicleStyles.reponsiveImage}
                        style={{ maxHeight: "100%" }}
                      />
                      <button
                        type="button"
                        className={vehicleStyles.deleteImageButton}
                        onClick={(e) => handleZoomIn(e)}
                      >
                        <FaSearchPlus />
                      </button>
                    </Stack>
                  </div>
                  <div className={vehicleStyles.itemImage}>
                    <h5>Mặt sau giấy tờ xe</h5>
                    <Stack style={{ position: "relative", height: "10vw" }}>
                      <Image
                        src={selectecVehicle!.backRegistrationPhotoURL}
                        alt="LicensePlate"
                        fluid
                        style={{ maxHeight: "100%" }}
                      />
                      <button
                        type="button"
                        className={vehicleStyles.deleteImageButton}
                      >
                        <FaSearchPlus />
                      </button>
                    </Stack>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <ModalComponent
        show={showModal}
        title="Có chắc chắn xóa phương tiện này này?"
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
