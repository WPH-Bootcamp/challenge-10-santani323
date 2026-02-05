"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import type { NavbarProps } from "@/types/navigate";
import { useSelector } from "react-redux";
import type { ProfileState } from "@/types/users";
import { getInitials } from "@/lib/formater";
import Logo from "@/assets/Logo.svg"


export default function Navbar({ back = false, title = "Back" }: NavbarProps) {
  const { fetchUserProfile, user } = useUser();
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [mobileSearchKeyword, setMobileSearchKeyword] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();
  const { username, avatarUrl, email, name, headline } = useSelector(
    (state: { profile: ProfileState }) => state.profile,
  );

  const initials = useMemo(() => getInitials(name), [name]);
  // Check token on mount

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      fetchUserProfile();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setShowUserMenu(false);
    router.push("/");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 text-xl font-bold text-blue-600">
            {back ? (
              <button
                type="button"
                onClick={() => router.back()}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                aria-label="Back"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="text-base font-semibold">{title}</span>
              </button>
            ) : (
              <Link href="/" className="flex items-center">
                <div className="relative w-20 h-20 sm:w-20 sm:h-20 md:w-30 md:h-20 flex items-center">
                  <Image
                    src={Logo}
                    alt="Logo"
                    fill
                    className="object-contain mr-2"
                    priority
                  />
                </div>
              </Link>
            )}
          </div>
          {!back && (
            <div className="flex-1 flex justify-center px-2">
              <form
                className="w-full max-w-xs hidden md:block mx-auto"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchKeyword.trim()) {
                    router.push(
                      `/search/${encodeURIComponent(searchKeyword.trim())}`,
                    );
                  }
                }}
              >
                <div className="relative flex items-center bg-white rounded-xl border border-gray-200 shadow-sm px-3 py-2 w-full">
                  <span className="text-gray-400 mr-2 flex items-center">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="Frontend Development"
                    className="flex-1 bg-transparent outline-none border-none text-gray-700 placeholder-gray-400 text-base"
                  />
                  {/* No submit button visible, submit on enter */}
                </div>
              </form>
            </div>
          )}

          {/* Menu untuk user yang tidak login */}
          {!token && (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                Register
              </Link>
            </div>
          )}

          {/* Menu untuk user yang sudah login */}
          {token && user && (
            <div className="hidden md:flex items-center space-x-4">
              {title !== "Write" && (
                <Link
                  href="/write"
                  className="flex items-center text-blue-500 hover:text-blue-600 font-medium"
                >
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Write Post
                </Link>
              )}

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={username || "User Avatar"}
                      className="w-10 h-10 rounded-full object-cover border-4 border-blue-500"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-semibold border-4 border-blue-300">
                      {initials || "JD"}
                    </div>
                  )}
                  <span className="text-gray-700 font-medium">{name}</span>
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="md:hidden flex items-center space-x-2">
            {!back && (
              <button
                onClick={() => setShowMobileSearch((v) => !v)}
                className="text-gray-700 focus:outline-none"
                aria-label="Toggle search"
              >
                <svg
                  className="h-6 w-6"
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
            )}
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
      {((!back && showMobileSearch) || open) && (
        <div className="md:hidden bg-white shadow-lg">
          {!back && showMobileSearch && (
            <form
              className="px-2 pt-2 pb-2"
              onSubmit={(e) => {
                e.preventDefault();
                setShowMobileSearch(false);
                if (mobileSearchKeyword.trim()) {
                  router.push(
                    `/search/${encodeURIComponent(mobileSearchKeyword.trim())}`,
                  );
                }
              }}
            >
              <div className="relative flex items-center bg-white rounded-xl border border-gray-200 shadow-sm px-3 py-2 w-full mb-2">
                <span className="text-gray-400 mr-2 flex items-center">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={mobileSearchKeyword}
                  onChange={(e) => setMobileSearchKeyword(e.target.value)}
                  placeholder="Frontend Development"
                  className="flex-1 bg-transparent outline-none border-none text-gray-700 placeholder-gray-400 text-base"
                  autoFocus
                />
                {/* No submit button visible, submit on enter */}
              </div>
            </form>
          )}
          {open && (
            <div className="px-2 pb-3 space-y-1 flex flex-col">
              {!token ? (
                <>
                  <Link href="/login" className="py-2 px-4 hover:text-blue-600">
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="py-2 px-4 hover:text-blue-600"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/write" className="py-2 px-4 hover:text-blue-600">
                    Write Post
                  </Link>
                  <Link
                    href="/profile"
                    className="py-2 px-4 hover:text-blue-600"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="py-2 px-4 hover:text-blue-600 text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
