"use client";
import React, { useState } from "react";
import { Edit, LogOut, Settings, Wallet, Check, Upload } from "lucide-react";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState({
    name: "David Habakkuk",
    email: "davidhabakkuk984@gmail.com",
    balance: "₦15,000",
    joined: "March 2024",
    image:
      "https://i.pinimg.com/736x/d3/80/73/d38073328d8dd9a618f9f60686b6e195.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    alert("✅ Profile updated successfully!");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUser({ ...user, image: ev.target?.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md border border-green-100 transition-all hover:shadow-2xl">
        {/* Profile Header */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={user.image}
              alt={user.name}
              className="w-28 h-28 rounded-full border-4 border-green-500 object-cover shadow-md"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-green-600 rounded-full p-2 cursor-pointer shadow-md hover:bg-green-700 transition">
                <Upload className="w-4 h-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          <div className="text-center mt-4">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-md mb-2 focus:ring-2 focus:ring-green-400 outline-none text-center"
                />
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-green-400 outline-none text-center"
                />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-gray-500">{user.email}</p>
              </>
            )}
            <p className="text-xs text-gray-400 mt-1">Joined {user.joined}</p>
          </div>
        </div>

        {/* Wallet Info */}
        <div className="mt-6 bg-green-50 p-5 rounded-xl flex items-center justify-between border border-green-100">
          <div>
            <p className="text-sm text-gray-600">Wallet Balance</p>
            <p className="text-3xl font-bold text-green-700 tracking-wide">
              {user.balance}
            </p>
          </div>
          <Wallet className="w-10 h-10 text-green-600" />
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md transition"
            >
              <Check className="w-5 h-5" /> Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md transition"
            >
              <Edit className="w-5 h-5" /> Edit Profile
            </button>
          )}

          <button className="flex items-center justify-center gap-2 py-2.5 border border-green-500 text-green-600 rounded-xl hover:bg-green-50 transition">
            <Settings className="w-5 h-5" /> Settings
          </button>

          <button className="flex items-center justify-center gap-2 py-2.5 border border-red-500 text-red-600 rounded-xl hover:bg-red-50 transition">
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
