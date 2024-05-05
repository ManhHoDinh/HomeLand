"use client";
import { RedirectType, redirect } from "next/navigation";

export default function Page() {
  redirect("/home", RedirectType.replace);
}
