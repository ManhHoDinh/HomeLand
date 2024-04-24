"use client"
import React, { useState } from "react";
import styles from "./submitComplain.module.scss";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import { SendIcon } from "@/components/icons";
import clsx from "clsx";
import { UserProfile } from "@/libs/UserProfile";
import axios from "axios";
import { loadingFiler, removeLoadingFilter } from "@/libs/utils";
import toastMessage from "@/utils/toast";
import { ToastContainer } from "react-toastify";
const SubmitComplain = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = async () => {
    console.log(content);
    if (content === "") {
      setError(true);
    } else {
      const form = new FormData();
      const user = UserProfile.getProfile();
      form.append("content", content);
      form.append("resident_id", user.id);
      try {
        loadingFiler(document.body!);
        await axios.post("/api/complain", form);
        removeLoadingFilter(document.body!);
        toastMessage({ type: "success", title: "send successfully!" });
        setContent("");
      } catch (err) {
        removeLoadingFilter(document.body!);
        toastMessage({ type: "error", title: "send fail!" });
        throw err;
      }
    }
  };
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.header}>Submit Complain</h3>
      <div className={styles.container}>
        <div className={styles.content}>
          <label>Complaint content</label>
          <div className="d-flex flex-column" style={{ flex: 1, height: 120 }}>
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setError(false);
              }}
            />

            <span
              className={clsx(styles.error, {
                [styles.hidden]: !error,
              })}
            >
              Content is not empty!
            </span>
          </div>
        </div>

        <ButtonComponent
          onClick={handleSubmit}
          preIcon={<SendIcon width={16} height={16} />}
          className={styles.submitBtn}
        >
          submit
        </ButtonComponent>
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
    </div>
  );
};

export default SubmitComplain;
