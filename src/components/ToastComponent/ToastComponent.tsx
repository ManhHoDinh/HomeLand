import React, { useEffect, useState } from "react";
import styles from "./ToastComponent.module.scss";
import { ErrorIcon, SearchIcon, SuccessIcon, WarnIcon } from "../icons";
import clsx from "clsx";
const ToastComponent = ({ type }: { type: string }) => {
  let count = 0;
  let initClassName = [
    styles.toast,
    {
      [styles.success]: type === "success",
      [styles.error]: type === "error",
      [styles.warning]: type === "warning",
    },
  ];
  const [className, setClassName] = useState(initClassName);
  const listStatus= [
    {
      type: "success",
      title: "Success!",
      icon: <SuccessIcon width={24} height={24} />,
    },
    {
      type: "warning",
      title: "Warning!",
      icon: <WarnIcon width={24} height={24} />,
    },
    {
      type: "error",
      title: "Error!",
      icon: <ErrorIcon width={24} height={24} />,
    },
  ];
  const status = listStatus.find(status => status.type === type)


 
  setTimeout(() => {
    setClassName((prev) => [...prev, styles.hideSlide]);
  }, 3000);
  setTimeout(() => {
    setClassName((prev) => [...prev, styles.hide]);
  }, 4000);
  return (
    <div className={clsx(...className)}>
      <span>
        {status?.icon}
      </span>
      <span>{status?.title}</span>
      <span className={styles.countDown}></span>
    </div>
  );
};

export default ToastComponent;
