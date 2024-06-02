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
import styles from "./edit.module.css";
import { futuna } from "../../../../../../../public/fonts/futura";
import {
  FaBed,
  FaCheckCircle,
  FaList,
  FaPersonBooth,
  FaShower,
  FaSquare,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import DragDropFileInput from "@/components/dragDropFileInput/drapDropFileInput";
import { useEffect, useRef, useState } from "react";
import SearchBar from "@/components/searchBar/searchBar";
import { useQuery } from "react-query";
import axios from "axios";
import { loadingFiler, removeLoadingFilter, search } from "@/libs/utils";
import { Resident } from "@/models/resident";
import { Apartment } from "@/models/apartment";
import { useRouter } from "next/navigation";
function constraintOnlyNumber(str: string): boolean {
  return !isNaN(Number(str));
}
function getImageList(): string[] {
  const grid = document.getElementById("imageBlobGrid");
  const length = grid?.children.length;
  if (!length) return [];
  const result: string[] = [];
  for (let index = 0; index < length; index++) {
    const element = grid?.children.item(index);
    result.push((element as HTMLImageElement).src);
  }
  return result;
}

function missingField(element: HTMLElement) {
  element.className = element.className.split("missing")[0];
  element.className += " " + styles.missing;
  element.onfocus = () => {
    element.className = element.className.split("missing")[0];
    element.onfocus = null;
  };
}
function validateData() {
  let flag: boolean = true;
  const field = [
    "name",
    "width",
    "length",
    "bedroom",
    "bathroom",
    "description",
  ];
  const grid = document.getElementById("imageBlobGrid");
  if (!grid) {
    missingField(document.getElementById("label-file-upload")!);
    flag = false;
  }
  field.forEach((element) => {
    const inputElement = document.getElementById(element) as HTMLInputElement;
    if (inputElement.value.length === 0) {
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
export default function EditApartment({ params }: { params: { id: string } }) {
  const [show, setShow] = useState(false);
  function handleClose() {
    setShow(false);
  }
  const [selectedResidentLists, setSelectedList] = useState<Resident[]>([]);
  const [residentLists, setResidentLists] = useState<Resident[]>([]);
  const fileList = useRef<(File | URL)[]>([]);
  const router = useRouter();
  const residentQuery = useQuery("resident", () =>
    axios.get("/api/resident").then((res) => {
      setResidentLists(res.data as Resident[]);
      return res.data as Resident[];
    })
  );
  const apartmentQuery = useQuery(
    "apartmentDetail",
      () => axios.get("/api/apartment/" + params.id).then((res) => {
        const apartment = res.data as Apartment;
        const temp: (File | URL)[] = [];
        apartment.images.forEach((element) => {
          temp.push(new URL(element));
        });
        fileList.current = [...temp];
        const field = [
          "name",
          "width",
          "length",
          "bedroom",
          "bathroom",
          "description",
        ];
        field.forEach((element) => {
          const inputElement = document.getElementById(
            element
          ) as HTMLInputElement;
          if (inputElement)
            inputElement.value =
              (apartment[element as keyof Apartment])!.toString();
        });
        if (apartment.residents) setSelectedList(apartment.residents);
        return apartment;
      })
    ,
    { refetchOnWindowFocus: false}
  );
  function handleFileChange(files: (File | URL)[]) {
    fileList.current = files;
    console.log(fileList.current.length);
  }
  async function handleSubmit() {
    loadingFiler(document.body!);
    if (!validateData()) {
      removeLoadingFilter(document.body!);
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
    data.append("building_id", "BLD0");
    data.append("floor_id", "BLD0/FLR0");
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
    await addImage(data, fileList.current).then(() => {
      let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: "/api/apartment/" + params.id,
        data: data,
      };
      axios
        .request(config)
        .then((res) => {
          alert("Done update apartment " + params.id);
          router.back();
        })
        .catch((err) => {
          alert(err.response.data);
        });
    });
    removeLoadingFilter(document.body!);
  }
  function searchtest(params: string) {
    setResidentLists(search(residentQuery.data!, "name", params));
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
  useEffect(() => {
    if(apartmentQuery.data)
    {
      const apartment = apartmentQuery.data!
      const field = [
        "name",
        "width",
        "length",
        "bedroom",
        "bathroom",
        "description",
      ];
      field.forEach((element) => {
        const inputElement = document.getElementById(
          element
        ) as HTMLInputElement;
        if (inputElement)
          inputElement.value =
            (apartment[element as keyof Apartment])!.toString();
      });
      if (apartment.residents) setSelectedList(apartment.residents);
    }
    else
      apartmentQuery.refetch();
  }, [apartmentQuery]);  
  if (residentQuery.isLoading || apartmentQuery.isLoading)
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
  if (residentQuery.error || apartmentQuery.error)
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
          <Form.Control
            id="name"
            type="text"
            placeholder="Aparment name..."
            style={{ width: "30%" }}
          ></Form.Control>
          <div style={{ width: "100%", height: "20px" }}></div>
          <DragDropFileInput
            onChange={handleFileChange}
            initFileList={fileList.current}
          >
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
              // onClick={() => router.refresh()}
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
