"use client";
import { Service } from "@/models/service";
import styles from "./page.module.css";
import {
  Button,
  Carousel,
  Col,
  Container,
  Dropdown,
  Form,
  Image,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import classNames from 'classnames';
import Furniture from "../../../../components/apartmentDetail/furniture";
import { futuna } from "../../../../../public/fonts/futura";
import { ChangeEvent, use, useEffect, useState } from "react";
import { endpoint } from "@/constraints/endpoints";
import { useQuery } from "react-query";
import axios from "axios";
import ServicePackage from "../../../../components/servicePackage/servicePackage";
import ServicePackageModal from "./addServicePackage";
import { ToastContainer } from "react-toastify";
import toastMessage from "../../../../utils/toast";
import StarRatings from "react-star-ratings";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import { Feedback } from "@/models/feedback";
import { Resident } from "@/models/resident";
import { Value } from "sass";
import ServicePackageLayout from "../../../../components/servicePackage/servicePackage";
import { UserProfile } from "../../../../libs/UserProfile";
import { Invoice } from "../../../../models/invoice";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { serialize } from "v8";
import ModalComponent from "@/components/Modal/Modal";
import { CloseIcon } from "@/components/icons";
import { format, set } from "date-fns";
export default function Page({ params }: { params: { id: string } }) {
  // let service:service= JSON.parse("{'id':'123', 'name':'M}");
  //console.log(service);
  type FormValue = {
    rating: string;
    comment: string;
    service_id: string;
    resident_id: string;
    created_at: string
  };
  const router = useRouter();
  const calculateTopPosition = (commentLength: number) => {
    const thresholdLength1 = 100;
    const thresholdLength2 = 200;
    const thresholdLength3 = 300;
    const thresholdLength4 = 400;
    const thresholdLength5 = 500;
    const topPosition1 = -140;
    const topPosition2 = -160;
    const topPosition3 = -180;
    const topPosition4 = -190;
    const topPosition5 = -210;
    if (commentLength > thresholdLength5) {
      return topPosition5;
    } else if (commentLength > thresholdLength4) {
      return topPosition4;
    } else if (commentLength > thresholdLength3) {
      return topPosition3;
    } else if (commentLength > thresholdLength2) {
      return topPosition2;
    } else {
      return topPosition1;
    }
  };
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const isSmailSceen = width <= 1000;
  const is1200 = width <= 1300;
  const ismayHa = width <= 1400;
  const isMobile = width <= 480;
  const [formValue, setFormValue] = useState<FormValue>({
    rating: "",
    comment: "",
    service_id: params.id,
    resident_id: "",
    created_at: new Date().toISOString(),
  });
  const [selectedId, setSelectedId] = useState("");
  const deleleHandle = (id: string) => {
    setSelectedId(id);
    setShowModalDelete(true);
  };
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);
  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = await UserProfile.getProfile();
      setFormValue((prevState) => ({ ...prevState, resident_id: user.id }));
    };

    fetchUserProfile();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/feedback?service_id=${params.id}`);
        setFeedbackData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [params.id]);
  const retrieveFeedback = async () => {
    try {
      loadingFiler(document.body!);
      const res = await axios.get('/api/feedback');
      removeLoadingFilter(document.body!);
      const floorData = res.data;
      setFeedbackData(floorData);
      console.log(floorData);
      return res.data;
    } catch (error) {
      removeLoadingFilter(document.body!);
      console.log(error);
    }
  };
  const [errors, setErrors] = useState<any>();
  const validation = () => {
    let err = {} as FormValue;

    if (formValue.rating === "") {
      err.rating = "Trường rating là bắt buộc!";
    }
    if (formValue.comment === "") {
      err.comment = "Trường comment là bắt buộc!";
    }

    return err;
  };
  const addFeedback = (newFeedback: Feedback) => {
    setFeedbackData(prevFeedbackData => [
      ...prevFeedbackData,
      { ...formValue, feedback_id: "" } as Feedback,
    ]);
  };
  const createHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("createHandle called");
    console.log("formValue:", formValue);
    const err = validation();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      const form = new FormData();
      const user = UserProfile.getProfile();
      form.append("rating", formValue.rating);
      form.append("comment", formValue.comment);
      form.append("service_id", formValue.service_id);
      form.append("resident_id", formValue.resident_id);
      try {
        // loadingFiler(document.body!);
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
        await axios.post(`/api/feedback/`, form);
        addFeedback({
          rating: formValue.rating, comment: formValue.comment,
          feedback_id: "",
          resident_id: user.id,
          service_id: params.id,
          created_at: formattedDate,
          service: {
            service_id: "",
            name: "",
            description: "",
            imageURLs: undefined,
            servicePackages: []
          },
          resident: {
            role: "",
            id: "",
            profile: {
              name: "",
              date_of_birth: new Date,
              gender: "",
              front_identify_card_photo_URL: "",
              back_identify_card_photo_URL: "",
              phone_number: "",
              identify_number: "",
              avatarURL: ""
            },
            contracts: undefined,
            stay_at: undefined,
            created_at: new Date
          }
        });
        setFormValue({ rating: "", comment: "", resident_id: user.id, service_id: params.id, created_at: "" });
        removeLoadingFilter(document.body!);
        toastMessage({ type: "success", title: "Create successfully!" });
        window.location.reload();
      } catch (e) {
        console.log(e);
        removeLoadingFilter(document.body!);
        toastMessage({ type: "error", title: "Create faily!" });
      }
    }
  };
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const newObj = { ...formValue, [e.target.name]: e.target.value };
  //   setFormValue(newObj);
  // };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({ ...prevState, [name]: value }));
  };
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [t, i18n] = useTranslation();

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setFormValue((prevState) => ({
      ...prevState,
      rating: newRating.toString(),
    }));
  };
  const handleModalOpen = () => {
    setShowModal(true);
  };
  const handleConfirmDelete = async (id: string) => {
    setShowModalDelete(false);
    try {
      await axios.delete(`/api/feedback/${id}`).then(() => {
        const deletedFeedback = JSON.parse(localStorage.getItem('deletedFeedback') || '[]');
        deletedFeedback.push(id);
        localStorage.setItem('deletedFeedback', JSON.stringify(deletedFeedback));
        setFeedbackData(prevFeedbackData =>
          prevFeedbackData.filter(feedback => feedback.feedback_id !== id)
        );
        toastMessage({ type: "success", title: "Delete successfully!" });
      });
    } catch (err) {
      toastMessage({ type: "error", title: "Delete fail!" });
      console.log(err);
    }
  };
  useEffect(() => {
    const deletedFeedback = JSON.parse(localStorage.getItem('deletedFeedback') || '[]');
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/feedback?service_id=${params.id}`);
        const filteredFeedback = res.data.filter((feedback: { feedback_id: any; }) => !deletedFeedback.includes(feedback.feedback_id));
        setFeedbackData(filteredFeedback);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [params.id]);

  const handleModalClose = async () => {
    await refetch();
    setShowModal(false);
  };


  const { isLoading, data, isError, refetch } = useQuery(
    "service",
    () =>
      axios.get("/api/service/" + params.id).then((res) => res.data as Service),
    {
      refetchOnWindowFocus: false,
    }
  );
  const sortedFeedbackData = [...feedbackData].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateB - dateA;
  });
  const [invoices, setInvoice] = useState<Invoice[]>([]);
  const commentMaxLength = 40;
  useQuery(
    "invoice",
    () =>
      axios.get("/api/invoice" + "?serviceId=" + params.id).then((res) => {
        setInvoice(res.data as Invoice[]);
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  // const { } = useQuery(
  //   "feedback",
  //   retrieveFeedback,
  //   {
  //     staleTime: Infinity,
  //   }
  // );
  // useEffect(() => {
  //   retrieveFeedback();
  // }, []);
  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = await UserProfile.getProfile();
      setFormValue(prevState => ({ ...prevState, resident_id: user.id }));
    };
    fetchUserProfile();
    setFormValue(prevState => ({ ...prevState, service_id: params.id }));
  }, []);
  if (data != null) {
    return (
      <main className={styles.main} style={futuna.style}>
        <div>
          <Container className="p-lg-5">
            <Row>
              <Col>
                <h3>
                  <b>{data.name}</b>
                </h3>
                {/* <p className="">{data.address}</p> */}
              </Col>
              {UserProfile.getRole() == "admin" ? (
                <Col className="text-end">
                  <Button
                    variant="warning"
                    onClick={() => {
                      router.push(
                        "/home/services/update/" + params.id + "?auth=true"
                      );
                    }}
                  >
                    Edit
                  </Button>{" "}
                </Col>
              ) : (
                <></>
              )}
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Carousel>
                {data.imageURLs && data.imageURLs.length > 0 ? (
                  data.imageURLs.map((value, index) => (
                    <Carousel.Item key={index} style={{ height: "500px" }}>
                      <Image
                        loading="lazy"
                        className=" img-fluid h-100 w-100"
                        src={value}
                        alt="images"
                        rounded
                      ></Image>
                    </Carousel.Item>
                  ))
                ) : (
                  <Carousel.Item style={{ height: "500px" }}>
                    <Image
                      loading="lazy"
                      className=" img-fluid h-100 w-100"
                      src={
                        "https://assets.website-files.com/5c10692127f39afbd1adaeed/5c10695127f39a17ebadaf20_GSS-logo.png"
                      }
                      alt="images"
                      rounded
                    ></Image>
                  </Carousel.Item>
                )}
              </Carousel>
            </Row>
            <Row>
              <h3 style={{ marginTop: "20px" }}>
                <b>{t("description")}</b>
              </h3>
              <p style={{ marginTop: "20px" }}>{data.description}</p>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col>
                <h3>
                  <b>{t("service_package")}</b>
                </h3>
              </Col>
              <Col md="auto">
                {UserProfile.getRole() != "resident" ? (
                  <Button onClick={handleModalOpen}>{t("add_service_package")}</Button>
                ) : (
                  <></>
                )}

                <ServicePackageModal
                  show={showModal}
                  successMessage="Add service package successfully"
                  serviceId={params.id}
                  handleClose={handleModalClose}
                />
              </Col>
            </Row>
            <Row
              style={{
                borderRadius: "20px",
                margin: "20px 0px",
                paddingTop: "20px ",
              }}
            >
              {data.servicePackages ? (
                data.servicePackages.map((value, index) => (
                  <>
                    {index % 2 == 0 ? <Row></Row> : <></>}
                    <Col>
                      {" "}
                      <ServicePackageLayout
                        servicePackage={value}
                        service={data}
                        handleSuccessModification={refetch}
                      ></ServicePackageLayout>
                    </Col>
                    {index == data.servicePackages.length - 1 &&
                      index % 2 == 0 ? (
                      <Col></Col>
                    ) : (
                      <></>
                    )}
                  </>
                ))
              ) : (
                <></>
              )}
            </Row>
            {UserProfile.getRole() == "resident" && invoices.length != 0 ? (
              <>
                {" "}
                <Row style={{ marginTop: "20px" }}>
                  <Col>
                    <h3>
                      <b>{t("purchaseHistory")}</b>
                    </h3>
                  </Col>
                </Row>
                <Row
                  style={{
                    borderRadius: "20px",
                    margin: "20px 0px",
                    paddingTop: "20px ",
                  }}
                >
                  <Table responsive="sm">
                    <thead>
                      <tr style={{ width: "100%" }}>
                        <th>{t("ID")}</th>
                        <th>{t("servicePackageName")}</th>
                        <th>{t("price")}</th>
                        <th>{t("create_at")}</th>
                        <th>{t("expire_at")}</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices ? (
                        invoices.map((value, index) => (
                          <tr key={index} style={{ cursor: "pointer" }}>
                            <td>{value.invoice_id}</td>
                            <td>{t(value.servicePackage.name)}</td>
                            <td>{value.total.toLocaleString()} VND</td>

                            <td>
                              {format(
                                new Date(value.created_at),
                                "HH:mm dd/MM/yyyy"
                              )}
                            </td>
                            <td>
                              {format(
                                new Date(value.expired_at),
                                "HH:mm dd/MM/yyyy"
                              )}
                            </td>
                            <td style={{ width: 100 }}>
                              <div className="d-flex">
                                <Button
                                  onClick={() => {
                                    router.push(
                                      "/home/invoices/" +
                                      value.invoice_id +
                                      "?auth=true"
                                    );
                                  }}
                                  variant="warning"
                                >
                                  {t("detail")}
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </Table>
                </Row>
              </>
            ) : (
              <></>
            )}

            <Row style={{ marginTop: "20px" }}>
              <Col>
                <h3>
                  <b>{t("feedback")}</b>
                </h3>
              </Col>
            </Row>
            {UserProfile.getRole() === "resident" ? (
              <Row style={{

                backgroundColor: "rgba(40, 100, 255, 0.1)",
                border: "1px black solid",
                borderRadius: "20px",
                margin: "20px 0px",
                paddingTop: "20px ",
              }}
              >
                <StarRatings
                  rating={rating}
                  starRatedColor="gold"
                  starHoverColor="gold"
                  changeRating={handleRatingChange}
                  numberOfStars={5}
                  starDimension="30px"
                  starSpacing="5px"
                />
                {errors && errors.rating && (
                  <span className={styles.error}>{errors.rating}</span>
                )}
                <Form.Group className="mb-3">
                  <Form.Label className={styles.label}>Comment</Form.Label>
                  <Form.Control
                    size="lg"
                    type="text"
                    name="comment"
                    onChange={handleChange}
                    value={formValue.comment}
                    placeholder=""
                  />
                  {errors && errors.comment && (
                    <span className={styles.error}>{errors.comment}</span>
                  )}
                </Form.Group>
                <ButtonComponent
                  onClick={createHandle}
                  className={styles.creatBtn1}
                >
                  Tạo
                </ButtonComponent>

              </Row>
            ) : (
              <></>
            )}


            {sortedFeedbackData
              .filter(feedback => feedback.service_id === params.id)
              .map((feedback, index) => (

                <Row
                  key={index}
                  style={{
                    backgroundColor: "rgba(40, 100, 255, 0.1)",
                    border: "1px black solid",
                    borderRadius: "20px",
                    margin: "20px 0px",
                    paddingTop: "20px",
                    width: isMobile ? '100%' : is1200 ? '90%' : ismayHa ? '90%' : isSmailSceen ? '70%' : `${feedback.comment.length > 10 ? Math.min(feedback.comment.length, commentMaxLength) * 30 : 350}px`,
                    whiteSpace: 'pre-wrap',
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    position: 'relative'
                  }}
                >

                  <div className="resident-info" style={{ display: 'flex', flexDirection: 'row' }}>
                    <div className="avatar-container" style={{ marginRight: '20px', marginTop: '5px' }}>
                      <Image
                        style={{ borderRadius: "60%" }}
                        className="avatar-image"
                        width={50}
                        src={feedback.resident?.profile?.avatarURL}
                        alt="Resident Avatar"
                      />
                    </div>
                    <div className="resident-details" style={{ marginTop: '-7px', padding: '10px' }}>
                      <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{feedback.resident?.profile?.name}</p>

                      <p style={{ fontSize: '12px', marginBottom: '1px' }}>
                        {format(new Date(feedback.created_at), "HH:mm dd/MM/yyyy")}
                      </p>

                      <StarRatings
                        rating={parseFloat(feedback.rating)}
                        starRatedColor="gold"
                        starEmptyColor="grey"
                        starDimension="20px"
                        starSpacing="1px"

                      />

                      <p style={{ marginBottom: '5px' }}></p>

                      <p style={{ marginBottom: '5px' }}>{feedback.comment.slice(0, 500)}</p>
                    </div>


                  </div>
                  <Row className="justify-content-end" style={{ position: 'relative' }}>
                    <Col md="auto">
                      {(UserProfile.getRole() === 'resident' && UserProfile.getProfile().id === feedback.resident_id) || UserProfile.getRole() === 'admin' ? (
                        <Dropdown style={{ position: 'absolute', top: calculateTopPosition(feedback.comment.length), right: '0', zIndex: '999' }}>
                          <Dropdown.Toggle className={styles.dropdownToggle} variant="secondary" id="dropdown-basic" style={{ backgroundColor: "transparent", color: 'black', border: "none", fontWeight: 'normal', outline: 'none', caretColor: 'transparent' }}>
                            ⋮
                          </Dropdown.Toggle>
                          <Dropdown.Menu style={{ backgroundColor: "transparent" }}>
                            <Dropdown.Item onClick={() => deleleHandle(feedback.feedback_id)} style={{ color: 'black' }}>Xóa</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>

                </Row>

              ))}
          </Container>
        </div>
        <ModalComponent
          show={showModalDelete}
          title="Có chắc chắn xóa feedback này?"
          handleConfirm={() => handleConfirmDelete(selectedId)}
          setShow={setShowModalDelete}
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

  if (isLoading)
    return (
      <main className={styles.main} style={futuna.style}>
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
      </main>
    );
  if (isError)
    return (
      <main className={styles.main} style={futuna.style}>
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
      </main>
    );
  return <div></div>;
}
