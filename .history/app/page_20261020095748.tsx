"use client";

import { useState } from "react";
import { Search, ChevronLeft } from "lucide-react";
import FilterTabs from "@/components/FilterTabs";import PropertyCard from "@/components/PropertyCard";
import { listings } from "@/data/listings";

type Filter = "all" | "apartment" | "house";

export default function Home() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = listings.filter((item) =>
    filter === "all" ? true : item.category === filter
  );

  const popular = filtered.filter((item) => item.isPopular);
  const newOffers = filtered.filter((item) => item.isNewOffer);

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white px-4 pt-4 pb-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <button className="p-1 -ml-1">
            <ChevronLeft size={24} className="text-gray-800" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Discover</h1>
          <button className="p-1 -mr-1">
            <Search size={22} className="text-gray-800" />
          </button>
        </div>

        <FilterTabs active={filter} onChange={setFilter} />
      </header>

      <div className="px-4 py-5 space-y-8">
        {/* Popular */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-900">Popular</h2>
            <button className="text-sm text-blue-600 font-medium">See all</button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {popular.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        {/* New offers */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-900">New offers</h2>
            <button className="text-sm text-blue-600 font-medium">See all</button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {newOffers.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}