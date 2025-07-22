"use client";

import { usePathname } from "next/navigation";
import React from "react";
import NavbarComponent from "./NavbarComponent";

export default function NavbarWrapper() {
  const pathname = usePathname();
  if (pathname === "/user-dashboard" || pathname ===  "/blog-dashboard") {
    return null;
  }

  return <NavbarComponent />;
}
