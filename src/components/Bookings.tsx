import React, { useState } from "react";
import { Calendar, User, Clock, MapPin, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const bookingsData = [
  { id: 1, artist: "Artist A", date: "Jan 20, 2025", time: "7:30 PM", venue: "Lagos, Nigeria", status: "Pending" },
  { id: 2, artist: "Artist B", date: "Feb 10, 2025", time: "6:00 PM", venue: "Abuja, Nigeria", status: "Approved" },
  { id: 3, artist: "Artist C", date: "Mar 5, 2025", time: "8:00 PM", venue: "Port Harcourt, Nigeria", status: "Completed" },
];

export default function BookingUI() {
  const [filter, setFilter] = useState("All");

  const filteredBookings =
    filter === "All" ? bookingsData : bookingsData.filter(b => b.status === filter);

  return (
    <div className="w-full min-h-screen bg-white text-black p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">My Bookings</h1>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          {['All', 'Pending', 'Approved', 'Completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl font-semibold transition border ${
                filter === status
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Booking Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredBookings.map(booking => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <User className="text-purple-500" /> {booking.artist}
                </h2>
                <span
                  className={`text-sm px-2 py-1 rounded-xl ${
                    booking.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                    booking.status === 'Approved' ? 'bg-green-200 text-green-800' :
                    'bg-blue-200 text-blue-800'
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="space-y-2 text-gray-700">
                <div className="flex items-center gap-2"><Calendar size={18} /> Date: {booking.date}</div>
                <div className="flex items-center gap-2"><Clock size={18} /> Time: {booking.time}</div>
                <div className="flex items-center gap-2"><MapPin size={18} /> Venue: {booking.venue}</div>
              </div>

              <div className="pt-4 flex justify-end">
                <button className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl flex items-center gap-2 px-4 py-2">
                  View Details <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
