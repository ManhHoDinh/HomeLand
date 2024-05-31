"use client";
import { useTranslation } from "react-i18next";
import styles from "../page.module.css";
import { ReactElement, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { UserProfile } from "@/libs/UserProfile";
import AdminDashboard from "./indexing/AdminDashboard/page";
import TechnicianDashboard from "./indexing/technicianDashboard/page";
import { Col, Container, Row } from "react-bootstrap";

export const metadata = {
  title: "Bảng điều khiển",
  description: "HomeLand - Giải pháp công nghệ cho việc quản lý chung cư",
};
export default function Dashboard() {
  const [t, i18n] = useTranslation();
  const type = UserProfile.getRole();

  const options = [{
    type:'admin',
    component: <AdminDashboard/>
  },
{

  type: 'technician',
  component: <TechnicianDashboard/>
}]
const option = options.find(option => option.type === type);
  return (
    <main >
     {option?.component}
    </main>
  );
}
