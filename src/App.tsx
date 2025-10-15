import React, { useState } from "react";
import {
  Search,
  Menu,
  User,
  Bell,
  MessageCircle,
  Calendar,
  MapPin,
  Star,
  Play,
  Heart,
  Filter,
} from "lucide-react";
import AnchorMusicLanding from "./components/AnchorMusicLanding";
import SearchPage from "./components/SearchPage";
import ProfilePage from "./components/ProfilePage";
import JobsPage from "./components/JobsPage";
import Dashboard from "./components/Dashboard";
import UserSettings from "./components/UserSettings";
import Header from "./components/Header";
import { MusicianProfile, JobPosting } from "./types";
import NotFound from "./Pages/NotFoundPage";

// ❌ Remove this extra default export
// export default function NotFoundPage() {
//   return <NotFound />;
// }

// ✅ Instead, define NotFoundPage as a normal component
function NotFoundPage() {
  return <NotFound />;
}

function App() {
  const [currentPage, setCurrentPage] = useState<
    "welcome" | "search" | "profile" | "jobs" | "dashboard" | "settings" | "404"
  >("welcome");
  const [selectedProfile, setSelectedProfile] =
    useState<MusicianProfile | null>(null);
  const [userType, setUserType] = useState<"client" | "musician" | "admin">(
    "client"
  );
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const handleProfileSelect = (profile: MusicianProfile) => {
    setSelectedProfile(profile);
    setCurrentPage("profile");
  };

  const handleBack = () => {
    setCurrentPage("search");
    setSelectedProfile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {loggedIn && (
        <Header
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          userType={userType}
          onUserTypeChange={setUserType}
        />
      )}

      <main className="pt-16">
        {!loggedIn && currentPage === "welcome" && (
          <AnchorMusicLanding
            onClose={() => {}}
            onAuthSuccess={() => {
              setLoggedIn(true);
              setCurrentPage("search");
            }}
          />
        )}

        {currentPage === "search" && (
          <SearchPage onProfileSelect={handleProfileSelect} />
        )}

        {currentPage === "profile" && selectedProfile && (
          <ProfilePage
            profile={selectedProfile}
            onBack={handleBack}
            userType={userType}
          />
        )}

        {currentPage === "jobs" && <JobsPage userType={userType} />}

        {currentPage === "dashboard" && <Dashboard userType={userType} />}

        {currentPage === "settings" && (
          <UserSettings
            initial={JSON.parse(localStorage.getItem("userProfile") || "{}")}
            onSave={(data) => {
              localStorage.setItem("userProfile", JSON.stringify(data));
            }}
          />
        )}

        {currentPage === "404" && <NotFoundPage />}
      </main>
    </div>
  );
}

export default App;
