"use client";

import { useState, useMemo } from "react";
import { Search, ChevronLeft, X } from "lucide-react";
import FilterTabs from "@/components/FilterTabs";
import PropertyCard from "@/components/PropertyCard";
import { listings } from "@/data/listings";

type Filter = "all" | "apartment" | "house";

export default function Home() {
  const [filter, setFilter] = useState<Filter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Filter by category + search
  const filtered = useMemo(() => {
    return listings.filter((item) => {
      const matchesCategory =
        filter === "all" ? true : item.category === filter;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [filter, searchQuery]);

  const popular = filtered.filter((item) => item.isPopular);
  const newOffers = filtered.filter((item) => item.isNewOffer);

  const isSearching = searchQuery.trim().length > 0;

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white px-4 pt-4 pb-3 border-b border-gray-100">
        {isSearchOpen ? (
          // Search mode
          <div className="flex items-center gap-3">
            <button onClick={closeSearch} className="p-1 -ml-1">
              <ChevronLeft size={24} className="text-gray-800" />
            </button>

            <div className="flex-1 relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search city, property, or keyword..."
                className="w-full bg-gray-100 rounded-full pl-10 pr-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X size={16} className="text-gray-400" />
                </button>
              )}
            </div>
          </div>
        ) : (
          // Normal header
          <div className="flex items-center justify-between mb-4">
            <button className="p-1 -ml-1 opacity-0 pointer-events-none">
              {/* Hidden for visual balance – home page has no back */}
              <ChevronLeft size={24} className="text-gray-800" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Discover</h1>
            <button onClick={openSearch} className="p-1 -mr-1">
              <Search size={22} className="text-gray-800" />
            </button>
          </div>
        )}

        {/* Filter tabs – only show when not actively searching */}
        {!isSearchOpen && (
          <FilterTabs active={filter} onChange={setFilter} />
        )}
      </header>

      <div className="px-4 py-5 space-y-8">
        {isSearching ? (
          // Search results
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-gray-900">
                Search results
              </h2>
              <span className="text-sm text-gray-500">
                {filtered.length} found
              </span>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-sm">
                  No stays found for “{searchQuery}”
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-3 text-sm text-blue-600 font-medium"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {filtered.map((listing) => (
                  <PropertyCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Popular */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-900">
                  Popular
                </h2>
                <span className="text-sm text-gray-500">
                  {popular.length} stays
                </span>
              </div>

              {popular.length === 0 ? (
                <p className="text-sm text-gray-500 py-6 text-center">
                  No popular stays in this category
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {popular.map((listing) => (
                    <PropertyCard key={listing.id} listing={listing} />
                  ))}
                </div>
              )}
            </section>

            {/* New offers */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-900">
                  New offers
                </h2>
                <span className="text-sm text-gray-500">
                  {newOffers.length} stays
                </span>
              </div>

              {newOffers.length === 0 ? (
                <p className="text-sm text-gray-500 py-6 text-center">
                  No new offers in this category
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {newOffers.map((listing) => (
                    <PropertyCard key={listing.id} listing={listing} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}