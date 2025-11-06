'use client';
import React from 'react';
import { CheckCircle, Heart, MessageCircle, Share2, UserPlus } from 'lucide-react';

type User = {
  name: string;
  username: string;
  verified: boolean;
  profileImage: string;
  followers: number;
};

type Video = {
  id: string;
  videoUrl: string;
  caption: string;
  user: User;
  likes: number;
  comments: number;
  shares: number;
};

type Props = {
  video: Video;
};

const VideoPost: React.FC<Props> = ({ video }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Video */}
      <video
        src={video.videoUrl}
        controls
        className="w-full h-72 object-cover bg-black"
      ></video>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={video.user.profileImage}
              alt={video.user.name}
              className="w-12 h-12 rounded-full object-cover border"
            />
            <div>
              <div className="flex items-center gap-1">
                <h2 className="font-semibold text-gray-900">{video.user.name}</h2>
                {video.user.verified && (
                  <CheckCircle className="text-blue-500 w-4 h-4" />
                )}
              </div>
              <p className="text-sm text-gray-500">@{video.user.username}</p>
            </div>
          </div>
          <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm">
            <UserPlus className="w-4 h-4" /> Follow
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
  );
};

export default VideoPost;
