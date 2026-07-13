"use client";
import React, { useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Tag, Heart } from "lucide-react";
import DashboardLayout from "@/app/Components/Layout/DashboardLayout";
import { getProductByIdThunk } from "@/app/Redux/Features/Product/ProductSlice";

function DetailsContent() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const {
    getProductById: product,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(getProductByIdThunk(id));
    }
  }, [dispatch, id]);

  if (loading || !product) {
    return (
      <div className="flex h-64 items-center justify-center text-lg font-medium text-gray-500">
        Loading...
      </div>
    );
  }

  const originalPrice = (
    product.price /
    (1 - product.discount / 100)
  ).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/Page/Booking"
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition hover:bg-gray-50 hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Back to Bookings
        </Link>
      </div>

      {/* Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-1 gap-8 p-4 sm:p-6 lg:grid-cols-2 lg:p-8">
          {/* Image */}
          <div className="relative flex items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-4">
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="h-64 w-full rounded-lg object-contain sm:h-80 lg:h-[450px]"
            />

            <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:bg-gray-50">
              <Heart
                size={20}
                className="text-gray-500 transition-colors hover:text-red-500"
              />
            </button>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                <Tag size={14} />
                {product.category}
              </span>

              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
                {product.title}
              </h1>

              <p className="text-sm leading-7 text-gray-600 sm:text-base lg:text-lg">
                {product.description}
              </p>

              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between py-3 text-sm">
                  <span className="font-medium text-gray-500">
                    Brand
                  </span>

                  <span className="font-semibold text-gray-900">
                    {product.brand}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-gray-50 py-3 text-sm">
                  <span className="font-medium text-gray-500">
                    Product ID
                  </span>

                  <span className="font-semibold text-gray-900">
                    #{product.id}
                  </span>
                </div>
              </div>
            </div>

            {/* Price & Buttons */}
            <div className="space-y-5 border-t border-gray-100 pt-6">
              <div className="flex flex-wrap items-end gap-3">
                <span className="text-3xl font-extrabold text-blue-600 sm:text-4xl">
                  ${product.price}
                </span>

                {product.discount > 0 && (
                  <span className="text-lg text-gray-400 line-through">
                    ${originalPrice}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button className="flex-1 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                  Book Now
                </button>

                <Link
                  href={`/Page/Booking/Edit?id=${product.id}`}
                  className="flex flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 sm:flex-none"
                >
                  Edit Product
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailsPage() {
  return (
    <DashboardLayout>
      <Suspense
        fallback={
          <div className="p-8 text-center text-slate-500">
            Loading details...
          </div>
        }
      >
        <DetailsContent />
      </Suspense>
    </DashboardLayout>
  );
}

export default DetailsPage;