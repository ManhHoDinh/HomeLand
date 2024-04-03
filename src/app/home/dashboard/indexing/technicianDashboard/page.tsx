"use client";
import clsx from "clsx";
import React, { useState } from "react";
import styles from "./technicianDashboard.module.scss";
import Image from "next/image";
import { useQuery } from "react-query";
import axios from "axios";
import { UserProfile } from "@/libs/UserProfile";
import { Technician } from "@/models/technician";
import { format } from "date-fns";
import { futuna } from "../../../../../../public/fonts/futura";
import { Task } from "@/models/task";
import ButtonComponent from "@/components/buttonComponent/buttonComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaTasks } from "react-icons/fa";
import {
  MdOutlineFileDownloadDone,
  MdOutlineLowPriority,
} from "react-icons/md";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const Moment = require("moment");
import { extendMoment } from "moment-range";
import { ContractStatusRole } from "@/models/contract";
const TechnicianDashboard = () => {
  const [data, setData] = useState<Technician>();
  const { data: technicianData } = useQuery("techDashboard", async () => {
    const res = await axios.get(`/api/technician/${UserProfile.getId()}`);
    setData(res.data);
  });
  const { data: tasks } = useQuery({
    queryKey: ["taskStatistic"],
    queryFn: () =>
      axios
        .get(`/api/task/technician/${UserProfile.getId()}`)
        .then((res) => res.data as Task[]),
  });
  const moment = extendMoment(Moment);
  const avatar = data?.profile.avatarURL as string;
  const dateOfBirth = data?.profile.date_of_birth as Date;
  const current = new Date();
  const start = new Date();
  start.setDate(current.getDate() - 60);
  const [startDate, setStartDate] = useState<Date | null>(start);
  const [endDate, setEndDate] = useState<Date | null>(current);
  const range = moment.range(start, current);

  const initLabels = Array.from(range.by("month")).map((x) =>
    x.format("MM/yyyy")
  );
  console.log(initLabels);
  const initChartData = initLabels.map((label) => {
    const count = tasks?.filter(
      (task) => format(new Date(task.created_at), "MM/yyyy") === label
    ).length;
    return {
      time: label,
      quantity: count,
    };
  });
  const [chartData, setChartData] = useState<Array<any>>(initChartData);
  const applyHandler = () => {
    const start = startDate as Date;
    const end = endDate as Date;
    const range = moment.range(start, end);
    const labels = Array.from(range.by("month")).map((x) =>
      x.format("MM/yyyy")
    );

    const chartData = labels.map((label) => {
      const count = tasks?.filter(
        (task) => format(new Date(task.created_at), "MM/yyyy") === label
      ).length;
      return {
        time: label,
        quantity: count,
      };
    });
    console.log(chartData);
    setChartData(chartData);
  };
  console.log(tasks);
  return (
    <div className={clsx(styles.wrapper, futuna.className)}>
      <div className={clsx(styles.header)}>
        <div style={{ textAlign: "center" }} className="col-lg-3">
          <div className={clsx(styles.inforLayout)}>
            <p className={clsx(styles.inforHeader)}>Information</p>
            <Image
              style={{ borderRadius: "50%", margin: "16px 0px" }}
              src={avatar}
              width={80}
              height={80}
              alt=""
            />
            <div className="d-flex flex-column">
              <span className={clsx(styles.inforItem)}>
                Full name: {data && data.profile.name}
              </span>
              <span className={clsx(styles.inforItem)}>
                Date of birth:{" "}
                {dateOfBirth && format(new Date(dateOfBirth), "dd/MM/yyyy")}{" "}
              </span>
              <span className={clsx(styles.inforItem)}>
                Phone number: {data?.profile.phone_number}
              </span>
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <div className={clsx(styles.taskInfo)}>
            <p>Statistics of tasks</p>
            <div className={clsx(styles.taskStatistic)}>
              <div className={clsx(styles.taskItem)}>
                <div className={clsx(styles.iconTask, styles.all)}>
                  <FaTasks />
                </div>
                <div className="d-flex flex-column align-items-center">
                  <span className={clsx(styles.valueItem)}>
                    {tasks?.length}
                  </span>
                  <span className={clsx(styles.taskItemTitle)}>All Tasks</span>
                </div>
              </div>
              <div className={clsx(styles.taskItem)}>
                <div className={clsx(styles.iconTask, styles.finish)}>
                  <MdOutlineFileDownloadDone />
                </div>
                <div className="d-flex flex-column align-items-center">
                  <span className={clsx(styles.valueItem)}>
                    {tasks?.filter((task) => task.status === "DONE").length}
                  </span>
                  <span className={clsx(styles.taskItemTitle)}>Finished</span>
                </div>
              </div>
              <div className={clsx(styles.taskItem)}>
                <div className={clsx(styles.iconTask, styles.remain)}>
                  <MdOutlineLowPriority />
                </div>
                <div className="d-flex flex-column align-items-center">
                  <span className={clsx(styles.valueItem)}>
                    {tasks?.filter((task) => task.status !== "DONE").length}
                  </span>
                  <span className={clsx(styles.taskItemTitle)}>Remain</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={clsx(styles.body)}>
        <div className={clsx(styles.chartLayout)}>
          <p style={{ textAlign: "center", fontSize: 20 }}>
            Statistics on the number of created tasks by day
          </p>
          <div className={clsx(styles.headerChartLayout)}>
            <DatePicker
              showMonthYearPicker
              dateFormat="MM/yyyy"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <DatePicker
              showMonthYearPicker
              dateFormat="MM/yyyy"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
            <ButtonComponent
              className={clsx(styles.applyBtn)}
              onClick={applyHandler}
            >
              Apply
            </ButtonComponent>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="quantity"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TechnicianDashboard;
