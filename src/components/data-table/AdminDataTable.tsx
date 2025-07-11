"use client";

import { UserType } from "@/types/userType";
import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { CiEdit, CiTrash } from "react-icons/ci";

// Custom components
const CustomHeader = () => (
  <div className="p-4 bg-gray-100 border-b">
    <h2 className="text-lg font-semibold">👥 User List</h2>
  </div>
);

const CustomFooter = ({ rowCount }: { rowCount: number }) => (
  <div className="p-4 bg-gray-50 border-t text-sm text-gray-600">
    Total Users: {rowCount}
  </div>
);

export function AdminDataTable() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(true);
    const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}users`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data.users);
                setFilteredUsers(data.users);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Handle search
    useEffect(() => {
        const filtered = users.filter((user) =>
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [search, users]);

    // Handle edit/delete
    const handleEdit = (id: string) => {
        console.log('Edit user:', id);
        // Navigate or open modal...
    };

    const handleDelete = (id: string) => {
        console.log('Delete user:', id);
        // Show confirmation or delete logic...
    };


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
      name: "Birth Of Date",
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
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.id)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
          >
            <CiEdit />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
          >
            <CiTrash />
          </button>
        </div>
      ),
      width: "280px",
    },
  ];

  return (
    <main className="p-4">
      <CustomHeader />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300 mt-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredUsers}
        keyField="id"
        progressPending={loading}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 30, 50]}
        // selectableRows
      />
      <CustomFooter rowCount={users.length} />
    </main>
  );
}
