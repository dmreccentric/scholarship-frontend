"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between py-4 md:py-5">
          {/* Left: Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              {/* Brand Logo */}
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src="/brand-logo.jpg"
                  alt="HS Consultancy Logo"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 120px, 160px"
                />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                HS Consultancy Services
              </span>
            </Link>
            <p className="hidden md:block text-sm text-gray-500 dark:text-gray-300">
              Find opportunities & visa guidance
            </p>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-gray-800 dark:text-gray-100">
            <Link href="/">Home</Link>
            <Link href="/visas">Visa</Link>
            <Link href="/testimonials">Testimonials</Link>
            <Link href="/contact">Contact</Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              aria-label="Toggle navigation"
              onClick={() => setOpen((s) => !s)}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600"
            >
              {open ? (
                // X icon when open
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // Hamburger icon when closed
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 7h16M4 12h16M4 17h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        <div
          className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            open ? "max-h-50" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-2 py-3 text-gray-800 dark:text-gray-100">
            <Link
              href="/"
              className="block py-2"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/visas"
              className="block py-2"
              onClick={() => setOpen(false)}
            >
              Visa
            </Link>
            <Link
              href="/testimonials"
              className="block py-2"
              onClick={() => setOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="/contact"
              className="block py-2"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
