"use client";

export const instant = false;   // ← add this line

import { useEffect, useState } from "react";
// ... rest of your imports

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, MapPin, Star, Share2, Heart } from "lucide-react";
import { listings } from "@/data/listings";

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const listing = listings.find((item) => item.id === id);

  const [isFavorite, setIsFavorite] = useState(false);
  const [shareFeedback, setShareFeedback] = useState(false);

  useEffect(() => {
    if (!listing) return;
    const saved = localStorage.getItem("stayfinder_favorites");
    if (saved) {
      try {
        const favs: string[] = JSON.parse(saved);
        setIsFavorite(favs.includes(listing.id));
      } catch {

        
        // ignore
      }
    }
  }, [listing]);

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <p className="text-gray-600 mb-4">Listing not found</p>
        <Link href="/" className="text-blue-600 font-medium">
          Back to Discover
        </Link>
      </div>
    );
  }

  const toggleFavorite = () => {
    const saved = localStorage.getItem("stayfinder_favorites");
    let favs: string[] = [];

    if (saved) {
      try {
        favs = JSON.parse(saved);
      } catch {
        favs = [];
      }
    }

    if (favs.includes(listing.id)) {
      favs = favs.filter((f) => f !== listing.id);
      setIsFavorite(false);
    } else {
      favs.push(listing.id);
      setIsFavorite(true);
    }

    localStorage.setItem("stayfinder_favorites", JSON.stringify(favs));
  };

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: listing.title,
      text: `Check out ${listing.title} on StayFinder – ${listing.location}`,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
        setShareFeedback(true);
        setTimeout(() => setShareFeedback(false), 2000);
      }
    } catch {
      // user cancelled share
    }
  };

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto pb-28">
      {/* Image Header */}
      <div className="relative h-72 w-full">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 448px"
        />

        {/* Overlay buttons */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-sm active:scale-95 transition"
          >
            <ChevronLeft size={22} className="text-gray-800" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleFavorite}
              className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-sm active:scale-95 transition"
            >
              <Heart
                size={18}
                className={
                  isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-gray-800"
                }
              />
            </button>

            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-sm active:scale-95 transition relative"
            >
              <Share2 size={18} className="text-gray-800" />
              {shareFeedback && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-2 py-1 rounded whitespace-nowrap">
                  Link copied!
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-5">
        {/* Title + Rating */}
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-xl font-semibold text-gray-900 leading-tight">
            {listing.title}
          </h1>
          <div className="flex items-center gap-1 shrink-0 bg-gray-50 px-2 py-1 rounded-full">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-800">
              {listing.rating}
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 mt-2 text-gray-500">
          <MapPin size={14} />
          <span className="text-sm">{listing.location}</span>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
          {listing.description}
        </p>

        {/* Price + Hosts */}
        <div className="flex items-center justify-between mt-5">
          <p className="text-lg font-semibold text-gray-900">
            #{listing.pricePerNight.toLocaleString()}
            <span className="text-sm font-normal text-gray-500">/night</span>
          </p>

          {listing.hosts && listing.hosts.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {listing.hosts.map((host, index) => (
                  <div
                    key={index}
                    className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white"
                  >
                    <Image
                      src={host.avatar}
                      alt={host.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="text-xs text-gray-500">Hosted by</span>
            </div>
          )}
        </div>

        {/* Location Map Section */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={16} className="text-gray-700" />
            <h2 className="text-sm font-semibold text-gray-900">Location</h2>
          </div>

          <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
            <Image
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
              alt="Map location"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/95 px-4 py-2 rounded-full shadow text-xs font-medium text-gray-800 max-w-[80%] truncate">
                {listing.location}
              </div>
            </div>
          </div>
        </div>

        {/* Quick info chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full capitalize">
            {listing.category}
          </span>
          {listing.isPopular && (
            <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full">
              Popular
            </span>
          )}
          {listing.isNewOffer && (
            <span className="text-xs bg-green-50 text-green-700 px-3 py-1.5 rounded-full">
              New offer
            </span>
          )}
        </div>
      </div>

      {/* Fixed Book Now button */}
      <div className="fixed bottom-16 left-0 right-0 z-40 px-4 pb-4 max-w-md mx-auto">
        <Link
          href={`/book/${listing.id}`}
          className="block w-full bg-black text-white text-center py-3.5 rounded-full font-medium text-base shadow-lg active:scale-[0.98] transition-transform"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}