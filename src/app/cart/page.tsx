'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from '@/lib/features/cartSlice'
import Image from 'next/image'
import React from 'react'

export default function CartPage() {
  const dispatch = useAppDispatch()
  const { items, total, itemsCount } = useAppSelector((state) => state.cart)

  const handleQuantityChange = (id: number, newQty: number) => {
    if (newQty >= 0) {
      dispatch(updateQuantity({ id, quantity: newQty }))
    }
  }

  if (items.length === 0) {
    return (
      <section className="w-[90%] mx-auto py-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">🛒 Your cart is empty</h2>
      </section>
    )
  }

  return (
    <section className="w-[90%] mx-auto my-10">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Your Shopping Cart</h2>
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded shadow-md">
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={100}
              height={100}
              className="rounded object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-500">{item.description}</p>
              <p className="text-sm text-gray-400">Category: {item.category}</p>
              <p className="font-bold text-blue-500">${item.price.toFixed(2)}</p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="bg-gray-200 px-2 rounded"
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="bg-gray-200 px-2 rounded"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-100 p-6 rounded shadow-md">
        <p className="text-lg font-semibold">🧾 Items: {itemsCount}</p>
        <p className="text-xl font-bold text-green-600">💰 Total: ${total.toFixed(2)}</p>
        <button
          onClick={() => dispatch(clearCart())}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Cart
        </button>
      </div>
    </section>
  )
}
