'use client'
import DashboardLayout from '@/app/Components/Layout/DashboardLayout'
import React, { useEffect, useState, useMemo } from 'react'
import Cards from './Cards'
import Pagination from './Pagination'
import FilterPage from './Filter/page'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsThunk } from '@/app/Redux/Features/Product/ProductSlice'
import { Search, SlidersHorizontal } from 'lucide-react'

const DEFAULT_FILTERS = {
  categories: [],
  brandText: '',
  minPrice: '',
  maxPrice: '',
  minDiscount: 0,
}

function Bookingpage() {

  const dispatch = useDispatch();
  const { products, total, limit } = useSelector((state) => state.products);
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getProductsThunk({ page, limit }));
  }, [dispatch, page, limit]);

  const totalPages = Math.ceil(total / limit) || 1;

  // Active filter count for badge
  const activeCount = (filters.categories?.length || 0)
    + (filters.brandText?.trim() ? 1 : 0)
    + (filters.minPrice ? 1 : 0)
    + (filters.maxPrice ? 1 : 0)
    + (filters.minDiscount > 0 ? 1 : 0)

  // Client-side filter + search applied on top of paginated data
  const filteredProducts = useMemo(() => {
    let result = products || []

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.title?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      )
    }

    if (filters.categories?.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category))
    }

    if (filters.brandText?.trim()) {
      const b = filters.brandText.trim().toLowerCase()
      result = result.filter(p => p.brand?.toLowerCase().includes(b))
    }

    if (filters.minPrice !== '') {
      result = result.filter(p => p.price >= Number(filters.minPrice))
    }

    if (filters.maxPrice !== '') {
      result = result.filter(p => p.price <= Number(filters.maxPrice))
    }

    if (filters.minDiscount > 0) {
      result = result.filter(p => p.discount >= filters.minDiscount)
    }

    return result
  }, [products, search, filters])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          {/* Search */}
          <div className="relative w-full md:max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-sm border border-gray-300 bg-white py-3 pl-10 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Filter Button */}
          <div className="flex items-center justify-center w-[20%]">
            <button
              onClick={() => setFilterOpen(true)}
              className="relative flex items-center justify-center gap-2 rounded-sm w-full bg-blue-600 px-5 py-3 font-medium text-white cursor-pointer hover:bg-blue-700 transition"
            >
              <SlidersHorizontal size={18} />
              Filter
              {activeCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow">
                  {activeCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <Cards products={filteredProducts} page={page} limit={limit}/>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      {/* Filter Popup */}
      <FilterPage
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </DashboardLayout>
  )
}

export default Bookingpage