'use client';
import React from "react";
import { CheckCircle, Heart, MessageCircle, Share2, UserPlus } from "lucide-react";

export const mockVideos = [
  {
    id: '1',
    videoUrl: '/videos/performance1.mp4',
    caption: 'Live performance at Lagos Jazz Fest 🎶',
    user: {
      name: 'DJ SpinMaster',
      username: 'spinmaster',
      verified: true,
      profileImage: '/images/dj.jpg',
      followers: 3200,
    },
    likes: 250,
    comments: 48,
    shares: 12,
  },
  {
    id: '2',
    videoUrl: '/videos/sax_solo.mp4',
    caption: 'Sax solo magic on stage! 🎷🔥',
    user: {
      name: 'Grace Melody',
      username: 'grace_melody',
      verified: false,
      profileImage: '/images/grace.jpg',
      followers: 850,
    },
    likes: 190,
    comments: 22,
    shares: 9,
  },
];

const VideoFeed = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      {mockVideos.map((video) => (
        <div
          key={video.id}
          className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
        >
          {/* Video Section */}
          <video
            src={video.videoUrl}
            controls
            className="w-full h-72 object-cover bg-black"
          />

          {/* Video Info */}
          <div className="p-4">
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
                  <p className="text-sm text-gray-500">@{video.user.username}</p>
                </div>
              </div>
              <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm">
                <UserPlus className="w-4 h-4" />
              </button>
            </div>

            <p className="text-gray-800 mb-3">{video.caption}</p>

            <div className="flex justify-between text-sm text-gray-600 border-t pt-2">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" /> {video.likes}
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" /> {video.comments}
              </div>
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4" /> {video.shares}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;
