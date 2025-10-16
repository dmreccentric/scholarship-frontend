"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string; // Optional: defaults to current path
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  const pathname = usePathname();
  const path = basePath || pathname;

  if (totalPages <= 1) return null;

  return (
    <nav
      className="flex justify-center items-center gap-2 mt-10 flex-wrap"
      aria-label="Pagination Navigation"
    >
      {/* Previous Button */}
      {currentPage > 1 && (
        <Link
          href={`${path}?page=${currentPage - 1}`}
          className="px-4 py-2 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Previous Page"
        >
          Previous
        </Link>
      )}

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => {
        if (
          num === 1 ||
          num === totalPages ||
          Math.abs(num - currentPage) <= 1
        ) {
          return (
            <Link
              key={num}
              href={`${path}?page=${num}`}
              aria-current={num === currentPage ? "page" : undefined}
              className={`px-3 py-1 rounded-md border transition ${
                num === currentPage
                  ? "bg-gray-800 text-white dark:bg-gray-100 dark:text-gray-900"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {num}
            </Link>
          );
        }

        // Ellipsis
        if (
          (num === currentPage - 2 && num > 1) ||
          (num === currentPage + 2 && num < totalPages)
        ) {
          return (
            <span
              key={`ellipsis-${num}`}
              className="px-2 text-gray-500 select-none"
              aria-hidden="true"
            >
              ...
            </span>
          );
        }

        return null;
      })}

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link
          href={`${path}?page=${currentPage + 1}`}
          className="px-4 py-2 border rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Next Page"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
