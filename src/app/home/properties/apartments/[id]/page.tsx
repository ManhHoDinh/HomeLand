"use client";
import { Apartment } from "@/models/apartment";
import styles from "./page.module.css";
import modalStyles from "@/styles/modal.module.scss";
import {
  Button,
  Carousel,
  Col,
  Container,
  Image,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import Furniture from "@/components/apartmentDetail/furniture";
import { futuna } from "../../../../../../public/fonts/futura";
import Resident from "@/components/apartmentDetail/resident";
import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Resident as ResidentModel } from "@/models/resident";
import { AddResidentIcon } from "@/components/icons";
import clsx from "clsx";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import { format } from "date-fns";
import { Resident as ResidentType } from "@/models/resident";
export default function Page({ params }: { params: { id: string } }) {
  // let apartment:Apartment= JSON.parse("{'id':'123', 'name':'M}");
  //console.log(apartment);
  const [showModalResident, setShowModalResident] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true); // Set it to true by default
  const [checkAll, setCheckAll] = useState(false);
  const [listChecked, setListChecked] = useState<String[]>([]);
  const [residents, setResidents] = useState<Array<ResidentType>>([]);

  const { isLoading, data, refetch, isError } = useQuery("apartment", () =>
    axios
      .get("/api/apartment/" + params.id)
      .then((res) => res.data as Apartment)
  );
  const titleTable = ["ID", "Tên", "Số điện thoại", "Ngày tạo"];
  const furnitureInfo = [
    {
      title: "Bedrooms",
      svg: (
        <svg
          width="27"
          height="15"
          viewBox="0 0 27 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26.4168 7.81303C26.4168 6.6918 25.2543 5.77443 23.8335 5.77443V2.71653C23.8335 1.5953 22.671 0.677925 21.2502 0.677925H5.75016C4.32933 0.677925 3.16683 1.5953 3.16683 2.71653V5.77443C1.746 5.77443 0.583496 6.6918 0.583496 7.81303V12.9095H2.30141L3.16683 14.9481H4.4585L5.32391 12.9095H21.6893L22.5418 14.9481H23.8335L24.6989 12.9095H26.4168V7.81303ZM21.2502 5.77443H14.7918V2.71653H21.2502V5.77443ZM5.75016 2.71653H12.2085V5.77443H5.75016V2.71653ZM3.16683 7.81303H23.8335V10.8709H3.16683V7.81303Z"
            fill="#484848"
          />
        </svg>
      ),
      value: (data?.bedroom ?? "0").toString(),
    },
    {
      title: "Bathrooms",
      svg: (
        <svg
          width="24"
          height="16"
          viewBox="0 0 24 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.16683 6.04887C7.45549 6.04887 8.50016 5.38189 8.50016 4.55913C8.50016 3.73636 7.45549 3.06938 6.16683 3.06938C4.87816 3.06938 3.8335 3.73636 3.8335 4.55913C3.8335 5.38189 4.87816 6.04887 6.16683 6.04887Z"
            fill="#484848"
          />
          <path
            d="M21.3335 9.02837V2.94275C21.3335 1.78075 19.8518 0.834763 18.0318 0.834763C17.1568 0.834763 16.3168 1.05822 15.6985 1.45301L14.2402 2.3841C14.0535 2.34686 13.8552 2.32451 13.6452 2.32451C13.1785 2.32451 12.7468 2.41389 12.3852 2.56287L15.6052 4.61872C15.8385 4.38781 15.9785 4.1122 15.9785 3.81426C15.9785 3.68018 15.9435 3.561 15.8968 3.43437L17.3552 2.50328C17.5302 2.39155 17.7752 2.32451 18.0318 2.32451C18.5685 2.32451 19.0002 2.60011 19.0002 2.94275V9.02837H11.0085C10.6585 8.87194 10.3435 8.69317 10.0518 8.49206L8.4185 7.3375C8.19683 7.18108 7.91683 7.05445 7.6135 6.96507C7.25183 6.85334 6.85516 6.79375 6.44683 6.79375C5.00016 6.8012 3.8335 7.54607 3.8335 8.46971V9.02837H0.333496V13.4976C0.333496 14.317 1.3835 14.9874 2.66683 14.9874C2.66683 15.397 3.19183 15.7322 3.8335 15.7322H20.1668C20.8085 15.7322 21.3335 15.397 21.3335 14.9874C22.6168 14.9874 23.6668 14.317 23.6668 13.4976V9.02837H21.3335ZM21.3335 13.4976H2.66683V10.5181H21.3335V13.4976Z"
            fill="#484848"
          />
        </svg>
      ),
      value: (data?.bathroom ?? "0").toString(),
    },
    {
      title: "Square Area",
      svg: (
        <svg
          width="23"
          height="21"
          viewBox="0 0 23 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.75 0.0999985H3.25C1.7375 0.0999985 0.5 1.2475 0.5 2.65V17.95C0.5 19.3525 1.7375 20.5 3.25 20.5H19.75C21.2625 20.5 22.5 19.3525 22.5 17.95V2.65C22.5 1.2475 21.2625 0.0999985 19.75 0.0999985ZM19.75 17.95H3.25V2.65H19.75V17.95Z"
            fill="#484848"
          />
        </svg>
      ),
      value:
        (data?.width ?? "0").toString() +
        " x " +
        (data?.length ?? "0").toString() +
        " (m2)",
    },
    {
      title: "Status",
      svg: (
        <svg
          width="27"
          height="26"
          viewBox="0 0 27 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 0C6.06015 0 0 5.8357 0 13C0 20.1643 6.06015 26 13.5 26C20.9399 26 27 20.1643 27 13C27 5.8357 20.9399 0 13.5 0ZM13.5 2.6C19.4807 2.6 24.3 7.24084 24.3 13C24.3 18.7592 19.4807 23.4 13.5 23.4C7.51933 23.4 2.7 18.7592 2.7 13C2.7 7.24084 7.51933 2.6 13.5 2.6ZM19.2955 8.18086L10.8 16.3617L7.70449 13.3809L5.79551 15.2191L10.8 20.0383L21.2045 10.0191L19.2955 8.18086Z"
            fill="#484848"
          />
        </svg>
      ),
      value: (data?.status ?? "").toString(),
    },
  ];
  const residentInfo = [
    { img: "image", name: "Manh Ho Dinh", id: "21522327" },
    { img: "image", name: "Manh Ho Dinh", id: "21522327" },
    { img: "image", name: "Manh Ho Dinh", id: "21522327" },
    { img: "image", name: "Manh Ho Dinh", id: "21522327" },
  ];
  const handleCheckAll = () => {
    setCheckAll(!checkAll);
    let newList: String[];
    if (!checkAll) newList = residents.map((item) => item.id);
    else newList = [];
    setListChecked(newList);
  };
  const handleCheck = (id: string) => {
    const isCheck = listChecked?.includes(id);
    let newList: String[];
    if (isCheck) {
      newList = listChecked?.filter((item) => item !== id);
    } else newList = [...listChecked, id];
    if (newList.length === residents.length) {
      setCheckAll(true);
    } else setCheckAll(false);
    setListChecked(newList);
  };
  const handleSave = async () => {
    try {
      console.log(listChecked)
      const res = await axios.post(
        `/api/apartment/${params.id}/addResidents`,
        undefined,
        {
          params: {
            residentIds: listChecked,
          },
          paramsSerializer: {
            indexes: null,
          },
        }
      );
      const updatedResident = res.data;
      refetch();
      setListChecked([]);
      setCheckAll(false);
    } catch (e: any) {
      throw new Error(e.message);
    }
    setShowModalResident(false);
  };
  const handleShowResidentModal = async () => {
    const res = await axios.get("/api/resident");
    const data: ResidentModel[] = res.data;
    console.log(data);
    const newData = data.filter((item) => item.stay_at === null);
    setResidents(newData);
    setShowModalResident(true);
  };
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
                {/* <p className="">{data.}</p> */}
              </Col>
              <Col className="text-end">
                <Button variant="warning">Edit</Button>{" "}
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Carousel>
                {data.images.map((value, index) => (
                  <Carousel.Item key={index} style={{ height: "500px" }}>
                    <Image
                      loading="lazy"
                      className=" img-fluid h-100 w-100"
                      src={value}
                      alt="images"
                      rounded
                    ></Image>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Row>
            <Row className={styles.furniture}>
              {furnitureInfo.map((e, index) => (
                <Col key={index} className="text-center">
                  <Furniture
                    title={e.title}
                    value={e.value ?? ""}
                    svg={e.svg}
                  ></Furniture>
                </Col>
              ))}
            </Row>
            <Row>
              <h3 style={{ marginTop: "20px" }}>
                <b>About this apartment</b>
              </h3>
              <p style={{ marginTop: "20px" }}>{data.description}</p>
            </Row>
            <Row>
              <div className="d-flex justify-content-between">
                <h3 style={{ marginTop: "20px" }}>
                  <b>List by apartment resident</b>
                </h3>
                <ButtonComponent
                  onClick={handleShowResidentModal}
                  preIcon={<AddResidentIcon width={24} height={24} />}
                  className={clsx(styles.addBtn, futuna.className)}
                >
                  Add Resident
                </ButtonComponent>
              </div>
            </Row>

            {data.residents && data.residents.length > 0 ? (
              <Row
                style={{
                  backgroundColor: "rgba(40, 100, 255, 0.1)",
                  border: "1px black solid",
                  borderRadius: "20px",
                  margin: "20px 0px",
                  paddingTop: "20px ",
                }}
              >
                {data.residents.map((resident, index) => (
                  <>
                    {index % 2 == 0 ? <Row></Row> : <></>}
                    <Col>
                      {" "}
                      <Resident
                        img={
                          imageLoaded ? (
                            <Image
                              loading="lazy"
                              style={{borderRadius:'50%'}}
                              src={
                                resident.profile.avatarURL ||
                                "/path/to/your/image.jpg"
                              } // Replace with your image link
                              alt="Description of the image"
                              width="100%"
                              onErrorCapture={() => setImageLoaded(false)}
                              onError={() => setImageLoaded(false)}
                            />
                          ) : (
                            <svg
                              width="48"
                              height="42"
                              viewBox="0 0 48 42"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M24 0.9328C10.752 0.9328 0 10.007 0 21.1877C0 32.3685 10.752 41.4427 24 41.4427C37.248 41.4427 48 32.3685 48 21.1877C48 10.007 37.248 0.9328 24 0.9328ZM12.168 33.9078C13.2 32.0849 19.488 30.3025 24 30.3025C28.512 30.3025 34.824 32.0849 35.832 33.9078C32.568 36.0954 28.464 37.3917 24 37.3917C19.536 37.3917 15.432 36.0954 12.168 33.9078ZM39.264 30.9709C35.832 27.4465 27.504 26.2515 24 26.2515C20.496 26.2515 12.168 27.4465 8.736 30.9709C6.288 28.2567 4.8 24.8741 4.8 21.1877C4.8 12.2553 13.416 4.98379 24 4.98379C34.584 4.98379 43.2 12.2553 43.2 21.1877C43.2 24.8741 41.712 28.2567 39.264 30.9709ZM24 9.03478C19.344 9.03478 15.6 12.1945 15.6 16.124C15.6 20.0535 19.344 23.2132 24 23.2132C28.656 23.2132 32.4 20.0535 32.4 16.124C32.4 12.1945 28.656 9.03478 24 9.03478ZM24 19.1622C22.008 19.1622 20.4 17.8052 20.4 16.124C20.4 14.4428 22.008 13.0858 24 13.0858C25.992 13.0858 27.6 14.4428 27.6 16.124C27.6 17.8052 25.992 19.1622 24 19.1622Z"
                                fill="black"
                              />
                            </svg>
                          )
                        }
                        name={resident.profile.name}
                        phone_number={resident.profile.phone_number}
                      ></Resident>
                    </Col>
                    {index === (data?.residents?.length ?? 0) - 1 &&
                    index % 2 === 0 ? (
                      <Col></Col>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              </Row>
            ) : (
              <p className={styles.noResident}> Have no resident</p>
            )}
          </Container>
        </div>
        <Modal
          dialogClassName={clsx(modalStyles.modal, futuna.className)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showModalResident}
          onHide={() => setShowModalResident(false)}
        >
          <Modal.Header className={modalStyles.modalHeader} closeButton>
            <Modal.Title className={modalStyles.titleModal}>
              Thêm cư dân cho phòng
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={modalStyles.bodyModal}>
            <h3 className={modalStyles.bodyHeader}>Danh sách cư dân</h3>
            <Table
              className={clsx(modalStyles.table, futuna.className)}
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
                {residents.map((resident, index): React.ReactNode => {
                  const time = new Date(resident.created_at);
                  const createAt = format(time, "yyyy-MM-dd HH:mm:ss");
                  return (
                    <tr key={index}>
                      <td>
                        <input
                          value={resident.id}
                          type="checkbox"
                          onChange={(e) => handleCheck(e.target.value)}
                          checked={listChecked.includes(resident.id)}
                        />
                      </td>
                      <td>{resident.id}</td>
                      <td>{resident.profile.name}</td>
                      <td>{resident.profile.phone_number}</td>
                      <td>{createAt}</td>
                      {/* <td>{building.resident_id}</td> */}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer className={modalStyles.footerModal}>
            <ButtonComponent
              className={modalStyles.saveBtn}
              onClick={handleSave}
            >
              Save
            </ButtonComponent>
          </Modal.Footer>
        </Modal>
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
