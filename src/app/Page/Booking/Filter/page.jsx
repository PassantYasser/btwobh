'use client'
import React from 'react'
import { X, RotateCcw } from 'lucide-react'

const CATEGORIES = ['Electronics', 'Fashion', 'Books', 'Sports', 'Furniture', 'Home']
const BRANDS = ['Sony', 'Logitech', 'Apple', 'HP', 'Anker', 'Nike', 'Zara', 'Adidas', 'H&M', 'Tommy Hilfiger', "O'Reilly", 'Manning', 'Pearson', 'Reebok', 'Spalding', 'Decathlon', 'JBL', 'Samsung', 'IKEA', 'Philips', 'Tefal', 'Dyson', 'Canon']

function FilterPage({ isOpen, onClose, filters, setFilters }) {

  const toggleItem = (key, value) => {
    setFilters(prev => {
      const current = prev[key] || []
      return {
        ...prev,
        [key]: current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value]
      }
    })
  }

  const handleReset = () => {
    setFilters({
      categories: [],
      brandText: '',
      minPrice: '',
      maxPrice: '',
      minDiscount: 0,
    })
  }

  const activeCount = (filters.categories?.length || 0)
    + (filters.brandText?.trim() ? 1 : 0)
    + (filters.minPrice ? 1 : 0)
    + (filters.maxPrice ? 1 : 0)
    + (filters.minDiscount > 0 ? 1 : 0)

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div className={`fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}  >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
            {activeCount > 0 && (
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                {activeCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {activeCount > 0 && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <RotateCcw size={14} />
                Reset
              </button>
            )}
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

          {/* Category */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Category
            </h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => {
                const active = filters.categories?.includes(cat)
                return (
                  <button
                    key={cat}
                    onClick={() => toggleItem('categories', cat)}
                    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                      active
                        ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-blue-400 hover:text-blue-600'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Brand */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Brand
            </h3>
            <input
              type="text"
              value={filters.brandText || ''}
              onChange={e => setFilters(prev => ({ ...prev, brandText: e.target.value }))}
              placeholder="e.g. Sony, Apple, Nike..."
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-gray-400"
            />
          </div>

          {/* Price Range */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Price Range ($)
            </h3>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  min={0}
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={e => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                  className="w-full rounded-lg border border-gray-200 py-2.5 pl-7 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <span className="text-gray-400 font-medium">–</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  min={0}
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={e => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                  className="w-full rounded-lg border border-gray-200 py-2.5 pl-7 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>

          {/* Minimum Discount */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                Min. Discount
              </h3>
              <span className="text-sm font-bold text-blue-600">{filters.minDiscount || 0}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={5}
              value={filters.minDiscount || 0}
              onChange={e => setFilters(prev => ({ ...prev, minDiscount: Number(e.target.value) }))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-400">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-100 px-6 py-5">
          <button
            onClick={onClose}
            className="w-full rounded-sm bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Apply Filters {activeCount > 0 && `(${activeCount} active)`}
          </button>
        </div>
      </div>
    </>
  )
}

export default FilterPage