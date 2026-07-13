'use client'
import React from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

function Pagination({ currentPage, totalPages, onPageChange }) {
  
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4  px-4 py-4 sm:flex-row sm:px-6 rounded-2xl shadow-sm bg-white">

      <div className="flex items-center justify-between gap-6 w-full  space-x-2">
      
        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
          title="Previous Page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Page Buttons numbers */}
        <div className="flex items-center space-x-1">
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="inline-flex h-12 w-12 items-center justify-center text-sm font-medium text-gray-400"
                >
                  ...
                </span>
              );
            }

            const isActive = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`inline-flex h-12 w-12 items-center justify-center rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'z-10 bg-blue-600 text-white shadow-sm hover:bg-blue-700'
                    : 'border border-transparent bg-white text-gray-600 hover:border-gray-200 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex h-12 w-12 items-center justify-center cursor-pointer rounded-lg border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
          title="Next Page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

      </div>
    </div>
  );
}

export default Pagination