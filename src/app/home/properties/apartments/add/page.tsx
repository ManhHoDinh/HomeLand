"use client";
import {
  Button,
  Form,
  FormGroup,
  Image,
  InputGroup,
  Modal,
  Spinner,
} from "react-bootstrap";
import styles from "./add.module.css";
import { futuna } from "../../../../../../public/fonts/futura";
import {
  FaBed,
  FaCheckCircle,
  FaList,
  FaShower,
  FaSquare,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import DragDropFileInput from "@/components/dragDropFileInput/drapDropFileInput";
import { useRef, useState } from "react";
import SearchBar from "@/components/searchBar/searchBar";
import { useQuery } from "react-query";
import axios from "axios";
import { loadingFiler, removeLoadingFilter, search } from "@/libs/utils";
import { Resident } from "@/models/resident";
import { Building } from "@/models/building";
import { Floor } from "@/models/floor";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import toastMessage from "@/utils/toast";
function constraintOnlyNumber(str: string): boolean {
  return !isNaN(Number(str));
}
function missingField(element: HTMLElement) {
  console.log(element)
  element.className = element.className.split("missing")[0];
  element.className += " " + styles.missing;
  element.onfocus = () => {
    element.className = element.className.split("missing")[0];
    element.onfocus = null;
  };
}
function validateData(field: string[]) {
  let flag: boolean = true;
  const grid = document.getElementById("imageBlobGrid");
  if (!grid) {
    missingField(document.getElementById("image")!);
    flag = false;
  }
  field.forEach((element) => {
    const inputElement = document.getElementById(element);
    if (inputElement)
      if (
        (inputElement instanceof HTMLSelectElement &&
          inputElement.value == "null") ||
        (inputElement instanceof HTMLInputElement &&
          inputElement.value.length === 0)
      ) {
        missingField(inputElement);
        flag = false;
      }
  });
  return flag;
}
async function addImage(data: FormData, fileList: (File | URL)[]) {
  for await (const iterator of fileList) {
    if (iterator instanceof URL) data.append("images", iterator.href);
    else data.append("images", iterator);
  }
}
export default function AddApartment() {
  const [show, setShow] = useState(false);
  function handleClose() {
    setShow(false);
  }
  const [selectedResidentLists, setSelectedList] = useState<Resident[]>([]);
  const [residentLists, setResidentLists] = useState<Resident[]>([]);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [floors, setFloors] = useState<Floor[]>([]);
  useQuery("buildings", () => {
    axios.get("/api/building").then((res) => {
      setBuildings(res.data as Building[]);
      return res.data as Building[];
    });
  });
  const retrieveFloor = (building_id: string) => {
    if (building_id == "null") {
      setFloors([]);
      return;
    }
    axios.get("/api/floor").then((res) => {
      setFloors(res.data as Floor[]);
      return res.data as Floor[];
    });
  };

  const { isLoading, isError, data } = useQuery("residents", () =>
    axios.get("/api/resident").then((res) => {
      setResidentLists(res.data as Resident[]);
      return res.data as Resident[];
    })
  );
  const fileList = useRef<(File | URL)[]>([]);
  function handleFileChange(files: (File | URL)[]) {
    fileList.current = files;
  }
  async function handleSubmit() {
    loadingFiler(document.body!);
    const field = [
      "name",
      "building",
      "floor",
      "width",
      "length",
      "bedroom",
      "bathroom",
    ];
    if (!validateData(field)) {
      removeLoadingFilter(document.body!)
      return;
    }
    const data = new FormData();
    data.append(
      "name",
      (document.getElementById("name") as HTMLInputElement).value
    );
    data.append(
      "width",
      (document.getElementById("width") as HTMLInputElement).value
    );
    data.append(
      "length",
      (document.getElementById("length") as HTMLInputElement).value
    );
    data.append(
      "building_id",
      (document.getElementById("building") as HTMLInputElement).value
    );
    data.append(
      "floor_id",
      (document.getElementById("floor") as HTMLInputElement).value
    );
    data.append(
      "number_of_bedroom",
      (document.getElementById("bedroom") as HTMLInputElement).value
    );

    data.append(
      "number_of_bathroom",
      (document.getElementById("bathroom") as HTMLInputElement).value
    );
    data.append("rent", "100000");
    data.append(
      "description",
      (document.getElementById("description") as HTMLInputElement).value
    );
    selectedResidentLists.forEach((element) => {
      data.append("residentIds", element.id);
    });
    await addImage(data, fileList.current).then( async () => {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "/api/apartment",
        data: data,
      };
      await axios
        .request(config)
        .then((res) => {
          toastMessage({
            type: "success",
            title: "Thêm căn hộ thành công",
          });
        })
        .catch((err) => {
          toastMessage({
            type: "error",
            title: "Đã có lỗi xảy ra trong quá trình thực thi",
          });
        });
    });
    removeLoadingFilter(document.body!);
    window.location.reload();
  }
  function searchtest(params: string) {
    setResidentLists(search(data!, "name", params));
  }
  function onCheck(param: Resident) {
    const temp = selectedResidentLists;
    if (!temp.includes(param)) {
      temp.push(param);
      setSelectedList(temp);
    }
  }
  function onUnCheck(param: Resident) {
    const temp = selectedResidentLists;
    if (temp.includes(param)) {
      temp.splice(temp.indexOf(param));
      setSelectedList(temp);
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
    <>
      <div className={styles.content}>
        <Form
          className={futuna.className}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Form.Group style={{ display: "flex" }}>
            <Form.Control
              id="name"
              type="text"
              placeholder="Apartment name..."
              style={{ width: "30%", marginRight: "0.5vw" }}
            ></Form.Control>
            <Form.Select
              title="Building"
              id="building"
              onChange={(e) => {
                retrieveFloor(e.target.value);
              }}
              style={{ width: "30%", marginRight: "0.5vw" }}
            >
              <option value="null">{"Chọn tòa nhà"}</option>
              {buildings.reverse().map((value, index) => (
                <option key={index} value={value.building_id}>
                  {value.name}
                </option>
              ))}
            </Form.Select>
            <motion.div
              initial={{ maxWidth: "0" }}
              animate={{ maxWidth: "30%" }}
              style={{ overflow: "hidden", maxWidth: "30%" }}
              exit={{ maxWidth: "0" }}
            >
              <Form.Select title="Floor" id="floor">
                <option value="null">{"Chọn tầng"}</option>
                {floors.reverse().map((value, index) => (
                  <option key={index} value={value.floor_id}>
                    {value.name}
                  </option>
                ))}
              </Form.Select>
            </motion.div>
          </Form.Group>

          <div style={{ width: "100%", height: "20px" }}></div>
          <DragDropFileInput onChange={handleFileChange} id="image">
            <div
              className={styles.uploadIcon}
              style={{
                width: "100%",
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
          <FormGroup className={styles.typeSelectContainer}>
            <FormGroup
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div className={styles.selectItem} style={{ margin: "0" }}>
                <Form.Label>Bedrooms:</Form.Label>
                <InputGroup
                  style={{ display: "flex", flexDirection: "row-reverse" }}
                >
                  <Form.Control
                    type="number"
                    id="bedroom"
                    style={{
                      borderLeftStyle: "hidden",
                      borderWidth: "3px",
                      borderColor: "#e8eaec",
                      borderTopRightRadius: "7px",
                      borderBottomRightRadius: "7px",
                      borderTopLeftRadius: "0",
                      borderBottomLeftRadius: "0",
                    }}
                    className="shadow-none"
                    placeholder="0"
                    min={0}
                    max={10}
                  ></Form.Control>
                  <FaBed
                    style={{
                      height: "100%",
                      width: "30px",
                      alignSelf: "center",
                      borderStyle: "solid",
                      borderColor: "#e8eaec",
                      borderRightStyle: "hidden",
                      paddingLeft: "10px",
                      borderTopLeftRadius: "7px",
                      borderBottomLeftRadius: "7px",
                      borderWidth: "3px",
                    }}
                    size={"20px"}
                  />
                </InputGroup>
              </div>
              <div className={styles.selectItem}>
                <Form.Label>Bathrooms:</Form.Label>
                <InputGroup
                  style={{ display: "flex", flexDirection: "row-reverse" }}
                >
                  <Form.Control
                    id="bathroom"
                    type="number"
                    style={{
                      borderLeftStyle: "hidden",
                      borderWidth: "3px",
                      borderTopRightRadius: "7px",
                      borderBottomRightRadius: "7px",
                      borderTopLeftRadius: "0",
                      borderBottomLeftRadius: "0",
                      borderColor: "#e8eaec",
                    }}
                    placeholder="0"
                    className="shadow-none"
                    min={0}
                    max={10}
                  />
                  <FaShower
                    style={{
                      height: "100%",
                      width: "30px",
                      alignSelf: "center",
                      borderStyle: "solid",
                      borderColor: "#e8eaec",
                      borderRightStyle: "hidden",
                      paddingLeft: "10px",
                      borderTopLeftRadius: "7px",
                      borderBottomLeftRadius: "7px",
                      borderWidth: "3px",
                    }}
                    size={"20px"}
                  />
                </InputGroup>
              </div>
              <div className={styles.selectItem}>
                <Form.Label>Square Area</Form.Label>

                <InputGroup style={{ display: "flex", alignContent: "center" }}>
                  <FaSquare
                    style={{ marginRight: "10px", alignSelf: "center" }}
                    size={"20px"}
                  />
                  <Form.Control
                    id="width"
                    type="text"
                    style={{
                      borderRadius: "20px",
                      height: "20px",
                      alignSelf: "center",
                      marginRight: "0.5rem",
                      fontSize: "0.7rem",
                    }}
                    onChange={(e) => {
                      if (!constraintOnlyNumber(e.currentTarget.value)) {
                        alert("Square Area must be a number");
                        e.currentTarget.value = e.currentTarget.value.slice(
                          0,
                          e.currentTarget.value.length - 1
                        );
                      }
                    }}
                  />
                  <Form.Label
                    style={{
                      alignSelf: "center",
                      marginRight: "0.5rem",
                      fontSize: "1.7rem",
                    }}
                  >
                    x
                  </Form.Label>
                  <Form.Control
                    id="length"
                    type="text"
                    style={{
                      borderRadius: "20px",
                      height: "20px",
                      alignSelf: "center",
                      marginRight: "0.5rem",
                      fontSize: "0.7rem",
                    }}
                    onChange={(e) => {
                      if (!constraintOnlyNumber(e.currentTarget.value)) {
                        alert("Square Area must be a number");
                        e.currentTarget.value = e.currentTarget.value.slice(
                          0,
                          e.currentTarget.value.length - 1
                        );
                      }
                    }}
                  />
                  <Form.Label style={{ alignSelf: "center" }}>
                    (m<sup>2</sup>)
                  </Form.Label>
                </InputGroup>
              </div>
              <div className={styles.selectItem}>
                <Form.Label>Status</Form.Label>
                <InputGroup style={{ display: "flex", alignContent: "center" }}>
                  <FaCheckCircle
                    style={{
                      height: "100%",
                      width: "30px",
                      alignSelf: "center",
                      borderStyle: "solid",
                      borderColor: "#e8eaec",
                      borderRightStyle: "hidden",
                      paddingLeft: "10px",
                      zIndex: "10",
                      borderTopLeftRadius: "7px",
                      borderBottomLeftRadius: "7px",
                      borderWidth: "3px",
                    }}
                    size={"20px"}
                  />
                  <Form.Select
                    id={"status"}
                    style={{
                      borderLeftStyle: "hidden",
                      borderColor: "#e8eaec",
                      borderWidth: "2px",
                    }}
                  >
                    <option value={"active"}>Active</option>
                    <option value={"disable"}>Disable</option>
                  </Form.Select>
                </InputGroup>
              </div>
            </FormGroup>
          </FormGroup>
          <FormGroup className={styles.formGroupContainer}>
            <Form.Label
              style={{
                fontWeight: "medium",
                fontSize: "20px",
                marginLeft: "20px",
              }}
            >
              About this apartment
            </Form.Label>
            <Form.Control
              id={"description"}
              as={"textarea"}
              type="text"
              aria-multiline={true}
              style={{ height: "248px" }}
            />
          </FormGroup>
          <FormGroup className={styles.formGroupContainer}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                flexWrap: "wrap",
                marginBottom: "10px",
              }}
            >
              <Form.Label
                style={{
                  fontWeight: "medium",
                  fontSize: "20px",
                  marginLeft: "20px",
                  verticalAlign: "center",
                }}
              >
                List by aparment resident
              </Form.Label>
              <Button
                style={{
                  backgroundColor: "#eadaff",
                  width: "47px",
                  height: "47px",
                  borderRadius: "20px",
                  borderStyle: "none",
                  color: "black",
                  fontSize: "20px",
                }}
                onClick={() => setShow(true)}
              >
                +
              </Button>
            </div>
            {selectedResidentLists.length == 0 ? (
              <p
                style={{ textAlign: "center" }}
              >{`This aparment haven't been lived by any resident`}</p>
            ) : (
              <div className={styles.residentListsContainer}>
                {" "}
                {selectedResidentLists.map((value, index) =>
                  ResidentItem(value, index, onUnCheck)
                )}{" "}
              </div>
            )}
          </FormGroup>
          <FormGroup
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "2rem 0",
            }}
          >
            <Button
              style={{
                backgroundColor: "#FF4747",
                borderColor: "#FF4747",
                fontSize: "2rem",
                paddingLeft: "3rem",
                paddingRight: "3rem",
                borderRadius: "1rem",
              }}
              type="reset"
            >
              Clear
            </Button>
            <Button
              type="submit"
              style={{
                backgroundColor: "#2A9928",
                borderColor: "#2A9928",
                fontSize: "2rem",
                paddingLeft: "3rem",
                paddingRight: "3rem",
                borderRadius: "1rem",
              }}
            >
              Save
            </Button>
          </FormGroup>
        </Form>
      </div>
      <Modal show={show} onHide={handleClose} className={futuna.className}>
        <Modal.Header>
          <Modal.Title>Search resident</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SearchBar
            className={styles.searchBar}
            onChange={searchtest}
          ></SearchBar>
          <hr />
          <div style={{ overflow: "scroll", height: "20rem" }}>
            {residentLists.map((value, index) =>
              ModalResidentItem(
                value,
                index,
                selectedResidentLists.includes(value),
                (param) => {
                  onCheck(param);
                },
                (param) => {
                  onUnCheck(param);
                }
              )
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
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
    </>
  );
}
const ModalResidentItem = (
  value: Resident,
  index: number,
  selected: boolean,
  onCheck: (param: Resident) => void,
  onUnCheck: (param: Resident) => void
) => {
  return (
    <div
      id={"modelResidentItem:" + value.id}
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 10px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          style={{ marginRight: "10px" }}
          onClick={(e) => {
            const checked = e.currentTarget.checked;
            if (checked) onCheck(value);
            else onUnCheck(value);
          }}
        />
        {value.account ? (
          <Image
            src={value.profile.avatarURL}
            alt="ava"
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "2rem",
              marginRight: "0.5rem",
            }}
          ></Image>
        ) : (
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: "1vw" }}
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
          </svg>
        )}

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>{value.id}</div>
          <div>{value.profile.name}</div>
        </div>
      </div>
      <button>
        <FaList />
      </button>
    </div>
  );
};
const ResidentItem = (
  value: Resident,
  index: number,
  onRemove: (param: Resident) => void
) => {
  return (
    <div
      id={"selectedResident" + index}
      key={index}
      className={styles.residentListsItem}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            flexWrap: "wrap",
            marginRight: "20px",
          }}
        >
          {value.account ? (
            <Image
              src={value.profile.avatarURL}
              alt="ava"
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "2rem",
                marginRight: "0.5rem",
              }}
            ></Image>
          ) : (
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 16 16"
              height="2em"
              width="2em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
            </svg>
          )}
        </div>
        <div>
          <div>{value.profile.name}</div>
          <div>{value.id}</div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className={styles.getMoreInfoButton}>
          <button> Get more info</button>
        </div>
        <button
          className={styles.removeButton}
          onClick={(e) => {
            const element = document.getElementById("selectedResident" + index);
            if (element) {
              loadingFiler(element);
              e.preventDefault();
              onRemove(value);
              removeLoadingFilter(element);
            }
          }}
        >
          <FaTrash></FaTrash>
        </button>
      </div>
    </div>
  );
};
