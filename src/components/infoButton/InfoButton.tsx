import {
  FaAddressBook,
  FaRegArrowAltCircleDown,
  FaSignOutAlt,
} from "react-icons/fa";
import { futuna } from "../../../public/fonts/futura";
import styles from "./infoButton.module.css";
import { Dropdown, DropdownMenu, DropdownToggle } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export const InfoButton = ({
  buttonBody,
}: {
  buttonBody?: JSX.Element[] | never[] | JSX.Element;
}) => {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  useEffect(() => {
    axios
      .get("/api/me")
      .then((res) => {
        setProfile(res.data as Profile);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const dropdownButton = React.forwardRef(() => (
    <div style={{}} className={`${futuna.className} ${styles.infoButton}`}>
      <button
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30  "
          fill="currentColor"
          className="bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path
            fill-rule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          />
        </svg>
        <div className={styles.infoDetail}>
          <p style={{ margin: "auto 5px", whiteSpace: "nowrap" }}>
            {profile?.name ?? "unknown"}
          </p>
          <FaRegArrowAltCircleDown style={{ margin: "auto 5px" }} size={25}>
            {" "}
          </FaRegArrowAltCircleDown>
        </div>
      </button>
    </div>
  ));
  dropdownButton.displayName = "ddbtn";
  const dropdownInfo = [
    {
      title: "Edit profile",
      icon: <FaAddressBook />,
      onClick: () => {},
    },
    {
      title: "Log out",
      icon: <FaSignOutAlt />,
      onClick: () => {
        axios
          .get("/api/logout")
          .then((res) => router.push("/home"))
          .catch((err) => {
            console.log(err);
            alert("Something went wrong");
          });
      },
    },
  ];
  return (
    <Dropdown
      style={{ display: "flex", alignContent: "center", flexWrap: "wrap" }}
      className={styles.hoverContainer}
    >
      <DropdownToggle as={dropdownButton} />
      {/* <DropdownToggle/> */}

      <DropdownMenu
        show={true}
        style={{
          position: "absolute",
          inset: "0px 0px auto auto",
          transform: "translate3d(-10px, 55px, 0px)",
        }}
        className={styles.hoverContent}
      >
        <div
          style={{
            width: "100%",
            height: "fit-content",
          }}
          className={futuna.className}
        >
          {dropdownInfo.map((value, index) => (
            <button
              key={index}
              className={styles.dropdownItem}
              onClick={() => value.onClick()}
            >
              <div style={{ margin: "auto 0" }}>{value.icon}</div>
              <div style={{ width: "10px", height: "100%" }} />
              <div style={{ fontSize: "1.3rem" }}> {value.title}</div>
            </button>
          ))}
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};
