"use client"
import { useEffect } from "react";
import "./globals.css";
import "./i18next";
export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return <body>{children}</body>;
}
