"use client";
import { useAppSelector } from "@/lib/hooks";
import React from "react";

export default function Cart() {
  const { itemsCount } = useAppSelector((state) => state.cart); // Total items in cart
  return (
    <div>
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
      <p className="mt-4">Total Items: {itemsCount}</p>
    </div>
  );
}
