"use client";

import React, { useState } from "react";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/lib/api/productsApi";
import { ProductType } from "@/types/productType";
import Image from "next/image";

export default function ProductActions() {
  const { data: products } = useGetProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [form, setForm] = useState({
    title: "",
    price: 0,
    image: "",
    categoryId: 1,
  });
  const [editing, setEditing] = useState<number | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_PLATZI_URL}files/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data?.location) {
        setForm({ ...form, image: data.location });
        alert(data.location);
        console.log(form);
      } else {
        throw new Error("Upload failed.");
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload image.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const productPayload = {
      title: form.title,
      price: form.price,
      description: "Default Description",
      categoryId: 1,
      images: [form.image],
    };

    try {
      if (editing) {
        await updateProduct({ id: editing, data: productPayload }).unwrap();
        setEditing(null);
      } else {
        await createProduct(productPayload).unwrap();
      }

      setForm({
        title: "",
        price: 0,
        image: "",
        categoryId: 1,
      });
    } catch (err) {
      console.error("Error submitting product:", err);
      alert("Failed to submit product.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id).unwrap();
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Deletion failed.");
    }
  };

  const handleEdit = (product: ProductType) => {
    setForm({
      title: product.title,
      price: product.price,
      image: product.images[0] || "",
      categoryId: product.category?.id || 1,
    });
    setEditing(product.id);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl font-semibold text-center">Product Manager</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-4"
      >
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Product Name"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: parseFloat(e.target.value) })
            }
            placeholder="Product Price"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="flex justify-between gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {editing ? "Update" : "Create"} Product
          </button>
        </div>
      </form>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-medium mb-4">📦 Product List</h2>
        {products && products.length > 0 ? (
          <ul className="divide-y divide-gray-100">
            {products.map((p: ProductType) => (
              <li key={p.id} className="py-2 flex justify-between items-center">
                <div>
                  <Image
                    src={p.images[0]}
                    alt={p.title}
                    width={50}
                    height={50}
                    className="rounded-md mr-4"
                    unoptimized
                  />
                  <p className="font-medium">{p.title}</p>
                  <p className="text-sm text-gray-500">${p.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-1">ID: {p.id}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-blue-600 text-xs hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 text-xs hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
}
