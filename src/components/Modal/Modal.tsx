import clsx from "clsx";
import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import styles from "./Modal.module.scss";
import { futuna } from "../../../public/fonts/futura";

const ModalComponent = ({
  show,
  setShow,
  title,
  content = "When deleted, the data is still stored in the database.",
  handleConfirm,
}: {
  show: boolean;
  setShow: Function;
  title: string;
  content?: string;
  handleConfirm: () => Promise<void>;
}) => {
  const handleClose = () => setShow(false);
  return (
    <Modal
      className={futuna.className}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={handleClose}
    >
      <Modal.Header
        style={{ backgroundColor: "var(--red)", color: "#fff" }}
        closeButton
      >
        <Modal.Title style={{ fontSize: "1.2rem" }}>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer style={{ borderTop: "none" }}>
        <Button
          className={clsx(styles.btn)}
          variant="secondary"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          className={clsx(styles.btn)}
          variant="primary"
          onClick={handleConfirm}
        >
          Confirm<nav></nav>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
