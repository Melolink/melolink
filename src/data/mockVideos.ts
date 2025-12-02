// MeloLink FULL INTEGRATION (Frontend + Backend API + Prisma Models)
// This file is a structured blueprint containing:
// 1) Mock Data Integration
// 2) Prisma Schema (DB models)
// 3) API Routes for Posts, Likes, Comments, Follow, Profile
// 4) Next.js Frontend Integration (Feed, Profile Page, Create Post Modal)
// 5) Hooks + Actions
// NOTE: Split these sections into their proper folders when building your real app.

/* -------------------------------------------------------------------------- */
/*                            1. MOCK VIDEOS (FE)                             */
/* -------------------------------------------------------------------------- */
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

/* -------------------------------------------------------------------------- */
/*                              2. PRISMA SCHEMA                              */
/* -------------------------------------------------------------------------- */
// Save inside prisma/schema.prisma

/*
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id         String   @id @default(cuid())
  fullName   String
  username   String   @unique
  email      String?  @unique
  bio        String?
  avatarUrl  String?
  bannerUrl  String?
  followers  Int      @default(0)
  following  Int      @default(0)
  posts      Post[]
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model Post {
  id        String    @id @default(cuid())
  user      User      @relation(fields: [userId], references: [id])
  userId    String
  caption   String?
  mediaUrl  String?
  type      String?
  likes     Int       @default(0)
  shares    Int       @default(0)
  comments  Comment[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Comment {
  id        String   @id @default(cuid())
  post      Post     @relation(fields: [postId], references: [id])
  postId    String
  userId    String
  text      String
  parentId  String?
  createdAt DateTime @default(now())
}

model Follow {
  id          String  @id @default(cuid())
  followerId  String
  followingId String
  createdAt   DateTime @default(now())
}

model Like {
  id      String @id @default(cuid())
  postId  String
  userId  String
  createdAt DateTime @default(now())
}
*/

/* -------------------------------------------------------------------------- */
/*                         3. API ROUTES (Next.js /api)                       */
/* -------------------------------------------------------------------------- */
// These go inside app/api/... folders

/* ----------------------------- CREATE POST API ----------------------------- */
// app/api/posts/route.ts
export const createPostAPI = `import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const post = await prisma.post.create({
    data: body,
  });
  return NextResponse.json(post);
}`;

/* ------------------------------- GET POSTS -------------------------------- */
// app/api/posts/all/route.ts
export const getPostsAPI = `import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
      comments: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}`;

/* ------------------------------- LIKE POST -------------------------------- */
// app/api/posts/like/route.ts
export const likePostAPI = `import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { postId, userId } = await req.json();

  await prisma.like.create({ data: { postId, userId } });
  await prisma.post.update({
    where: { id: postId },
    data: { likes: { increment: 1 } },
  });

  return NextResponse.json({ success: true });
}`;

/* ------------------------------- ADD COMMENT ------------------------------- */
export const commentAPI = `import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const comment = await prisma.comment.create({ data: body });
  return NextResponse.json(comment);
}`;

/* ------------------------------- FOLLOW USER ------------------------------- */
export const followAPI = `import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { followerId, followingId } = await req.json();

  await prisma.follow.create({ data: { followerId, followingId } });

  return NextResponse.json({ success: true });
}`;

/* -------------------------------------------------------------------------- */
/*                   4. NEXT.JS FEED PAGE — FETCH FROM DB                     */
/* -------------------------------------------------------------------------- */
export const feedPage = `"use client";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function FeedPage() {
  const { data: posts, mutate } = useSWR("/api/posts/all", fetcher);

  if (!posts) return <p>Loading...</p>;

  return (
    <div>
      {posts.map((p) => (
        <div key={p.id} className="bg-white rounded-xl shadow p-4 mb-6">
          <video src={p.mediaUrl} controls className="w-full h-72 object-cover rounded" />
          <p className="text-gray-800 mt-3">{p.caption}</p>
        </div>
      ))}
    </div>
  );
}`;

/* -------------------------------------------------------------------------- */
/*                      5. NEXT.JS PROFILE PAGE WITH BANNER                    */
/* -------------------------------------------------------------------------- */
export const profilePage = `export default function ProfilePage({ user }) {
  return (
    <div>
      <div className="h-48 bg-gray-300 w-full relative">
        {user.bannerUrl && (
          <img src={user.bannerUrl} className="w-full h-full object-cover" />
        )}
        <img
          src={user.avatarUrl}
          className="w-32 h-32 rounded-full border-4 border-white absolute -bottom-16 left-6 object-cover"
        />
      </div>

      <div className="mt-20 px-6">
        <h1 className="text-2xl font-semibold">{user.fullName}</h1>
        <p className="text-gray-500">@{user.username}</p>
        <p className="mt-3 text-gray-700">{user.bio}</p>
      </div>
    </div>
  );
}`;

/* -------------------------------------------------------------------------- */
/*                       6. CREATE POST MODAL INTEGRATION                      */
/* -------------------------------------------------------------------------- */
export const createPostModal = `function CreatePost({ open, onClose }) {
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);

  const submitPost = async () => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ caption, mediaUrl: '/videos/sample.mp4' }),
    });
  };

  return (
    <div>Modal</div>
  );
}`;

// END OF BLUEPRINT FILE
