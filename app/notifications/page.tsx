"use client";

import { useEffect, useState } from "react";
import { Bell, CheckCircle, Calendar, MapPin } from "lucide-react";
import Link from "next/link";

interface ReceiptData {
  listingTitle: string;
  location: string;
  nights: number;
  adults: number;
  children: number;
  totalAmount: number;
  transactionId: string;
  txRef: string;
  dateRange: string;
  paymentDate: string;
}

export default function NotificationsPage() {
  const [bookings, setBookings] = useState<ReceiptData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load all saved bookings (we keep an array going forward)
    const rawList = localStorage.getItem("stayfinder_bookings");
    const single =
      localStorage.getItem("stayfinder_receipt") ||
      sessionStorage.getItem("stayfinder_receipt");

    let list: ReceiptData[] = [];

    if (rawList) {
      try {
        list = JSON.parse(rawList);
      } catch {
        list = [];
      }
    }

    // Also pick up the latest single receipt (for backward compatibility)
    if (single) {
      try {
        const latest = JSON.parse(single) as ReceiptData;
        // Avoid duplicates by transactionId
        if (!list.some((b) => b.transactionId === latest.transactionId)) {
          list = [latest, ...list];
        }
      } catch {
        // ignore
      }
    }

    setBookings(list);
    setLoading(false);
  }, []);

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
          Notifications
        </h1>
      </header>

      {bookings.length === 0 ? (
        /* Empty state */
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
      ) : (
        /* Bookings list */
        <div className="px-4 py-5 space-y-3">
          {bookings.map((booking, index) => (
            <div
              key={booking.transactionId || index}
              className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
            >
              {/* Top row */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                  <CheckCircle size={20} className="text-green-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">
                    Booking Confirmed
                  </p>
                  <p className="text-sm text-gray-800 mt-0.5 truncate">
                    {booking.listingTitle}
                  </p>

                  <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500">
                    <MapPin size={12} />
                    <span className="truncate">{booking.location}</span>
                  </div>

                  <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500">
                    <Calendar size={12} />
                    <span>
                      {booking.dateRange} · {booking.nights} night
                      {booking.nights > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                    <span className="text-xs text-gray-400">
                      {booking.paymentDate}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      #{booking.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <p className="text-center text-xs text-gray-400 pt-4">
            Showing your recent bookings
          </p>
        </div>
      )}
    </div>
  );
}