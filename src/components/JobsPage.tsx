"use client";
import React, { useState } from "react";
import { Edit, LogOut, Settings, Wallet, Check, Upload } from "lucide-react";

const ProfilePageB: React.FC = () => {
  const [user, setUser] = useState({
    name: "David Habakkuk",
    email: "davidhabakkuk984@gmail.com",
    balance: "₦15,000",
    joined: "March 2024",
    image: "https://i.pinimg.com/736x/d3/80/73/d38073328d8dd9a618f9f60686b6e195.jpg",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile saved!");
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        {/* Profile Header */}
        <div className="flex items-center gap-4 border-b pb-4">
          <div className="relative">
            <img
              src={user.image}
              alt={user.name}
              className="w-20 h-20 rounded-full border-4 border-green-500 object-cover"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-green-600 rounded-full p-1 cursor-pointer">
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

          <div className="flex-1">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full border p-1 rounded-md mb-1"
                />
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full border p-1 rounded-md"
                />
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </>
            )}
            <p className="text-xs text-gray-400 mt-1">Joined {user.joined}</p>
          </div>
        </div>

        {/* Wallet Info */}
        <div className="mt-6 bg-green-100 p-4 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Wallet Balance</p>
            <p className="text-2xl font-bold text-green-700">{user.balance}</p>
          </div>
          <Wallet className="w-8 h-8 text-green-600" />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="flex items-center justify-center gap-2 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              <Check className="w-4 h-4" /> Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center gap-2 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              <Edit className="w-4 h-4" /> Edit Profile
            </button>
          )}

          <button className="flex items-center justify-center gap-2 py-2 border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition">
            <Settings className="w-4 h-4" /> Settings
          </button>
          <button className="flex items-center justify-center gap-2 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageB;
