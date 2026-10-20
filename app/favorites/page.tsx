"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import { listings } from "@/data/listings";
import { Listing } from "@/types";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = () => {
      const saved = localStorage.getItem("stayfinder_favorites");
      if (!saved) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      try {
        const ids: string[] = JSON.parse(saved);
        const favListings = listings.filter((item) => ids.includes(item.id));
        setFavorites(favListings);
      } catch {
        setFavorites([]);
      }
      setLoading(false);
    };

    loadFavorites();

    // Refresh when user comes back to this tab/page
    window.addEventListener("focus", loadFavorites);
    return () => window.removeEventListener("focus", loadFavorites);
  }, []);

  const removeFavorite = (id: string) => {
    const saved = localStorage.getItem("stayfinder_favorites");
    if (!saved) return;

    try {
      let ids: string[] = JSON.parse(saved);
      ids = ids.filter((favId) => favId !== id);
      localStorage.setItem("stayfinder_favorites", JSON.stringify(ids));
      setFavorites((prev) => prev.filter((item) => item.id !== id));
    } catch {
      // ignore
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white max-w-md mx-auto flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white px-4 pt-4 pb-3 border-b border-gray-100">
        <h1 className="text-lg font-semibold text-gray-900 text-center">
          Favorites
        </h1>
      </header>

      {favorites.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center px-6 pt-24 text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
            <Heart size={28} className="text-red-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            No favorites yet
          </h2>
          <p className="text-sm text-gray-500 max-w-xs mb-6">
            Places you love will appear here. Start exploring and tap the heart
            icon to save them.
          </p>
          <Link
            href="/"
            className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium"
          >
            Explore stays
          </Link>
        </div>
      ) : (
        /* Favorites list */
        <div className="px-4 py-5">
          <p className="text-sm text-gray-500 mb-4">
            {favorites.length} saved stay{favorites.length > 1 ? "s" : ""}
          </p>

          <div className="grid grid-cols-2 gap-3">
            {favorites.map((listing) => (
              <div key={listing.id} className="relative">
                <PropertyCard listing={listing} />

                {/* Remove button overlay */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFavorite(listing.id);
                  }}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
                >
                  <Heart size={16} className="fill-red-500 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}