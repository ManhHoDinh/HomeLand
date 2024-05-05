"use client";

import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS

import React from "react";
import PageWraper from "@/components/pageWraper/PageWraper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageWraper>{children}</PageWraper>;
}
