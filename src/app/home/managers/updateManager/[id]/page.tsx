"use client";
import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  useCallback,
  useMemo,
} from "react";
import styles from "../../../residents/addResident/AddResident.module.scss";
import mainStyles from "../../../page.module.css";
import utilStyles from "@/styles/utils.module.scss";
import Form from "react-bootstrap/Form";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import Image from "next/image";
import { Resident } from "@/models/resident";
import { format } from "date-fns";
import clsx from "clsx";
import { futuna } from "../../../../../../public/fonts/futura";
import { Red_Hat_Display } from "next/font/google";
import { useQuery } from "react-query";
import axios from "axios";
import { Images } from "../../../../../../public/images";
import toastMessage from "@/utils/toast";
import { ToastContainer } from "react-toastify";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import { Manager } from "@/models/manager";
type FormValue = {
  gender: string;
  phoneNumber: string;
  email: string;
  avatarURL?: any;
};
const UpdateManager = ({ params }: { params: { id: string } }) => {
  const [formValue, setFormValue] = useState({
    gender: "",
    phoneNumber: "",
    email: "",
  });
  const [errors, setErrors] = useState<any>();
  const [manager, setManager] = useState<Manager>();
  const [avatar, setAvatar] = useState<any>();
  const avatarRef = useRef<HTMLInputElement>(null);
  let avatar_photo = manager?.profile.avatarURL as string;
  const validation = () => {
    let err = {} as FormValue;
    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phonePattern =
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    if (formValue.gender === "") {
      err.gender = "Field gender is required!";
    }
    if (formValue.email === "") {
      err.email = "Field email is required!";
    } else if (!emailPattern.test(formValue.email)) {
      err.email = "Email is invalid!";
    }
    if (formValue.phoneNumber === "") {
      err.phoneNumber = "Field phone number is required!";
    } else if (!phonePattern.test(formValue.phoneNumber)) {
      err.phoneNumber = "Phone number is invalid!";
    }

    return err;
  };
  const retrieveManager = async () => {
    try {
      loadingFiler(document.body!);
      const res = await axios.get(`/api/manager/${params.id}`);
      removeLoadingFilter(document.body!);
      const managerData = res.data as Manager;
      setManager(managerData);
      const newformValue: any = {
        gender: managerData.profile.gender,
        phoneNumber: managerData.profile.phone_number,
        email: managerData.account?.email,
      };

      setFormValue(newformValue);
      return res.data;
    } catch (error) {
      removeLoadingFilter(document.body!);
      console.log(error);
    }
  };
  const { isLoading, isError, data, refetch } = useQuery(
    "manager",
    retrieveManager,
    {
      staleTime: Infinity,
    }
  );
  const updateHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validation();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      try {
        const data: any = {
          gender: formValue.gender,
          phone_number: formValue.phoneNumber,
          email: formValue.email,
          avatar_photo: avatar,
        };
        const form = new FormData();
        form.append("gender", formValue.gender);
        form.append("phone_number", formValue.phoneNumber);
        form.append("email", formValue.email);
        form.append("avatar_photo", avatar);
        form.append("_method", "PATCH");
        loadingFiler(document.body!);
        await axios.post(`/api/manager/${params.id}`, form);
        removeLoadingFilter(document.body!);
        toastMessage({ type: "success", title: "Update successfully!" });
      } catch (error) {
        removeLoadingFilter(document.body!);
        console.log(error);
        toastMessage({ type: "error", title: "Update faily!" });
      }
    }
  };
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
      const newObj = { ...formValue, [e.target.name]: e.target.value };
      setFormValue(newObj);
    },
    [formValue]
  );
  const handleAvatarClick = () => {
    avatarRef.current ? avatarRef.current.click() : console.error("error");
  };
  const handleChangeAvatar = (e: any) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
  const AvatarImage = useMemo(() => {
    return (
      <Image
        onClick={handleAvatarClick}
        fill
        style={{ borderRadius: "3%" }}
        alt=""
        onLoad={(e: any) => URL.revokeObjectURL(e.target.src)}
        className={styles.img}
        unoptimized={true}
        src={avatar ? URL.createObjectURL(avatar) : avatar_photo}
      />
    );
  }, [avatar, avatar_photo]);
  return (
    <main className={mainStyles.main}>
      <div className={clsx(styles.wapper, futuna.className)}>
        <p className={clsx(utilStyles.headingXl, styles.title)}>
          Edit Manager Information
        </p>
        <div className={styles.bodyLayout}>
          <div className={styles.avatarLayout}>
            {AvatarImage}
            <input
              onChange={handleChangeAvatar}
              type="file"
              ref={avatarRef}
              style={{ display: "none" }}
            />
          </div>
          <Form method="post" className={clsx(styles.form, futuna.className)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className={clsx(styles.label, styles.required)}>
                Name
              </Form.Label>
              <Form.Control
                value={manager && manager.profile.name}
                size="lg"
                disabled
                type="text"
                placeholder="Nguyen Van A..."
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className={clsx(styles.label, styles.required)}>
                Gender
              </Form.Label>

              <div key={`inline-radio`} className="mb-3">
                <Form.Check
                  checked={manager && manager.profile.gender === "male"}
                  inline
                  label="Male"
                  style={{ fontSize: "1rem" }}
                  name="group1"
                  type="radio"
                  value="male"
                  id={`inline-radio-1`}
                />
                <Form.Check
                  inline
                  label="Female"
                  style={{ fontSize: "1rem" }}
                  checked={manager && manager.profile.gender === "female"}
                  name="group1"
                  type="radio"
                  value="female"
                  id={`inline-radio-2`}
                />
              </div>
            </Form.Group>
            {formValue.email && (
              <Form.Group className="mb-3">
                <Form.Label className={styles.label}>Email</Form.Label>
                <Form.Control
                  value={formValue.email}
                  onChange={handleChange}
                  size="lg"
                  name="email"
                  type="email"
                  placeholder="abc@gmail.com..."
                />
                {errors && errors.email && (
                  <span className={styles.error}>{errors.email}</span>
                )}
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label className={clsx(styles.label, styles.required)}>
                Phone Number
              </Form.Label>
              <Form.Control
                value={formValue.phoneNumber}
                onChange={handleChange}
                size="lg"
                name="phoneNumber"
                type="text"
                placeholder=""
              />
              {errors && errors.phoneNumber && (
                <span className={styles.error}>{errors.phoneNumber}</span>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className={clsx(styles.label, styles.required)}>
                Identification Number
              </Form.Label>
              <Form.Control
                disabled
                size="lg"
                type="text"
                  value={
                  manager &&
                  manager.profile.identify_number
                }
                placeholder=""
              />
             
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className={clsx(styles.label, styles.required)}>
                Date Of Birth
              </Form.Label>
              <Form.Control
                value={
                  manager &&
                  format(new Date(manager.profile.date_of_birth), "yyyy-MM-dd")
                }
                size="lg"
                type="date"
                disabled
                placeholder=""
              />
            </Form.Group>
            <div className={styles.imageLayout}>
              <Form.Group className="mb-3">
                <Form.Label className={clsx(styles.label, styles.required)}>
                  Front photo Of Identification Number
                </Form.Label>
                <Form.Control
                  accept="image/*"
                  size="lg"
                  disabled
                  type="file"
                  placeholder=""
                />

                <Image
                  onLoad={(e: any) => URL.revokeObjectURL(e.target.src)}
                  className={styles.img}
                  width={80}
                  height={40}
                  unoptimized={true}
                  alt=""
                  src={
                    manager ? manager.profile.front_identify_card_photo_URL : ""
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className={clsx(styles.label, styles.required)}>
                  Back Photo of Identification Number
                </Form.Label>
                <Form.Control
                  accept="image/*"
                  size="lg"
                  type="file"
                  disabled
                  placeholder=""
                />

                <Image
                  onLoad={(e: any) => URL.revokeObjectURL(e.target.src)}
                  className={styles.img}
                  width={80}
                  height={40}
                  alt=""
                  unoptimized={true}
                  src={
                    manager ? manager.profile.back_identify_card_photo_URL : ""
                  }
                />
              </Form.Group>
            </div>
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
            <ButtonComponent onClick={updateHandle} className={styles.creatBtn}>
              Update
            </ButtonComponent>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default UpdateManager;
