"use client";
import React, {
  ChangeEvent,
  ReactNode,
  createRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "./addContract.module.css";
import { futuna } from "../../../../../../public/fonts/futura";
import { useTranslation } from "react-i18next";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
  Spinner,
  Tab,
  Table,
} from "react-bootstrap";
import SearchDropdown from "@/components/searchDropdown/searchDropdown";
import { format, set } from "date-fns";
import { Resident } from "@/models/resident";
import axios from "axios";
import { useQuery } from "react-query";
import { Apartment } from "@/models/apartment";
import { Building } from "@/models/building";
import SearchBar from "@/components/searchBar/searchBar";
import { loadingFiler, removeLoadingFilter } from "../../../../../libs/utils";
import toastMessage from "../../../../../utils/toast";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import SearchLayout from "../../../../../components/searchLayout/searchLayout";
import CustomTextBox from "../../../../../components/textBox/textBox";
import { Floor } from "../../../../../models/floor";
import { Contract } from "../../../../../models/contract";
import DragDropFileInput from "../../../../../components/dragDropFileInput/drapDropFileInput";
import { FaUpload } from "react-icons/fa";
type CreateContractParams = {
  resident_id: string;
  apartment_id: string;
  role: string;
  status: string;
  created_at?: string;
  expire_at: string;
};
export default function Page({ params }: { params: { id: string } }) {
  const [t, i18n] = useTranslation();
  const [selectedResident, setSelectedResident] = useState<Resident>();
  const [Residents, setResidents] = useState<Resident[]>([]);
  const [Apartments, setApartments] = useState<Apartment[]>([]);
  const [Buildings, setBuildings] = useState<Building[]>([]);
  const [Floors, setFloors] = useState<Floor[]>([]);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [errors, setErrors] = useState<any>();
  const [contract, setContract] = useState<Contract>();
  const [resetFloorsDropdown, setResetFloorsDropdown] =
    useState<boolean>(false);
  const [resetApartmentsDropdown, setResetApartmentsDropdown] =
    useState<boolean>(false);

  const [createContractParams, setCreateContractParams] =
    useState<CreateContractParams>({
      resident_id: "",
      apartment_id: "",
      role: "rent",
      status: "inactive",
      created_at: "",
      expire_at: "",
    });
  const searchRef = createRef<HTMLInputElement>();

  const handleSearch = async (e: any) => {
    if (e.key === "Enter") {
      try {
        const res = await axios.get("/api/resident/search", {
          params: {
            query: searchRef.current?.value,
          },
        });
        setResidents(res.data);
      } catch (e) {
        alert(e);
      }
    }
  };
  const searchIconClick = async () => {
    try {
      const res = await axios.get("/api/resident/search", {
        params: {
          query: searchRef.current?.value,
        },
      });
      setResidents(res.data);
    } catch (e) {
      alert(e);
    }
  };

  const handleUpdate = async () => {
    async function addImage(data: FormData, fileList: (File | URL)[]) {
      for await (const iterator of fileList) {
        if (iterator instanceof URL) data.append("imageUpdate", iterator.href);
        else data.append("imageUpdate", iterator);
      }
    }

    const err = validation();
    setErrors(err);

    if (Object.keys(err).length === 0) {
      const form = new FormData();
      form.append("resident_id", createContractParams.resident_id);
      form.append("apartment_id", createContractParams.apartment_id);
      form.append("role", createContractParams.role);
      if (createContractParams.role != "buy") {
        form.append(
          "expire_at",
          `${createContractParams.expire_at}T03:37:07.070Z`
        );
      }

      try {
        loadingFiler(document.body!);
        await addImage(form, selectedFiles).then(async () => {
          await axios
            .patch("/api/contract/" + params.id, form)
            .then((response) => {
              removeLoadingFilter(document.body!);
              toastMessage({ type: "success", title: "Update successfully!" });
            })
            .catch((e) => {
              removeLoadingFilter(document.body!);
              toastMessage({ type: "error", title: "Update fail!" });
            });
        });
      } catch (e) {
        console.log(e);
      }
    }
  };
  const validation = () => {
    let err = {} as CreateContractParams;
    if (createContractParams.apartment_id === "") {
      err.apartment_id = "Vui lòng chọn phòng!";
    }
    if (
      createContractParams.expire_at === "" &&
      createContractParams.role != "buy"
    ) {
      err.expire_at = "Vui lòng chọn ngày hết hạn!";
    }
    if (createContractParams.resident_id === "") {
      err.resident_id = "Vui lòng chọn cư dân!";
    }
    return err;
  };
  useQuery(
    "resident",
    () =>
      axios.get("/api/resident").then((res) => {
        setResidents(res.data as Resident[]);
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  const { isLoading, isError, data, refetch } = useQuery(
    "contract",
    async () =>
      await axios.get("/api/contract/" + params.id).then((res) => {
        setSelectedResident(res.data.resident);
        const contract = res.data as Contract;
        setCreateContractParams({
          ...createContractParams,
          resident_id: contract.resident_id,
          apartment_id: contract.apartment_id,
          role: contract.role,
          status: contract.status,
          expire_at: contract.expire_at
            ? new Date(contract.expire_at).toISOString().split("T")[0]
            : "",
        });
        return contract;
      }),
    {
      refetchOnWindowFocus: false,
    }
  );

  const [selectedFiles, setSelectedFiles] = useState<(File | URL)[]>([]);
  function handleFileChange(files: (File | URL)[]): void {
    setSelectedFiles(files);
  }
  const [expire_at, setExpire_at] = useState<Date>();

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
  useEffect(() => {
    if (data && data.expire_at) setExpire_at(new Date(data.expire_at));
  }, [data]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newObj = {
        ...createContractParams,
        [e.target.name]: e.target.value,
      };
      setCreateContractParams(newObj);
    },
    [createContractParams]
  );
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
  if (data) {
    const ContractSortOptions = [
      {
        title: t("building"),
        child: (
          <SearchDropdown
            title={data.apartment?.floor?.building.name ?? ""}
            selections={Buildings.map((building) => building.name)}
            onChange={(index) => {
              setFloors(Buildings[index].floors);
              setResetFloorsDropdown(true);
              setResetApartmentsDropdown(true);
              const newObj = {
                ...createContractParams,
                ["apartment_id"]: "",
              };
              setCreateContractParams(newObj);
            }}
            style={{ width: "100%" }}
          ></SearchDropdown>
        ),
      },
      {
        title: t("floor"),
        child: (
          <SearchDropdown
            title={data.apartment?.floor ? data.apartment?.floor.name : ""}
            selections={Floors.map((floor) => floor.name)}
            onChange={(index) => {
              setApartments(Floors[index].apartments);
              setResetFloorsDropdown(false);
              setResetApartmentsDropdown(true);
              const newObj = {
                ...createContractParams,
                ["apartment_id"]: "",
              };
              setCreateContractParams(newObj);
            }}
            style={{ width: "100%" }}
            resetDropdown={resetFloorsDropdown}
          ></SearchDropdown>
        ),
      },
      {
        title: t("apartment"),
        required: true,
        child: (
          <div style={{ width: "100%" }}>
            {" "}
            <SearchDropdown
              title={data.apartment.name}
              style={{ width: "100%" }}
              selections={Apartments.map((apartment) => apartment.name)}
              onChange={(index) => {
                setResetFloorsDropdown(false);
                setResetApartmentsDropdown(false);
              
                const newObj = {
                  ...createContractParams,
                  ["apartment_id"]: Apartments[index].apartment_id,
                };
                setCreateContractParams(newObj);
              }}
              resetDropdown={resetApartmentsDropdown}
            ></SearchDropdown>
            {errors && errors.apartment_id && (
              <span className={styles.error}>{errors.apartment_id}</span>
            )}
          </div>
        ),
      },
    ];
    const DateSortOptions = [
      {
        title: t("contractRole"),
        required: true,

        child: (
          <SearchDropdown
            title={data.role}
            selections={["rent", "buy"]}
            onChange={(index) => {
              const newObj = {
                ...createContractParams,
                role: ["rent", "buy"][index],
              };
              setCreateContractParams(newObj);
            }}
            style={{ width: "100%" }}
          ></SearchDropdown>
        ),
      },
      {
        title: t("create_at"),
        child: (
          <Form.Group style={{ width: "100%" }}>
            <Form.Control
              size="lg"
              type="date"
              name="create_at"
              disabled
              value={new Date(data.created_at).toISOString().split("T")[0]}
              onChange={handleChange}
            />
          </Form.Group>
        ),
      },
      createContractParams.role != "buy"
        ? {
            title: t("expire_at"),
            required: true,

            child: (
              <Form.Group style={{ width: "100%" }}>
                {data.expire_at ? (
                  <>
                    <Form.Control
                      size="lg"
                      type="date"
                      name="expire_at"
                      value={
                        (expire_at ?? new Date()).toISOString().split("T")[0]
                      }
                      onChange={(e) => {
                        handleChange(e as ChangeEvent<HTMLInputElement>);
                        setExpire_at(new Date(e.target.value));
                      }}
                    />
                    {errors && errors.expire_at && (
                      <span className={styles.error}>{errors.expire_at}</span>
                    )}
                  </>
                ) : (
                  <>
                    <Form.Control
                      size="lg"
                      type="date"
                      name="expire_at"
                      onChange={handleChange}
                    />
                    {errors && errors.expire_at && (
                      <span className={styles.error}>{errors.expire_at}</span>
                    )}
                  </>
                )}
              </Form.Group>
            ),
          }
        : null,
    ];
    const residentDetails = selectedResident
      ? [
          {
            title: t("birthday"),
            value:
              selectedResident &&
              format(
                new Date(selectedResident.profile.date_of_birth),
                "dd-MM-yyyy"
              ),
          },
          {
            title: t("gender"),
            value: t(selectedResident.profile.gender),
          },
          {
            title: t("phone_number"),
            value: selectedResident.profile.phone_number,
          },
        ]
      : [];
    return (
      <main className={styles.main} style={futuna.style}>
        <h1 style={{ width: "100%", margin: "0 auto", textAlign: "center" }}>
          {t("update_contract")}
        </h1>
        <Container style={{ padding: 0, marginTop: "50px" }}>
          <Row>
            <Col>
              {ContractSortOptions.map((option) => FilterButton(option))}
            </Col>
            <Col style={{ display: "flex", justifyContent: "flex-end" }}>
              <div>
              {DateSortOptions.map((option) =>
                option != null ? FilterButton(option) : null
              )}
              </div>
            </Col>
          </Row>
        </Container>

        <Container style={{ padding: 0, marginTop: "20px" }}>
          <Row>
            <Col>
              <h5 className={styles.required} style={{ width: "100px" }}>
                {t("resident")}
              </h5>
            </Col>
            <Col md="auto">
              <Button onClick={() => setShow(true)}>
                {t("choose_resident")}
              </Button>
            </Col>

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
                    onKeydown={handleSearch}
                    iconClick={searchIconClick}
                    placeHolder={t("search_resident")}
                    ref={searchRef}
                  />
                </div>

                <Table
                  style={{ width: "100%", marginTop: "50px" }}
                  striped
                  hover
                >
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
                    {Residents.map((resident, index): ReactNode => {
                      const time = new Date(resident.created_at);
                      const createAt = format(time, "yyyy-MM-dd HH:mm:ss");
                      const handleRowClick = () => {
                        setSelectedResident(resident);
                        setCreateContractParams({
                          ...createContractParams,
                          resident_id: resident.id,
                        });
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
          </Row>
        </Container>

        <Container style={{ padding: 0, marginTop: "20px" }}>
          {selectedResident && (
            <Row className="align-items-center">
              <Col md="auto" className="align-self-stretch">
                <Image
                  loading="lazy"
                  width={250}
                  rounded
                  src={
                    selectedResident.profile?.avatarURL ??
                    "https://imgs.search.brave.com/2ec7dbMPC48d2bieXN1dJNsWbdhSFZ3lmUSPNwScvCQ/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9mdW55/bGlmZS5pbi93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMy8wNC84/MF9DdXRlLUdpcmwt/UGljLVdXVy5GVU5Z/TElGRS5JTl8tMS0x/MDI0eDEwMjQuanBn"
                  }
                ></Image>
                <p>{selectedResident.profile.name}</p>
                <p>{selectedResident.id}</p>
              </Col>
              <Col className="align-self-stretch">
                {residentDetails.map((detail, index) => (
                  <Row key={index} className="mb-5">
                    <CustomTextBox
                      title={detail.title}
                      value={detail.value}
                      isDisable={true}
                    ></CustomTextBox>
                  </Row>
                ))}
              </Col>
              <Col className="d-flex flex-column justify-content-between" md="auto">
                <Image
                  src={selectedResident.profile.front_identify_card_photo_URL}
                  width={400}
                  height={200}
                  loading="lazy"
                  rounded
                ></Image>
                <Image
                  src={selectedResident.profile.back_identify_card_photo_URL}
                  width={400}
                  height={200}
                  loading="lazy"
                  rounded
                  style={{ marginTop: "20px" }}
                ></Image>
              </Col>
            </Row>
          )}
          {errors && errors.resident_id && (
            <span className={styles.error}>{errors.resident_id}</span>
          )}
          <Row style={{ marginTop: "20px" }}>
            {" "}
            <Form.Group style={{ height: "500px" }}>
              <DragDropFileInput
                onChange={handleFileChange}
                id="label-file-upload"
                multiFile={false}
                initFileList={
                  data.contract_with_signature_photo_URL
                    ? [new URL(data.contract_with_signature_photo_URL)]
                    : []
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
            </Form.Group>
          </Row>
          <Row
            style={{
              display: "flex",
              marginTop: selectedResident ? "30px" : "220px",
              justifyContent: "center",
              position: "relative",
              left: "45%",
              marginBottom: "50px",
            }}
          >
            <Col
              style={{
                marginTop: "20px",
              }}
            >
              <Button onClick={handleUpdate} style={{ width: "100px" }}>
                {t("update")}
              </Button>
            </Col>
          </Row>
        </Container>
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
}

const FilterButton = ({
  title,
  child,
  required,
}: {
  title: string;
  child?: React.ReactNode;
  required?: boolean;
}): React.ReactNode => {
  return (
    <Container
      className={` ${futuna.className}`}
      style={{ padding: 0, margin: "10px 0", width: "100%" }}
    >
      <Row className="align-items-center">
        <Col >
          <p
            style={{
              width: "100px",
              alignItems: "center",
              display: "flex",
              padding: 0,
              margin: 0,
              marginRight: "20px",
            }}
            className={required ? styles.required : styles.non}
          >
            {title}
          </p>
        </Col>
        <Col md="auto"
          style={{
            width: "400px",
            alignContent: "center",
            display: "flex",
            padding: 0,
            height: "50px",
            margin: 0,
          }}
        >
          {child}
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
