import { Heart } from "lucide-react";

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-white max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white px-4 pt-4 pb-3 border-b border-gray-100">
        <h1 className="text-lg font-semibold text-gray-900 text-center">
          Favorites
        </h1>
      </header>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center px-6 pt-24 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <Heart size={28} className="text-red-400" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          No favorites yet
        </h2>
        <p className="text-sm text-gray-500 max-w-xs">
          Places you love will appear here. Start exploring and tap the heart
          icon to save them.
        </p>
      </div>
    </div>
  );
}