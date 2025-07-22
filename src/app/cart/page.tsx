"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { updateQuantity, removeFromCart, clearCart } from "@/lib/features/cartSlice";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Cart() {
  const dispatch = useAppDispatch();
  const { items, itemsCount, total } = useAppSelector((state) => state.cart);

  return (
    <div className="mt-24 max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="flex flex-col gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg">Total Items</span>
            <span className="font-bold">{itemsCount}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg">Subtotal</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <Button className="w-full mt-4" disabled={items.length === 0}>
            Proceed to Checkout
          </Button>
          <Button
            className="w-full mt-2"
            variant="outline"
            disabled={items.length === 0}
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Items in Cart</h2>
          {items.length === 0 ? (
            <p className="text-gray-500">Your cart is currently empty.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-4 border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={64}
                      height={64}
                      unoptimized
                      className="object-cover rounded-md"
                    />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">Category: {item.category}</p>
                      <p className="text-sm text-gray-500">Price: ${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() =>
                            dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                          }
                        >
                          -
                        </Button>
                        <span className="px-2">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() =>
                            dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-2"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
