"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import Form from "@/components/ui/Form";
import { useUser } from "@/hooks/useUser";
import { getInitials } from "@/lib/formater";
import ChangePassword from "@/components/profile/ChangePassword";
import YourPost from "@/components/profile/YourPost";
import EditProfile from "@/components/profile/EditProfile";
import type { ProfileState } from "@/types/users";

type ActiveTab = "posts" | "profile" | "password";

export default function ProfilePage() {
  const { fetchUserProfile, loading } = useUser();
  const [token, setToken] = useState<string | null>(null);
  const { username, avatarUrl, email, name, headline } = useSelector(
    (state: { profile: ProfileState }) => state.profile,
  );
  const [activeTab, setActiveTab] = useState<ActiveTab>("posts");

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);
    if (currentToken) {
      fetchUserProfile();
    }
  }, [fetchUserProfile]);

  const initials = useMemo(() => getInitials(name), [name]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-4">
          {!token && (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-700">
                Silakan login untuk melihat profil.
              </p>
              <div className="mt-4 flex justify-center">
                <Link
                  href="/login"
                  className="bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600"
                >
                  Login
                </Link>
              </div>
            </div>
          )}

          {token && (
            <>
              {/* Profile Header */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  <div className="flex items-center gap-4">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={username || "User Avatar"}
                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-semibold border-4 border-blue-300">
                        {initials || "JD"}
                      </div>
                    )}
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {username ?? "John Doe"}
                      </h1>
                      <p className="text-gray-600 mt-1">
                        {headline ?? "Frontend Developer"}
                      </p>
                      {email && (
                        <p className="text-sm text-gray-500 mt-1">{email}</p>
                      )}
                    </div>
                  </div>
                  <EditProfile />
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-xl shadow-sm mb-6">
                <div className="border-b border-gray-100 px-6">
                  <div className="flex items-center gap-8">
                    <button
                      type="button"
                      onClick={() => setActiveTab("posts")}
                      className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === "posts"
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      Your Posts
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("password")}
                      className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === "password"
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      Change Password
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {/* Posts Tab */}
                  {activeTab === "posts" && <YourPost />}

                  {/* Change Password Tab */}
                  {activeTab === "password" && <ChangePassword />}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
