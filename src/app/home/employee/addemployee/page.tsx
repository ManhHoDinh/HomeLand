"use client";
import { useRouter } from 'next/navigation';
// import mainStyles from '../../page.module.css'
import styles from "./addemployee.module.css";
import Form from 'react-bootstrap/Form';
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import { useDropzone } from 'react-dropzone';
import React, { useState, useCallback, useRef, useMemo, ChangeEvent } from 'react';
import Image from "next/image";
import { Button } from 'react-bootstrap/lib/InputGroup';
import { Anybody } from 'next/font/google';
import axios from "axios";
import { Employee } from '@/models/employee';
import { useQuery } from "react-query";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import { Francois_One } from "next/font/google";
import { Images } from "../../../../../public/images";
import classNames from 'classnames';
import toastMessage from '@/utils/toast';
import { ToastContainer } from 'react-toastify';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

type FormValue = {
        name: string;
        dateOfBirth: string;
        gender: string;
        phoneNumber: string;
        avatarImg?: any;
        frontImg: any;
        backImg: any;
        taskInfo: string;
};
const AddEmployee = () => {

        const router = useRouter();
        const [imagesKeys, setImagesKeys] = useState({ avatar: "", front: "", end: "" });
        const [frontImg, setFrontImg] = useState<any>();
        const [backImg, setBackImg] = useState<any>();
        const [t, i18n] = useTranslation();
        const [errors, setErrors] = useState<any>();

        const handleFontImg = (e: any) => {
                const file = e.target.files[0];

                setFrontImg(file);
        };
        const handleBackImg = (e: any) => {
                const file = e.target.files[0];
                setBackImg(file);
        };
        const whiteBackground = {
                backgroundColor: "white",
        };
        const [formValue, setFormValue] = useState({
                name: "",
                dateOfBirth: "",
                gender: "",
                phoneNumber: "",
                taskInfo: "",
                identifyNumber: ""
        });

        const [avatar, setAvatar] = useState<any>();
        const handleAvatarClick = () => {
                avatarRef.current ? avatarRef.current.click() : console.error("error");
        };

        const handleChangeAvatar = (e: any) => {
                const file = e.target.files[0];
                setAvatar(file);
        };
        const AvatarImage = useMemo(() => {
                return avatar ? (
                        <Image
                                onClick={handleAvatarClick}
                                fill
                                style={{ borderRadius: "60%" }}
                                alt=""
                                src={URL.createObjectURL(avatar)}
                        />
                ) : (
                        <Image
                                onClick={handleAvatarClick}
                                fill
                                style={{ borderRadius: "30%" }}
                                alt=""
                                src={Images.uploadAvatar}
                        />
                );
        }, [avatar]);
        const BackImage = useMemo(() => {
                return backImg ? (
                        <Image
                                onLoad={(e: any) => URL.revokeObjectURL(e.target.src)}
                                className={styles.img}
                                width={420}
                                height={120}
                                alt=""
                                src={URL.createObjectURL(backImg)}
                        />
                ) : (
                        <></>
                );
        }, [backImg]);

        const FrontImage = useMemo(() => {
                return frontImg ? (
                        <Image
                                onLoad={(e: any) => URL.revokeObjectURL(e.target.src)}
                                className={styles.img}
                                width={420}
                                height={120}
                                alt=""
                                src={URL.createObjectURL(frontImg)}
                        />
                ) : (
                        <></>
                );
        }, [frontImg]);

        const validation = () => {
                let err = {} as FormValue;
                const phonePattern =
                        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
                if (formValue.name === "") {
                        err.name = "Trường họ và tên là bắt buộc!";
                }
                if (formValue.dateOfBirth === "") {
                        err.dateOfBirth = "Trường ngày sinh là bắt buộc!";
                }
                if (formValue.gender === "") {
                        err.gender = "Trường giới tính là bắt buộc!";
                }

                if (formValue.phoneNumber === "") {
                        err.phoneNumber = "Trường số điện thoại là bắt buộc!";
                } else if (!phonePattern.test(formValue.phoneNumber)) {
                        err.phoneNumber = "Số điện thoại không hợp lệ!";
                }
                if (!frontImg) {
                        err.frontImg = "Vui lòng chọn ảnh!";
                }
                if (!backImg) {
                        err.backImg = "Vui lòng chọn ảnh!";
                }
                if (formValue.identifyNumber === "") {
                        err.name = "Trường căn cước công dân là bắt buộc!";
                }
                return err;
        };
        const handleChange = useCallback(
                (e: ChangeEvent<HTMLInputElement>) => {
                        console.log(e.target.value);
                        const newObj = { ...formValue, [e.target.name]: e.target.value };
                        setFormValue(newObj);
                },
                [formValue]
        );
        const avatarRef = useRef<HTMLInputElement>(null);

        const createHandle = async (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                console.log('createHandle called');
                console.log('formValue:', formValue);
                const err = validation();
                setErrors(err);
                if (Object.keys(err).length === 0) {
                        const form = new FormData();
                        form.append("name", formValue.name);
                        form.append("date_of_birth", formValue.dateOfBirth);
                        form.append("gender", formValue.gender);
                        form.append("phone_number", formValue.phoneNumber);
                        form.append("front_identify_card_photo", frontImg);
                        form.append("back_identify_card_photo", backImg);
                        form.append("task_info", formValue.taskInfo);
                        form.append("identify_number", formValue.identifyNumber);
                        if (avatar) {
                                console.log(avatar);
                                form.append("profile_picture", avatar);
                        }
                        // form.append("avatar_photo", avatar || "");
                        try {
                                loadingFiler(document.body!);
                                await axios
                                        .post("/api/employee", form)
                                        .then((response) => {
                                                setFormValue({
                                                        name: "",
                                                        dateOfBirth: "",
                                                        gender: "",
                                                        phoneNumber: "",
                                                        taskInfo: "",
                                                        identifyNumber: "",


                                                });
                                                setFrontImg(null);
                                                setBackImg(null);
                                                setAvatar(null);
                                                setImagesKeys({ avatar: Math.random().toString(36), front: Math.random().toString(36), end: Math.random().toString(36) });
                                                removeLoadingFilter(document.body!);

                                                toastMessage({ type: "success", title: "Create successfully!" });
                                                setTimeout(() => {
                                                        router.push('/home/employee?auth=true');
                                                }, 2000);
                                        })
                                        .catch((e) => {
                                                removeLoadingFilter(document.body!);
                                                console.log(e);
                                                toastMessage({ type: "error", title: "Create fail!" });
                                        });
                        } catch (e) {
                                console.log(e);
                        }
                }
        };

        return (
                <main className={styles.main} style={whiteBackground}>

                        <div className={styles.wapper}>
                                <p className={styles.headingXl}>  {t("add_employeetitle")}</p>
                                <Form className={styles.form}>

                                        <Row>
                                                <Col xs={12} md={6}>
                                                        <Form.Group className={styles.box}>
                                                                <div className={styles.avatarLayout} style={{ display: 'flex', alignItems: 'center' }}>
                                                                        <Form.Label className={styles.label}>Ảnh đại diện:</Form.Label>
                                                                        {AvatarImage}
                                                                        <input
                                                                                onChange={handleChangeAvatar}
                                                                                type="file"
                                                                                key={imagesKeys.avatar || ""}
                                                                                ref={avatarRef}
                                                                                style={{ display: "none" }}
                                                                        />
                                                                </div>
                                                        </Form.Group>
                                                </Col>
                                        </Row>


                                        <Form.Group className={styles.box} >
                                                <Form.Label className={styles.label}> {t("name")}</Form.Label>
                                                <Form.Control size="lg" type="text" placeholder="" value={formValue.name} onChange={handleChange} name="name" />
                                                {errors && errors.name && (
                                                        <span className={styles.error}>{errors.name}</span>
                                                )}
                                        </Form.Group>

                                        <Form.Group className={styles.box} >
                                                <Form.Label className={styles.label}> {t("birthday")}</Form.Label>
                                                <Form.Control
                                                        size="lg"
                                                        type="date"
                                                        name="dateOfBirth"
                                                        value={formValue.dateOfBirth}
                                                        onChange={handleChange}
                                                        placeholder=""
                                                />
                                                {errors && errors.dateOfBirth && (
                                                        <span className={styles.error}>{errors.dateOfBirth}</span>
                                                )}
                                        </Form.Group>
                                        <Form.Group className={styles.box}>
                                                <Form.Label className={styles.label}> {t("gender")}</Form.Label>


                                                <div key={`inline-radio`} className={styles.box}>
                                                        <Form.Check
                                                                inline
                                                                label={t("male")}
                                                                name="gender"
                                                                value="male"
                                                                onChange={handleChange}
                                                                type='radio'
                                                                id={`inline-radio-1`}
                                                        />
                                                        <Form.Check
                                                                inline
                                                                label={t("female")}
                                                                name="gender"
                                                                type='radio'
                                                                value="female"
                                                                onChange={handleChange}
                                                                id={`inline-radio-2`}
                                                        />
                                                </div>
                                                {errors && errors.gender && (
                                                        <span className={styles.error}>{errors.gender}</span>
                                                )}
                                        </Form.Group>
                                        <Form.Group className={styles.box}>
                                                <Form.Label className={styles.label}> {t("phone_number")}</Form.Label>
                                                <Form.Control size="lg" type="text" placeholder="" name="phoneNumber" value={formValue.phoneNumber} onChange={handleChange} />
                                                {errors && errors.phoneNumber && (
                                                        <span className={styles.error}>{errors.phoneNumber}</span>
                                                )}
                                        </Form.Group>
                                        <Form.Group className={styles.box}>
                                                <Form.Label className={styles.label}>
                                                        {t("task")}
                                                </Form.Label>
                                                <Form.Control
                                                        size="lg"
                                                        type="text"
                                                        name="taskInfo"
                                                        onChange={handleChange}
                                                        value={formValue.taskInfo}
                                                        placeholder=""
                                                />

                                        </Form.Group>
                                        <Form.Group className={styles.box}>
                                                <Form.Label className={styles.label}>
                                                        {t("identyfy_number")}
                                                </Form.Label>
                                                <Form.Control
                                                        size="lg"
                                                        type="text"
                                                        name="identifyNumber"
                                                        onChange={handleChange}
                                                        value={formValue.identifyNumber}
                                                        placeholder=""
                                                />
                                                {errors && errors.identifyNumber && (
                                                        <span className={styles.error}>{errors.identifyNumber}</span>
                                                )}
                                        </Form.Group>
                                        <div className={styles.box}>
                                                <Form.Group className="mb-3">
                                                        <Form.Label className={classNames(styles.label, styles.required)}>
                                                        {t("identyfy_front")}
                                                        </Form.Label>
                                                        <Form.Control
                                                                accept="image/*"
                                                                onChange={handleFontImg}
                                                                size="lg"
                                                                key={imagesKeys.front || ""}
                                                                name="front"
                                                                type="file"
                                                                placeholder=""
                                                        />
                                                        {FrontImage}
                                                        {errors && errors.frontImg && (
                                                                <span className={styles.error}>{errors.frontImg}</span>
                                                        )}

                                                </Form.Group>

                                        </div>
                                        <div className={styles.box}>
                                                <Form.Group className="mb-3">
                                                        <Form.Label className={classNames(styles.label, styles.required)}>
                                                              {t("identyfy_back")}
                                                        </Form.Label>
                                                        <Form.Control
                                                                accept="image/*"
                                                                name="back"
                                                                onChange={handleBackImg}
                                                                size="lg"
                                                                key={imagesKeys.end || ""}
                                                                type="file"
                                                                placeholder=""
                                                        />
                                                        {BackImage}
                                                        {errors && errors.backImg && (
                                                                <span className={styles.error}>{errors.backImg}</span>
                                                        )}
                                                </Form.Group>
                                        </div>
                                        {/* <Form.Group className={styles.box}>
                                                <Form.Label className={styles.label}>Công việc</Form.Label>
                                                <Form.Control size="lg" type="text" placeholder="" />

                                        </Form.Group> */}

                                        <ButtonComponent onClick={createHandle} className={styles.creatBtn1}>
                                        {t("create")}
                                        </ButtonComponent>

                                </Form>
                        </div >

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
                </main >
        );
};
export default AddEmployee;