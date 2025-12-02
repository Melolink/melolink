import React, { useState } from 'react';
import { Mail, Phone, MapPin, Music, Award, Calendar, Heart, MessageCircle, Share2, Play, Camera, Video, Users, MoreHorizontal } from 'lucide-react';

export default function FacebookMusicianProfile() {

  const [profilePic, setProfilePic] = useState<string | null>(null);

const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    setProfilePic(URL.createObjectURL(file));
  }
};

  const [posts, setPosts] = useState([
    {
      id: 1,
      type: "video",
      content: "Just finished recording my new single! Can't wait to share it with you all 🎵",
      timestamp: "2 hours ago",
      likes: 234,
      comments: 45,
      shares: 12,
      liked: false,
      thumbnail: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      type: "music",
      content: "Throwback to last night's jazz session at Blue Note. What an amazing crowd! 🎷✨",
      timestamp: "1 day ago",
      likes: 567,
      comments: 89,
      shares: 34,
      liked: false,
      songTitle: "Midnight Blues",
      duration: "3:45",
      thumbnail: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      type: "image",
      content: "Studio vibes today. Working on something special 🎹",
      timestamp: "3 days ago",
      likes: 432,
      comments: 67,
      shares: 23,
      liked: false,
      thumbnail: "from-orange-500 to-red-500"
    },
    {
      id: 4,
      type: "video",
      content: "Behind the scenes of our latest music video shoot! 🎬🎸",
      timestamp: "5 days ago",
      likes: 891,
      comments: 134,
      shares: 56,
      liked: false,
      thumbnail: "from-green-500 to-emerald-500"
    }
  ]);

  const [followed, setFollowed] = useState(false);

  // Toggle like for a post
  const toggleLike = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
    ));
  };

  // Increment comment count (for demo purposes, just increases number)
  const addComment = (id) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, comments: post.comments + 1 } : post
    ));
  };

  // Increment share count
  const sharePost = (id) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, shares: post.shares + 1 } : post
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
     
  

      {/* Cover Photo */}
      <div className="bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="h-80 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative">
            <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:bg-gray-50 transition">
              <Camera className="w-4 h-4" />
              <span className="text-sm font-medium">Edit Cover Photo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Info Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-8 pb-4">
          <div className="relative">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-4 border-white shadow-xl flex items-center justify-center">
              <Music className="w-20 h-20 text-white" />
            </div>
            <button className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition">
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 text-center sm:text-left mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Alex Rivera</h1>
            <p className="text-gray-600">1.2K followers · 834 following</p>
          </div>

          <div className="flex gap-2 mb-2">
            <button 
              onClick={() => setFollowed(!followed)} 
              className={`px-6 py-2 rounded-lg font-semibold ${followed ? 'bg-gray-200 text-gray-900 hover:bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              {followed ? 'Following' : 'Follow'}
            </button>
            <button className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition">Message</button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Sidebar - Intro */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <h2 className="text-xl font-bold mb-4">Intro</h2>
              <p className="text-gray-700 text-center mb-4">Multi-instrumentalist & Producer | Jazz & Blues Enthusiast | Available for Sessions & Live Shows</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600"><Music className="w-4 h-4" /><span>Plays Guitar, Piano, Bass</span></div>
                <div className="flex items-center gap-2 text-gray-600"><Calendar className="w-4 h-4" /><span>12 Years Experience</span></div>
                <div className="flex items-center gap-2 text-gray-600"><MapPin className="w-4 h-4" /><span>Los Angeles, CA</span></div>
                <div className="flex items-center gap-2 text-gray-600"><Mail className="w-4 h-4" /><span>alex.rivera@email.com</span></div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-bold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {["Live Performance", "Studio Recording", "Music Production", "Song Arrangement", "Teaching", "Session Work"].map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Posts */}
          <div className="lg:col-span-2 space-y-4">
            {/* Posts Feed */}
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow">
                {/* Post Header */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      <Music className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Alex Rivera</h3>
                      <p className="text-xs text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-full"><MoreHorizontal className="w-5 h-5 text-gray-600" /></button>
                </div>

                {/* Post Content */}
                <div className="px-4 pb-3">
                  <p className="text-gray-900">{post.content}</p>
                </div>

                {/* Post Actions */}
                <div className="px-4 py-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{post.likes} likes</span>
                    <span>{post.comments} comments · {post.shares} shares</span>
                  </div>
                  <div className="flex gap-1 pt-2 border-t border-gray-200">
                    <button onClick={() => toggleLike(post.id)} className={`flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-lg transition ${post.liked ? 'text-blue-600' : ''}`}>
                      <Heart className="w-5 h-5" />
                      <span className="font-semibold">Like</span>
                    </button>
                    <button onClick={() => addComment(post.id)} className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-lg transition">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-semibold">Comment</span>
                    </button>
                    <button onClick={() => sharePost(post.id)} className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-lg transition">
                      <Share2 className="w-5 h-5" />
                      <span className="font-semibold">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
