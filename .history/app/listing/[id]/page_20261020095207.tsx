import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, MapPin, Star, Share2 } from "lucide-react";
import { listings } from "@/data/listings";

export const instant = false;   // ← add this line

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ListingDetailPage({ params }: PageProps) 
  // ... rest of the code stays exactly the same
 {
  // ... rest of the code stays exactly the same
  const { id } = await params;
  const listing = listings.find((item) => item.id === id);

  if (!listing) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto pb-24">
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

        {/* Top buttons */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Link
            href="/"
            className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
          >
            <ChevronLeft size={22} className="text-gray-800" />
          </Link>
          <button className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
            <Share2 size={18} className="text-gray-800" />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-5">
        {/* Title + Rating */}
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-xl font-semibold text-gray-900 leading-tight">
            {listing.title}
          </h1>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
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
            #{listing.pricePerNight.toLocaleString()}.00
            <span className="text-sm font-normal text-gray-500">/night</span>
          </p>

          {listing.hosts && (
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
          )}
        </div>

        {/* Location section */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={16} className="text-gray-700" />
            <h2 className="text-sm font-semibold text-gray-900">Location</h2>
          </div>

          {/* Simple map placeholder */}
          <div className="relative h-40 w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
            <Image
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
              alt="Map location"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/95 px-3 py-1.5 rounded-full shadow text-xs font-medium text-gray-800">
                Transcorp Hilton Abuja
              </div>
            </div>
          </div>
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