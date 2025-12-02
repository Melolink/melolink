"use client";
import React, { useState } from "react";
import {
  BarChart3,
  Calendar,
  DollarSign,
  Users,
  Star,
  TrendingUp,
  MessageCircle,
  Settings,
  ChevronRight,
} from "lucide-react";
import ChatSection from "./chat";
import PaymentUI from "./PaymentUI";
import ProfilePage from "./ProfilePage";
import Bookings from "./Bookings";

interface DashboardProps {
  userType: "client" | "musician" | "admin";
}

const Dashboard: React.FC<DashboardProps> = ({ userType }) => {
  const [activeSection, setActiveSection] = useState<
    "overview" | "profile" | "bookings" | "earnings" | "messages" | "settings"
  >("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p
              className={`text-sm mt-1 flex items-center ${
                change > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp className="w-4 h-4 mr-1" />
              {change > 0 ? "+" : ""}
              {change}% from last month
            </p>
          )}
        </div>
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );

  const sidebarItems = {
    client: [
      { key: "overview", label: "Overview", icon: BarChart3 },
      { key: "profile", label: "Profile", icon: Users },
      { key: "bookings", label: "My Bookings", icon: Calendar },
      { key: "earnings", label: "Payments", icon: DollarSign },
      { key: "messages", label: "Messages", icon: MessageCircle },
      { key: "settings", label: "Settings", icon: Settings },
    ],
    musician: [
      { key: "overview", label: "Overview", icon: BarChart3 },
      { key: "profile", label: "Profile", icon: Users },
      { key: "bookings", label: "My Gigs", icon: Calendar },
      { key: "earnings", label: "Earnings", icon: DollarSign },
      { key: "messages", label: "Messages", icon: MessageCircle },
      { key: "settings", label: "Settings", icon: Settings },
    ],
    admin: [
      { key: "overview", label: "Overview", icon: BarChart3 },
      { key: "profile", label: "Users", icon: Users },
      { key: "bookings", label: "All Jobs", icon: Calendar },
      { key: "earnings", label: "Revenue", icon: DollarSign },
      { key: "messages", label: "Support", icon: MessageCircle },
      { key: "settings", label: "Settings", icon: Settings },
    ],
  };

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfilePage />;
      case "messages":
        return <ChatSection />;
      case "earnings":
        return <PaymentUI />;

        case "bookings":
        return <Bookings/>
       
      case "overview":
        return (
          <div className="text-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Bookings"
                value="47"
                change={12}
                icon={Calendar}
                color="bg-purple-100 text-purple-600"
              />
              <StatCard
                title="Total Earnings"
                value="₦345,000"
                change={8}
                icon={DollarSign}
                color="bg-[#C55FFC]/20 text-[#C55FFC]"
              />
              <StatCard
                title="Rating"
                value="4.8"
                change={3}
                icon={Star}
                color="bg-[#FFB347]/20 text-[#FFB347]"
              />
              <StatCard
                title="Profile Views"
                value="1,234"
                change={-2}
                icon={Users}
                color="bg-[#7B2FFC]/20 text-[#7B2FFC]"
              />
            </div>
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6">
              <h2 className="font-semibold text-lg mb-3">Overview Chart</h2>
              <div className="h-64 bg-gray-100 flex items-center justify-center rounded-lg text-gray-500">
                Chart visualization
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white border border-gray-100 rounded-xl shadow-md p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2 capitalize">
              {activeSection}
            </h2>
            <p className="text-gray-500">
              This section is under development. More features coming soon!
            </p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex bg-white overflow-hidden relative">
      {/* Sidebar */}
      <aside
        className={`fixed z-40 h-full w-64 bg-white border-r border-gray-200 text-gray-800 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:static lg:translate-x-0`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h1 className="font-bold text-lg text-[#7B2FFC] capitalize">
            {userType} Dashboard
          </h1>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100%-60px)]">
          {sidebarItems[userType].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => {
                setActiveSection(key as any);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all ${
                activeSection === key
                  ? "bg-[#7B2FFC]/10 text-[#7B2FFC] font-medium shadow-sm"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Sidebar Toggle Handle ( > ) */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gradient-to-r from-[#7B2FFC] via-[#C55FFC] to-[#FFB347] text-white p-2 rounded-r-xl shadow-lg lg:hidden"
      >
        <ChevronRight
          className={`w-5 h-5 transition-transform duration-300 ${
            sidebarOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-6 space-y-6">{renderSection()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
