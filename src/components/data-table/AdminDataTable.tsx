"use client";

import { UserType } from "@/types/userType";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

export function AdminDataTable() {
  const [users, setUser] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL_API}users`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data.users);
        setUser(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const columns: TableColumn<UserType>[] = [
    {
      name: "ID",
      selector: (row: UserType) => row.id,
      width: "100px",
    },
    {
      name: "Username",
      selector: (row: UserType) => row.firstName + " " + row.lastName,
      width: "250px",
    },
    {
      name: "Age",
      selector: (row: UserType) => row.age,
      width: "170px",
    },
    {
      name: "Gender",
      selector: (row: UserType) => row.gender,
      width: "170px",
    },
    {
      name: "Gender",
      selector: (row: UserType) => row.birthDate,
      width: "170px",
    },
    {
      name: "Country",
      selector: (row: UserType) => row.address.country,
      width: "150px",
    },
    {
      name: "Email",
      selector: (row: UserType) => row.email,
      width: "280px",
    },
  ];

  return (
    <DataTable
      title="User List"
      columns={columns}
      data={users}
      progressPending={loading}
      pagination
    />
  );
}
