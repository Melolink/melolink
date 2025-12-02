import React from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";

interface PostProps {
  id: number;
  type: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  thumbnail?: string;
  songTitle?: string;
  duration?: string;
  onLike: (id: number) => void;
  onComment: (id: number) => void;
  onShare: (id: number) => void;
}

const Post: React.FC<PostProps> = ({ id, type, content, timestamp, likes, comments, shares, liked, thumbnail, songTitle, duration, onLike, onComment, onShare }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            {/* could be profile pic */}
          </div>
          <div>
            <h3 className="font-semibold">Alex Rivera</h3>
            <p className="text-xs text-gray-500">{timestamp}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full"><MoreHorizontal className="w-5 h-5 text-gray-600" /></button>
      </div>

      {/* Content */}
      <div className="px-4 pb-3"><p className="text-gray-900">{content}</p></div>

      {/* Actions */}
      <div className="px-4 py-2">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{likes} likes</span>
          <span>{comments} comments · {shares} shares</span>
        </div>
        <div className="flex gap-1 pt-2 border-t border-gray-200">
          <button onClick={() => onLike(id)} className={`flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-lg transition ${liked ? 'text-blue-600' : ''}`}>
            <Heart className="w-5 h-5" />
            <span className="font-semibold">Like</span>
          </button>
          <button onClick={() => onComment(id)} className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-lg transition">
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold">Comment</span>
          </button>
          <button onClick={() => onShare(id)} className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-lg transition">
            <Share2 className="w-5 h-5" />
            <span className="font-semibold">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
