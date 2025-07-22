"use client";
import { AdminDataTable } from "@/components/data-table/AdminDataTable";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import React from "react";

export default function page() {
  return (
    <div>
      <AppSidebar />
      <AdminDataTable />
    </div>
  );
}
