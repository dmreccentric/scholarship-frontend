"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Script from "next/script"; // ✅ For schema markup

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ✅ Schema.org markup for Organization */}
      <Script
        id="navbar-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "HS Consultancy Services",
            url: "https://yourdomain.com",
            logo: "https://yourdomain.com/brand-logo.jpg",
            sameAs: [
              "https://instagram.com/yourusername",
              "https://www.facebook.com/consulant.sameera",
              "https://www.tiktok.com/@hs.consultancyservice",
              "https://wa.me/447392893665",
            ],
          }),
        }}
      />

      {/* ✅ Skip to content for accessibility */}
      <a
        href="#main-content"
        className="absolute left-2 top-2 bg-blue-600 text-white px-3 py-1 rounded-md z-50 focus:translate-y-0 -translate-y-12 focus:outline-none"
      >
        Skip to main content
      </a>

      <header
        className="w-full bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-40"
        role="banner"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav
            className="flex items-center justify-between py-4 md:py-5"
            aria-label="Main navigation"
          >
            {/* Brand */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
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

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-6 text-gray-800 dark:text-gray-100 font-medium">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/visas">Visas</Link>
              </li>
              <li>
                <Link href="/testimonials">Testimonials</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <button
                aria-label="Toggle navigation menu"
                onClick={() => setOpen((s) => !s)}
                className="p-2 rounded-md border border-gray-300 dark:border-gray-600"
              >
                {open ? (
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
            <ul className="flex flex-col gap-2 py-3 text-gray-800 dark:text-gray-100 font-medium">
              <li>
                <Link href="/" onClick={() => setOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/visas" onClick={() => setOpen(false)}>
                  Visas
                </Link>
              </li>
              <li>
                <Link href="/testimonials" onClick={() => setOpen(false)}>
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
