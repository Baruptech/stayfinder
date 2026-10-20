import { User, ChevronRight, Settings, HelpCircle, LogOut } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white px-4 pt-4 pb-3 border-b border-gray-100">
        <h1 className="text-lg font-semibold text-gray-900 text-center">
          Profile
        </h1>
      </header>

      <div className="px-4 py-6">
        {/* User info */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={32} className="text-gray-500" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Guest User</h2>
            <p className="text-sm text-gray-500">guest@stayfinder.com</p>
          </div>
        </div>

        {/* Menu items */}
        <div className="space-y-1">
          <button className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Settings size={20} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Settings</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle size={20} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Help & Support</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <LogOut size={20} className="text-red-500" />
              <span className="text-sm font-medium text-red-500">Log out</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}