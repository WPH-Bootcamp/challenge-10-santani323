"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import Form from "@/components/ui/Form";
import { useUser } from "@/hooks/useUser";
import { getInitials } from "@/lib/formater";
import ChangePassword from "@/components/profile/changePassword";
import YourPost from "@/components/profile/yourPost";
import EditProfile from "@/components/profile/editProfile";

type ActiveTab = "posts" | "profile" | "password";

export default function ProfilePage() {
  const { fetchUserProfile, user, loading: userLoading } = useUser();
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("posts");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    headline: "",
  });
  const [editMessage, setEditMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);
    if (currentToken) {
      fetchUserProfile();
    }
  }, [fetchUserProfile]);

  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || "",
        headline: user.headline || "",
      });
    }
  }, [user]);

  const initials = useMemo(() => getInitials(user?.name), [user?.name]);

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setEditMessage("Profile berhasil diperbarui!");
      setIsEditing(false);
      setIsLoading(false);
      setTimeout(() => setEditMessage(null), 3000);
    }, 1000);
  };

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
                    {user?.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-semibold border-4 border-blue-300">
                        {initials || "JD"}
                      </div>
                    )}
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {user?.name ?? "John Doe"}
                      </h1>
                      <p className="text-gray-600 mt-1">
                        {user?.headline ?? "Frontend Developer"}
                      </p>
                      {user?.email && (
                        <p className="text-sm text-gray-500 mt-1">
                          {user.email}
                        </p>
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
