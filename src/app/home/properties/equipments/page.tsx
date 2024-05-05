"use client";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import styles from "../../page.module.css";
import equipmentStyles from "./equipments.module.scss";
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
} from "react";
import ModalComponent from "@/components/Modal/Modal";
import { usePathname, useRouter } from "next/navigation";
import { futuna } from "../../../../../public/fonts/futura";
import { useQuery } from "react-query";
import axios from "axios";
import { loadingFiler, removeLoadingFilter, search } from "@/libs/utils";
import { ToastContainer } from "react-toastify";
import toastMessage from "@/utils/toast";
import PageIndicator from "@/components/pageIndicator/PageIndicator";
import { SortOrder } from "@/models/enums";
import { FaFacebookMessenger } from "react-icons/fa";
import { Equipment } from "@/models/equipment";
import { Carousel, CarouselItem, Image } from "react-bootstrap";
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

  const [showModal, setShowModal] = useState(false);
  const [vehicles, setVehicles] = useState<Array<Equipment>>([]);
  const [showLimit, setShowLimit] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedId, setSelectedId] = useState("");
  const [sortField, setSortField] = useState<String | undefined>(undefined);
  const searchRef = createRef<HTMLInputElement>();
  const path = usePathname();
  const deleleHandle = (id: string) => {
    setSelectedId(id);
    setShowModal(true);

  };
  const retrieveResidents = async () => {
    try {
      loadingFiler(document.getElementById("mainContent"));
      const res = await axios.get("/api/equipment");
      removeLoadingFilter(document.getElementById("mainContent"));
      setVehicles(res.data);
      return res.data;
    } catch (error) {
      removeLoadingFilter(document.getElementById("mainContent"));
      console.log(error);
    }
  };
  const { isLoading, isError, data, refetch } = useQuery(
    "equipments",
    retrieveResidents,
    {
      staleTime: Infinity,
    }
  );
  const titleTable = [
    { name: "Tên thiết bị", field: "name" },
    { name: "Tình trạng", field: "status" },
    { name: "Căn hộ / Tòa nhà lắp đặt", field: "apartment_id" },
    { name: "Ngày khởi tạo", field: "created_at" },
  ];
  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log(data);
    if (e.currentTarget.value == "") setVehicles(data);
    else setVehicles(search(data, "licensePlate", e.currentTarget.value));
  };
  const handleConfirmDelete = async (id: string) => {
    loadingFiler(document.getElementById("mainContent"));
    setShowModal(false);
    await axios
      .delete(`/api/equipment/${id}`)
      .then((res) => {
        toastMessage({ type: "success", title: "Delete successfully!" });
        refetch();
      })
      .catch((err) => {
        toastMessage({ type: "error", title: "Delete failed!" });
        console.log(err);
      });
    refetch()
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
          (a[title as keyof Equipment] ?? "").toString().localeCompare(
            (b[title as keyof Equipment] ?? "").toString()
          )
      ),
    ]);
    setSortField(title);
  }

  return (
    <main className={clsx(styles.main)}>
      <div className={clsx(equipmentStyles.wrapper, futuna.className)}>
        <h1 className={clsx(utilStyles.headingXl)}>
          Quản lí thiết bị chung cư
        </h1>
        <div className={clsx(equipmentStyles.header)}>
          <h1 className={clsx(utilStyles.headingLg)}>Danh sách thiết bị</h1>
          <ButtonComponent
            href={`${path}/add`}
            preIcon={<AddResidentIcon width={24} height={24} />}
            className={clsx(equipmentStyles.addBtn, futuna.className)}
          >
            Thêm thiết bị
          </ButtonComponent>
        </div>
        <div className="d-flex w-100 mt-3 justify-content-between">
          <div className={clsx(equipmentStyles.perPage)}>
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
            placeHolder="Tìm thiết bị..."
            ref={searchRef}
          />
        </div>
        <div className="w-100 mt-5">
          <Table
            className={clsx(equipmentStyles.tableResident, futuna.className)}
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
                .map((equipment, index): ReactNode => {
                  return (
                    <>
                      <tr
                        key={index}
                        className={styles.zebraTable}
                        onClick={(e) => {
                          if (
                            !e.currentTarget.className.includes(styles.active)
                          )
                            e.currentTarget.className += ` ${styles.active}`;
                          else
                            e.currentTarget.className =
                              e.currentTarget.className.split(styles.active)[0];
                        }}
                      >
                        <td>{equipment.name}</td>
                        <td>{equipment.status}</td>
                        <td>
                          {equipment.apartment_id || equipment.building_id}
                        </td>
                        <td>{equipment.created_at}</td>
                      </tr>
                      <tr className={`${styles.rowDetail} `}>
                        <td colSpan={titleTable.length}>
                          <div className="d-flex">
                            <div style={{ width: "50%" }}>
                              <Carousel fade>
                                {equipment.imageURLs.map((value, index) => (
                                  <CarouselItem key={index}>
                                    {" "}
                                    <Image
                                      loading="lazy"
                                      className=" img-fluid h-100 w-100"
                                      src={value}
                                      alt="images"
                                      rounded
                                    ></Image>
                                  </CarouselItem>
                                ))}
                              </Carousel>
                            </div>
                            <div style={{ width: "50%" }}>
                              <div
                                className="d-flex"
                                style={{
                                  width: "100%",
                                  flexDirection: "row-reverse",
                                }}
                              >
                                <ButtonComponent
                                  preIcon={<EditIcon width={16} height={16} />}
                                  className={clsx(
                                    equipmentStyles.cudBtn,
                                    equipmentStyles.editBtn
                                  )}
                                  href={`${path}/edit/` + equipment.id}
                                >
                                  Sửa
                                </ButtonComponent>
                                <div style={{ width: "1vw", height: "100%" }} />
                                <ButtonComponent
                                  onClick={() => deleleHandle(equipment.id)}
                                  preIcon={<CloseIcon width={16} height={16} />}
                                  className={clsx(
                                    equipmentStyles.cudBtn,
                                    equipmentStyles.deleteBtn
                                  )}
                                >
                                  Xóa
                                </ButtonComponent>
                              </div>
                              <div
                                style={{ textAlign: "left", fontSize: "1.2vw" }}
                              >
                                <p>{`Mã thiết bị: ${equipment.id}`}</p>
                                <p>{`Tên thiết bị: ${equipment.name}`}</p>
                                <div style={{ display: "flex", padding:"0" }}>
                                  {equipment.building_id && (
                                    <p>{`Tòa nhà: ${equipment.building_id}`}</p>
                                  )}
                                  {equipment.floor_id && (
                                    <p>{`Tầng: ${equipment.floor_id}`}</p>
                                  )}
                                </div>
                                {equipment.apartment_id && (
                                  <p>{`Căn hộ: ${equipment.apartment_id}`}</p>
                                )}
                                <p>{`Ngày tạo: ${equipment.created_at}`}</p>
                                {equipment.deleted_at && (
                                  <p>{`Xóa ngày: ${equipment.deleted_at}`}</p>
                                )}
                                <p>{`Tình trạng: ${equipment.status}`}</p>
                                <p>{`Mô tả: ${equipment.description}`}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
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
            maxPageButton={3}
          />
        ) : (
          <div style={{ width: "100%", textAlign: "center" }}>
            Nothing to show
          </div>
        )}
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
