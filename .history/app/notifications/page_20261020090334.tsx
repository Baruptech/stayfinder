import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-white max-w-md mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white px-4 pt-4 pb-3 border-b border-gray-100">
        <h1 className="text-lg font-semibold text-gray-900 text-center">
          Notifications
        </h1>
      </header>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center px-6 pt-24 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
          <Bell size={28} className="text-blue-400" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          No notifications
        </h2>
        <p className="text-sm text-gray-500 max-w-xs">
          You’re all caught up! We’ll notify you about bookings, messages, and
          special offers here.
        </p>
      </div>
    </div>
  );
}