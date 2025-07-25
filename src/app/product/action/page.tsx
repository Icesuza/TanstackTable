"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/lib/api/productApi";
import { ProductType } from "@/types/productType";
import React, { useState } from "react";

export default function DashboardProductManager() {
  const { data: products = [], isLoading, error } = useGetProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [form, setForm] = useState({ title: "", price: "" });
  const [editing, setEditing] = useState<number | null>(null);

  //   Ensure products is always an array
  const productList = Array.isArray(products) ? products : [];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title || !form.price) {
      alert("Please fill in both title and price");
      return;
    }

    const productPayload = {
      title: form.title,
      price: parseFloat(form.price),
      description: "Default description",
      categoryId: 36,
      images: [
        "https://sokoskins.shop/cdn/shop/products/6_5d5d63ec-c2ab-4389-b4fe-d04eb565aa25_1200x1200.webp?v=1679384097",
      ],
    };

    try {
      if (editing !== null) {
        await updateProduct({ id: editing, data: productPayload });
        setEditing(null);
      } else {
        await createProduct(productPayload);
      }

      setForm({ title: "", price: "" });
    } catch (error) {
      console.error("Error submitting product: ", error);
    }
  };
  console.log(handleSubmit);

  const handleEdit = (product: ProductType) => {
    setForm({
      title: product.title,
      price: product.price.toString(),
    });
    setEditing(product.id);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
      } catch (error) {
        console.error("Error deleting product: ", error);
      }
    }
  };

  const handleCancel = () => {
    setForm({ title: "", price: "" });
    setEditing(null);
  };

  if (isLoading) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <div className="text-center text-red-500">
          Error loading products. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pt-24 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Product Dashboard
      </h1>

      {/* Create/Edit Product Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>


          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              {editing !== null ? "Update Product" : "Create Product"}
            </button>

            {editing !== null && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Products List */}
      <div className="space-y-3">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-4">
            {productList.map((product: ProductType) => (
              <div
                key={product.id}
                className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between hover:shadow-md transition-shadow ${
                  editing === product.id
                    ? "ring-2 ring-blue-500 bg-blue-50"
                    : ""
                }`}
              >
                <div className="flex items-center space-x-4">
                  {/* Yellow circle indicator */}
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>

                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {product.title}
                    </h3>
                    <p className="text-gray-600">
                      $
                      {typeof product.price === "number"
                        ? product.price.toFixed(2)
                        : product.price}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                  >
                    Edit
                  </button>
                  {/* <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                >
                  Delete
                </button> */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline"
                      onClick={() => handleDelete(product.id)} 
                      className="bg-red-500 text-white">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you to delete this?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your product and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
