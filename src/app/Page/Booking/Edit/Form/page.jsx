import { Star } from 'lucide-react';
import React, { useState } from 'react'

function Formpage({formData , setFormData}) {
  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState("Electronics");

  const categories = [
    "Electronics",
    "Fashion",
    "Books",
    "Sports",
  ];


  return (
    <>

      <form className="space-y-6">

        {/* Product Title */}
        <div>
          <label className="block mb-2 text-sm font-semibold">
            Product Title
          </label>
          <input
            type="text"
            value={formData?.title}
            onChange={(e)=>{
              setFormData((prev)=>({
                ...prev,
                title: e.target.value
              }))
            }}  
            placeholder="Wireless Bluetooth Headphones"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700 ">
            Description
          </label>

          <textarea
            rows={5}
            value={formData?.description}
            onChange={(e)=>{
              setFormData((prev)=>({
                ...prev,
                description: e.target.value
              }))
            }}
            placeholder="Write product description..."
            className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none resize-none focus:border-blue-500"
          />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Category */}
          <div className="relative">
            <label className="block mb-2 text-sm font-semibold text-gray-700 ">
              Category
            </label>

            {/* Selected Item */}
            <button
              type="button"
              onClick={() => setOpenCategory(!openCategory)}
              className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-left hover:border-blue-500"
            >
              <span>{formData?.category}</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition ${
                  openCategory ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown */}
            {openCategory && (
              <ul className="absolute left-0 z-20 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
                {categories.map((item) => (
                  <li
                    key={item}
                    onClick={() => {
                      setCategory(item);
                      setOpenCategory(false);
                      setFormData((prev)=>({
                        ...prev,
                        category:item
                      }))
                    }}
                    className={`cursor-pointer px-4 py-3 transition hover:bg-blue-50 ${
                      category === item ? "bg-blue-100 font-semibold" : ""
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Brand */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 ">
              Brand
            </label>

            <input
              type="text"
              value={formData?.brand}
              onChange={(e)=>{
                setFormData((prev)=>({
                  ...prev,
                  brand: e.target.value
                }))
              }}
              placeholder="Sony"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 ">
              Price ($)
            </label>

            <input
              type="number"
              value={formData?.price}
              onChange={(e)=>{
                setFormData((prev)=>({
                  ...prev,
                  price: e.target.value
                }))
              }}
              placeholder="669.17"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Discount */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 ">
              Discount (%)
            </label>

            <input
              type="number"
              value={formData?.discount}
              onChange={(e)=>{
                setFormData((prev)=>({
                  ...prev,
                  discount: e.target.value
                }))
              }}
              placeholder="15"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          
          

        </div>
          

          </form>

    </>
  )
}

export default Formpage