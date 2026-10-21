"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  User,
  ChevronRight,
  Settings,
  HelpCircle,
  LogOut,
  Camera,
  Check,
} from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  avatar: string | null; // base64 data URL
}

const DEFAULT_PROFILE: UserProfile = {
  name: "Guest User",
  email: "guest@stayfinder.com",
  avatar: null,
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load profile from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem("stayfinder_profile");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
      } catch {
        // ignore
      }
    }
  }, []);

  const saveProfile = (updated: UserProfile) => {
    setProfile(updated);
    localStorage.setItem("stayfinder_profile", JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Only allow images
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Limit size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Image is too large. Please choose one under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      saveProfile({ ...profile, avatar: base64 });
    };
    reader.readAsDataURL(file);
  };

  const startEditing = () => {
    setTempName(profile.name);
    setTempEmail(profile.email);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const saveEditing = () => {
    if (!tempName.trim()) {
      alert("Name cannot be empty");
      return;
    }
    saveProfile({
      ...profile,
      name: tempName.trim(),
      email: tempEmail.trim() || "guest@stayfinder.com",
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "This will clear your profile and favorites on this device. Continue?"
    );
    if (confirmLogout) {
      localStorage.removeItem("stayfinder_profile");
      localStorage.removeItem("stayfinder_favorites");
      localStorage.removeItem("stayfinder_receipt");
      localStorage.removeItem("stayfinder_bookings");
      setProfile(DEFAULT_PROFILE);
      alert("Logged out successfully");
    }
  };

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white px-4 pt-4 pb-3 border-b border-gray-100">
        <h1 className="text-lg font-semibold text-gray-900 text-center">
          Profile
        </h1>
      </header>

      <div className="px-4 py-6">
        {/* Avatar + Info */}
        <div className="flex flex-col items-center mb-8">
          {/* Avatar */}
          <div className="relative mb-4">
            <button
              onClick={handleAvatarClick}
              className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200 flex items-center justify-center group"
            >
              {profile.avatar ? (
                <Image
                  src={profile.avatar}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <User size={40} className="text-gray-400" />
              )}

              {/* Camera overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={22} className="text-white" />
              </div>
            </button>

            {/* Small camera badge */}
            <button
              onClick={handleAvatarClick}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-md border-2 border-white"
            >
              <Camera size={14} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Name & Email */}
          {isEditing ? (
            <div className="w-full max-w-xs space-y-3">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Your name"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="email"
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
                placeholder="Email address"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black"
              />
              <div className="flex gap-2">
                <button
                  onClick={cancelEditing}
                  className="flex-1 border border-gray-200 rounded-full py-2.5 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEditing}
                  className="flex-1 bg-black text-white rounded-full py-2.5 text-sm font-medium"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-900">
                {profile.name}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">{profile.email}</p>
              <button
                onClick={startEditing}
                className="mt-3 text-sm text-blue-600 font-medium"
              >
                Edit profile
              </button>
            </div>
          )}

          {/* Saved feedback */}
          {saved && (
            <div className="mt-3 flex items-center gap-1.5 text-green-600 text-sm">
              <Check size={16} />
              <span>Saved</span>
            </div>
          )}
        </div>

        {/* Menu items */}
        <div className="space-y-1">
          <button
            onClick={startEditing}
            className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Settings size={20} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Settings</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle size={20} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-900">
                Help & Support
              </span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <LogOut size={20} className="text-red-500" />
              <span className="text-sm font-medium text-red-500">Log out</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-10">
          Profile data is stored only on this device
        </p>
      </div>
    </div>
  );
}