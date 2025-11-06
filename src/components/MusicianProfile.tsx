// import React from "react";
// type Props = {
//   profile: MusicianProfile;
// };

// const MusicianCard: React.FC<Props> = ({ profile }) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
//       <img
//         src={profile.coverImage || "/default-cover.jpg"}
//         alt={`${profile.name} cover`}
//         className="w-full h-40 object-cover"
//       />
//       <div className="p-4">
//         <div className="flex items-center gap-3">
//           <img
//             src={profile.profileImage}
//             alt={profile.name}
//             className="w-14 h-14 rounded-full border-2 border-gray-200"
//           />
//           <div>
//             <h2 className="text-xl font-bold">{profile.name}</h2>
//             <p className="text-sm text-gray-500">{profile.location}</p>
//           </div>
//         </div>

//         <p className="mt-3 text-gray-700 text-sm line-clamp-2">{profile.bio}</p>

//         <div className="mt-3 flex flex-wrap gap-2">
//           {profile.instruments.map((instrument) => (
//             <span
//               key={instrument}
//               className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full"
//             >
//               {instrument}
//             </span>
//           ))}
//         </div>

//         <div className="mt-4 flex justify-between text-sm text-gray-600">
//           <p>⭐ {profile.rating} ({profile.reviewCount} reviews)</p>
//           <p>{profile.completedGigs} gigs completed</p>
//         </div>

//         <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">
//           View Profile
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MusicianCard;
