"use client";

import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";

type Movie = {
  id: number;
  title: string;
  year: string;
};

const columns:TableColumn<Movie>[] = [
  {
    name: "Title",
    selector: (row) => row.title,
  },
  {
    name: "Year",
    selector: (row) => row.year,
  },
];
const data: Movie[] = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },  
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
];

export function AdminDataTable() {
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // if (!isClient) {
  //   return <h1>Loading...</h1>;
  // }

  return <DataTable columns={columns} data={data}  />;
}
