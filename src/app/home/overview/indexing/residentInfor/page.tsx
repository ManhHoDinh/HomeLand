"use client"
import { UserProfile } from "@/libs/UserProfile";
import { Resident } from "@/models/resident";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import styles from "../../overview.module.scss";
import Image from "next/image";
import { format } from "date-fns";

const ResidentInfor = () => {
  const { data } = useQuery({
    queryKey: "resident_information",
    queryFn: () => {
      const residentId = UserProfile.getId();
      return axios
        .get(`/api/resident/${residentId}`)
        .then((res) => res.data as Resident);
    },
  });
  return (
    <div className={styles.wrapper}>
      <div className="row">
        <div className="col-3 d-flex flex-row justify-content-center align-items-start">
          <Image
          className={styles.img}
            width={200}
            height={200}
            src={data?.profile.avatarURL || ""}
            alt=""
          />
        </div>
        <div className="col-9 d-flex flex-column">
          <h4
            style={{
              padding: "10px 0px",
              borderBottom: "2px solid #ccc",
              fontWeight: "600",
            }}
          >
            General Information
          </h4>
          <div className="row">
            <div className="col-3 d-flex flex-column">
              <span className={styles.label}>Name</span>
              <span className={styles.content}>{data?.profile.name}</span>
            </div>
            <div className="col-3 d-flex flex-column">
              <span className={styles.label}>Date of Birth</span>
              {data?.profile.date_of_birth && (
                <span className={styles.content}>
                  {format(
                    new Date(data?.profile.date_of_birth) as Date,
                    "dd/MM/yyyy"
                  )}
                </span>
              )}
            </div>
            <div className="col-3 d-flex flex-column">
              <span className={styles.label}>Gender</span>
              <span className={styles.content}>{data?.profile.gender}</span>
            </div>
            <div className="col-3 d-flex flex-column">
              <span className={styles.label}>Identification Number</span>
              <span className={styles.content}>
                {data?.profile.identify_number}
              </span>
            </div>
          </div>

          <h4
            style={{
              marginTop: 20,
              padding: "10px 0px",
              borderBottom: "2px solid #ccc",
              fontWeight: "600",
            }}
          >
            Contact Information
          </h4>
          <div className="row">
            <div className="col-4 d-flex flex-column">
              <span className={styles.label}>Phone Number</span>
              <span className={styles.content}>
                {data?.profile.phone_number}
              </span>
            </div>
            <div className="col-4 d-flex flex-column">
              <span className={styles.label}>Email</span>
              <span className={styles.content}>
                {data?.account?.email || ""}
              </span>
            </div>
            <div className="col-4 d-flex flex-column">
              <span className={styles.label}>Payment Information</span>
              <span className={styles.content}>{data?.payment_info || ""}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentInfor;
