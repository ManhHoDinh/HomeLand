"use client";

import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS

import React from "react";
import PageWraper from "@/components/pageWraper/PageWraper";

export const metadata = {
  title: "Các tài sản",
  description: "HomeLand - Giải pháp công nghệ cho việc quản lý chung cư",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWraper>{children}</PageWraper>;
}
