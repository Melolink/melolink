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

// ---------------------------
// TYPES
// ---------------------------
interface Comment {
  id: string;
  user: string;
  text: string;
}

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
  comments: Comment[];
  shares: number;
  isLiked?: boolean;
  isFollowing?: boolean;
}

// ---------------------------
// SAMPLE DATA
// ---------------------------
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
    comments: [],
    shares: 23,
    isLiked: false,
    isFollowing: false,
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
    comments: [],
    shares: 14,
    isLiked: false,
    isFollowing: false,
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
    comments: [],
    shares: 35,
    isLiked: false,
    isFollowing: false,
  },
];

// ---------------------------
// MAIN COMPONENT
// ---------------------------
const SearchPage = () => {
  const [videos, setVideos] = useState<VideoPost[]>(mockVideos);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [activePost, setActivePost] = useState<VideoPost | null>(null);
  const [newComment, setNewComment] = useState("");

  // ---------------------------
  // LIKE TOGGLE
  // ---------------------------
  const toggleLike = (id: string) => {
    setVideos((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  // ---------------------------
  // FOLLOW TOGGLE
  // ---------------------------
  const toggleFollow = (id: string) => {
    setVideos((prev) =>
      prev.map((post) =>
        post.id === id
          ? { ...post, isFollowing: !post.isFollowing }
          : post
      )
    );
  };

  // ---------------------------
  // SHARE COUNT (Simple Increment)
  // ---------------------------
  const incrementShare = (id: string) => {
    setVideos((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, shares: post.shares + 1 } : post
      )
    );
  };

  const openComments = (post: VideoPost) => {
    setActivePost(post);
    setShowCommentModal(true);
  };

  const addComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: "You",
      text: newComment,
    };

    setVideos((prev) =>
      prev.map((post) =>
        post.id === activePost?.id
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );

    setActivePost((prev) =>
      prev
        ? { ...prev, comments: [...prev.comments, comment] }
        : prev
    );

    setNewComment("");
  };

  // FILTER
  const filteredVideos = videos.filter(
    (v) =>
      v.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* SEARCH BAR */}
      <div className="bg-white rounded-2xl shadow p-4 flex items-center mb-6">
        <Search className="w-5 h-5 text-gray-400 ml-2" />
        <input
          type="text"
          placeholder="Search performances or musicians..."
          className="flex-1 pl-3 border-none outline-none text-gray-700"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="w-5 h-5 text-gray-500" />
      </div>

      {/* POSTS */}
      <div className="space-y-8">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-0 overflow-hidden"
          >
            {/* VIDEO */}
            <video
              src={video.videoUrl}
              controls
              className="w-full aspect-video bg-black object-cover"
            />

            {/* CONTENT */}
            <div className="p-5">

              {/* USER */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={video.user.profileImage}
                    className="w-14 h-14 rounded-full object-cover"
                  />

                  <div>
                    <div className="flex items-center gap-1">
                      <p className="font-semibold">{video.user.name}</p>
                      {video.user.verified && (
                        <CheckCircle className="text-blue-500 w-4 h-4" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">@{video.user.username}</p>
                  </div>
                </div>

                {/* FOLLOW BUTTON */}
                <button
                  onClick={() => toggleFollow(video.id)}
                  className={`px-4 py-2 rounded-full text-sm transition ${
                    video.isFollowing
                      ? "bg-gray-200 text-gray-700"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {video.isFollowing ? "Following" : "Follow"}
                </button>
              </div>

              {/* CAPTION */}
              <p className="text-gray-800 mb-4 line-clamp-2">{video.caption}</p>

              {/* ACTION BUTTONS */}
              <div className="flex justify-between border-t pt-4 text-gray-600">

                {/* LIKE */}
                <div
                  onClick={() => toggleLike(video.id)}
                  className="flex items-center gap-2 cursor-pointer hover:text-red-500"
                >
                  <Heart
                    className={`w-5 h-2 ${
                      video.isLiked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  {video.likes}
                </div>

                {/* COMMENTS */}
                <div
                  onClick={() => openComments(video)}
                  className="flex items-center gap-2 cursor-pointer hover:text-blue-600"
                >
                  <MessageCircle className="w-5 h-5" />
                  {video.comments.length}
                </div>

                {/* SHARE */}
                <div
                  onClick={() => incrementShare(video.id)}
                  className="flex items-center gap-2 cursor-pointer hover:text-green-600"
                >
                  <Share2 className="w-5 h-5" />
                  {video.shares}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* -------------------------------- */}
      {/* COMMENT MODAL */}
      {/* -------------------------------- */}
      {showCommentModal && activePost && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative">

            <button
              className="absolute top-4 right-4 text-gray-600"
              onClick={() => setShowCommentModal(false)}
            >
              <X />
            </button>

            <h2 className="text-2xl font-semibold mb-4">Comments</h2>

            {/* EXISTING COMMENTS */}
            <div className="space-y-4 mb-4 max-h-72 overflow-auto">
              {activePost.comments.length > 0 ? (
                activePost.comments.map((c) => (
                  <div key={c.id} className="p-3 bg-gray-100 rounded-lg">
                    <p className="font-semibold text-sm">{c.user}</p>
                    <p>{c.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No comments yet.</p>
              )}
            </div>

            {/* ADD COMMENT */}
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              className="w-full border rounded-lg p-3 outline-none mb-3"
              placeholder="Write a comment..."
            />

            <button
              onClick={addComment}
              className="w-full bg-blue-600 text-white p-3 rounded-lg"
            >
              Post Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
