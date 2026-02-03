"use client";
// ...existing code...
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 text-xl font-bold text-blue-600">
            <Link href="/">MyApp</Link>
          </div>
          <div className="flex-1 flex justify-center px-2">
            <form
              className="w-full max-w-xs hidden md:block mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="/about" className="hover:text-blue-600">
              About
            </Link>
            <Link href="/contact" className="hover:text-blue-600">
              Contact
            </Link>
            <Link href="/login" className="hover:text-blue-600">
              Login
            </Link>
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setShowMobileSearch((v) => !v)}
              className="text-gray-700 focus:outline-none"
              aria-label="Toggle search"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {(showMobileSearch || open) && (
        <div className="md:hidden bg-white shadow-lg">
          {showMobileSearch && (
            <form className="px-2 pt-2 pb-2" onSubmit={e => { e.preventDefault(); setShowMobileSearch(false); }}>
              <div className="relative mb-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  autoFocus
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                  </svg>
                </button>
              </div>
            </form>
          )}
          {open && (
            <div className="px-2 pb-3 space-y-1 flex flex-col">
              <Link href="/" className="py-2 px-4 hover:text-blue-600">
                Home
              </Link>
              <Link href="/about" className="py-2 px-4 hover:text-blue-600">
                About
              </Link>
              <Link href="/contact" className="py-2 px-4 hover:text-blue-600">
                Contact
              </Link>
              <Link href="/auth/login" className="py-2 px-4 hover:text-blue-600">
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
