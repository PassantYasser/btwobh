'use client'
import React from 'react'
import { Heart, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { deleteProductThunk, getProductsThunk } from '@/app/Redux/Features/Product/ProductSlice'


function Cards({ products, page, limit }) {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(deleteProductThunk({ id })).unwrap();
        dispatch(getProductsThunk({ page, limit }));
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    
      {products?.map((product)=>(
        <div key={product?.id} className=" overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm ">
        {/* Image */}
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-64 w-full object-cover"
          />

          

          <button className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">
            <Heart size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-3 p-5">
          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
            {product.category}
          </span>

          <h2 className="text-xl font-bold text-gray-800">
            {product.title}
          </h2>

          <p className="text-sm text-gray-500">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-gray-500">Brand</span>
            <span className="font-semibold">{product.brand}</span>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-2xl font-bold text-blue-600">
                ${product.price}
              </h3>

              <p className="text-sm text-gray-400 line-through">
                ${(
                  product.price /
                  (1 - product.discount / 100)
                ).toFixed(2)
                }
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              ID #{product.id}
            </span>
          </div>

          <div className="flex gap-2 pt-3">
            <Link
              href={`/Page/Booking/Details?id=${product.id}`}
              className="flex-1 text-center rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700 font-medium"
            >
              View
            </Link>

            <Link
              href={`/Page/Booking/Edit?id=${product.id}`}
              className="rounded-lg border p-2 hover:bg-gray-100"
            >
              <Pencil size={18} />
            </Link>

            <button 
              onClick={() => handleDelete(product.id)}
              className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
      ))}
    </div>
    </>
  )
}

export default Cards