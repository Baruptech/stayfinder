import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Star } from "lucide-react";
import { Listing } from "@/types";

interface PropertyCardProps {
  listing: Listing;
}

export default function PropertyCard({ listing }: PropertyCardProps) {
  return (
    <Link href={`/listing/${listing.id}`} className="block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <div className="relative aspect-[4/3]">
          <Image
            src={listing.image}
            alt={listing.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 200px"
          />
          <button
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
            onClick={(e) => {
              e.preventDefault();
              // favorite logic later
            }}
          >
            <Heart size={16} className="text-gray-600" />
          </button>
        </div>

        <div className="p-3">
          <div className="flex items-start justify-between gap-1">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">
              {listing.title}
            </h3>
            <div className="flex items-center gap-0.5 shrink-0">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-gray-700">
                {listing.rating}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 mt-1 text-gray-500">
            <MapPin size={12} />
            <span className="text-xs truncate">{listing.location}</span>
          </div>

          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {listing.description}
          </p>

          <p className="mt-2 text-sm font-semibold text-gray-900">
            #{listing.pricePerNight.toLocaleString()}.00
            <span className="font-normal text-gray-500">/night</span>
          </p>
        </div>
      </div>
    </Link>
  );
}