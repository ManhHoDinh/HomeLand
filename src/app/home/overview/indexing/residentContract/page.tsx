"use client"
import { UserProfile } from "@/libs/UserProfile";
import { Contract } from "@/models/contract";
import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import styles from "../../overview.module.scss";
import { format } from "date-fns";
import clsx from "clsx";
const ResidentContract = () => {
  const { data } = useQuery({
    queryKey: "resident_contracts",

    queryFn: () => {
      const residentId = UserProfile.getId();
      return axios
        .get(`/api/contract/resident/${residentId}`)
        .then((res) => res.data as Contract[]);
    },
  });

  return (
    <div className={styles.wrapper}>
      <h4> Contract History</h4>
      {data &&
        data?.map((contract, index) => (
          <div key={index} className={styles.contractItems}>
            <div className="row">
              <div className="col-4 d-flex flex-column">
                <span className={styles.label}>Role</span>
                <span
                  className={clsx(styles.content, {
                    [styles.rent]: contract.role === "rent",
                    [styles.buy]: contract.role === "buy",
                  })}
                >
                  {contract.role}
                </span>
              </div>
              <div className="col-4 d-flex flex-column">
                <span className={styles.label}>Status</span>
                <span
                  className={clsx(styles.status, styles.content, {
                    [styles.active]: contract.status === "active",
                    [styles.inactive]: contract.status === "inactive",
                  })}
                >
                  {contract.status}
                </span>
              </div>
              <div className="col-4 d-flex flex-column">
                <span className={styles.label}>Apartment</span>
                <span className={clsx(styles.content)}>
                  {contract.apartment.name}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-4 d-flex flex-column">
                <span className={styles.label}>Created At</span>
                <span className={styles.content}>
                  {format(new Date(contract.created_at), "dd/MM/yyyy")}
                </span>
              </div>
              <div className="col-4 d-flex flex-column">
                <span className={styles.label}>Expire At</span>
                <span className={styles.content}>
                  {format(new Date(contract.expire_at as Date), "dd/MM/yyyy")}
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ResidentContract;
