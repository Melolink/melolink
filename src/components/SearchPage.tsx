'use client';
import React, { useState, useRef } from "react";
import {
  CheckCircle,
  Heart,
  MessageCircle,
  Share2,
  UserPlus,
  Video,
  Filter,
  Search,
  X,
} from "lucide-react";

// Type for video post
interface VideoPost {
  id: string;
  videoUrl: string;
  caption: string;
  user: {
    name: string;
    username: string;
    verified: boolean;
    profileImage: string;
    followers: number;
  };
  likes: number;
  comments: number;
  shares: number;
}

// Sample data
const mockVideos: VideoPost[] = [
  {
    id: "1",
    videoUrl: "/videos/performance1.mp4",
    caption: "🔥 Live Afrobeat Jam — Lagos City Festival!",
    user: {
      name: "DJ Tempo",
      username: "tempoofficial",
      verified: true,
      profileImage: "/images/dj.jpg",
      followers: 4200,
    },
    likes: 340,
    comments: 58,
    shares: 23,
  },
  {
    id: "2",
    videoUrl: "/videos/live_sax.mp4",
    caption: "Saxophone Solo vibes 🎷 — sweet melody from Grace",
    user: {
      name: "Grace Melody",
      username: "gracemelody",
      verified: false,
      profileImage: "/images/grace.jpg",
      followers: 950,
    },
    likes: 210,
    comments: 32,
    shares: 14,
  },
  {
    id: "3",
    videoUrl: "/videos/live_band.mp4",
    caption: "Owambe groove by The BandMasters 💃🏽🥁",
    user: {
      name: "The BandMasters",
      username: "bandmasters",
      verified: true,
      profileImage: "/images/band.jpg",
      followers: 6200,
    },
    likes: 520,
    comments: 77,
    shares: 35,
  },
];

const SearchPage = () => {
  const [videos, setVideos] = useState<VideoPost[]>(mockVideos);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({ caption: "", videoUrl: "" });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle video upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const videoPreview = URL.createObjectURL(file);
      setNewPost((prev) => ({ ...prev, videoUrl: videoPreview }));
    }
  };

  // Add a new post
  const handleCreatePost = () => {
    if (!newPost.caption || !newPost.videoUrl) {
      alert("Please add a caption and upload a video");
      return;
    }

    const newVideo: VideoPost = {
      id: (videos.length + 1).toString(),
      videoUrl: newPost.videoUrl,
      caption: newPost.caption,
      user: {
        name: "HabDev",
        username: "habdev",
        verified: true,
        profileImage: "/images/profile.jpg",
        followers: 1200,
      },
      likes: 0,
      comments: 0,
      shares: 0,
    };

    setVideos([newVideo, ...videos]);
    setNewPost({ caption: "", videoUrl: "" });
    setShowModal(false);
  };

  // Filter search
  const filteredVideos = videos.filter(
    (v) =>
      v.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          Discover{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Stage Performances
          </span>
        </h1>
        <p className="text-gray-600 mt-2">
          Watch, follow, and enjoy live performances from top musicians 🎶
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow p-4 flex items-center mb-4">
        <Search className="w-5 h-5 text-gray-400 ml-2" />
        <input
          type="text"
          placeholder="Search performances or musicians..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 pl-3 border-none outline-none text-gray-700 bg-transparent"
        />
        <Filter className="w-5 h-5 text-gray-500" />
      </div>

      {/* Create Post Button (Moved under Search) */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition font-medium shadow"
        >
          <Video className="w-5 h-5" /> Create Post
        </button>
      </div>

      {/* Video Feed */}
      <div className="space-y-8">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <video
                src={video.videoUrl}
                controls
                className="w-full h-72 object-cover bg-black"
              />
              <div className="p-5">
                {/* User Info */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={video.user.profileImage}
                      alt={video.user.name}
                      className="w-12 h-12 rounded-full border object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <h2 className="font-semibold text-gray-900">
                          {video.user.name}
                        </h2>
                        {video.user.verified && (
                          <CheckCircle className="text-blue-500 w-4 h-4" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        @{video.user.username}
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-sm transition">
                    <UserPlus className="w-4 h-4" /> Follow
                  </button>
                </div>

                {/* Caption */}
                <p className="text-gray-800 mb-3">{video.caption}</p>

                {/* Reactions */}
                <div className="flex justify-between text-sm text-gray-600 border-t pt-3">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition">
                    <Heart className="w-4 h-4" /> {video.likes}
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition">
                    <MessageCircle className="w-4 h-4" /> {video.comments}
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-green-600 transition">
                    <Share2 className="w-4 h-4" /> {video.shares}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No results found.</p>
        )}
      </div>

      {/* Create Post Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Create New Post
            </h2>

            <textarea
              placeholder="Write a caption..."
              value={newPost.caption}
              onChange={(e) =>
                setNewPost((prev) => ({ ...prev, caption: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4 resize-none"
              rows={3}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50"
            >
              {newPost.videoUrl ? (
                <video
                  src={newPost.videoUrl}
                  controls
                  className="w-full h-56 object-cover rounded-lg"
                />
              ) : (
                <p className="text-gray-500">
                  Click to upload a performance video 🎥
                </p>
              )}
              <input
                type="file"
                accept="video/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <button
              onClick={handleCreatePost}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
            >
              Post Video
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
