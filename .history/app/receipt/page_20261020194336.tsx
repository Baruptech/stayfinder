"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Download, Home, MapPin, Calendar, Users } from "lucide-react";
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

export default function ReceiptPage() {
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw =
      localStorage.getItem("stayfinder_receipt") ||
      sessionStorage.getItem("stayfinder_receipt");

    if (raw) {
      try {
        setReceipt(JSON.parse(raw));
      } catch (err) {
        console.error("Failed to parse receipt:", err);
      }
    }
    setLoading(false);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading receipt...</p>
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
        <p className="text-gray-700 mb-6">
          No receipt found. The payment may not have completed successfully.
        </p>
        <Link
          href="/"
          className="bg-black text-white px-8 py-3.5 rounded-full font-medium"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto pb-8">
      {/* Success Header */}
      <div className="bg-green-600 text-white px-6 pt-12 pb-16 text-center print:bg-white print:text-black print:pt-8 print:pb-6">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 print:bg-green-100">
          <CheckCircle size={36} className="text-white print:text-green-600" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Payment Successful</h1>
        <p className="text-green-100 text-sm mt-1.5 print:text-gray-600">
          Your booking has been confirmed
        </p>
      </div>

      {/* Receipt Card */}
      <div className="px-4 -mt-10">
        <div
          id="receipt"
          className="bg-white rounded-2xl shadow-xl overflow-hidden print:shadow-none print:rounded-none"
        >
          {/* Brand header */}
          <div className="px-6 pt-6 pb-5 border-b border-gray-100 text-center">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              StayFinder
            </h2>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
              Booking Receipt
            </p>
          </div>

          {/* Booking details */}
          <div className="px-6 py-5 space-y-4">
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                Property
              </p>
              <p className="text-base font-semibold text-gray-900">
                {receipt.listingTitle}
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">
                  Location
                </p>
                <p className="text-sm text-gray-800">{receipt.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Calendar size={16} className="text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">
                  Dates
                </p>
                <p className="text-sm text-gray-800">
                  {receipt.dateRange}
                  <span className="text-gray-400 mx-1.5">•</span>
                  {receipt.nights} night{receipt.nights > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Users size={16} className="text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-0.5">
                  Guests
                </p>
                <p className="text-sm text-gray-800">
                  {receipt.adults} Adult{receipt.adults > 1 ? "s" : ""}
                  {receipt.children > 0 &&
                    ` · ${receipt.children} Child${receipt.children > 1 ? "ren" : ""}`}
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-gray-200 mx-6" />

          {/* Payment details */}
          <div className="px-6 py-5 space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Transaction ID</span>
              <span className="font-mono text-xs text-gray-800 bg-gray-50 px-2 py-1 rounded">
                {receipt.transactionId}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Reference</span>
              <span className="font-mono text-xs text-gray-800 bg-gray-50 px-2 py-1 rounded max-w-[180px] truncate">
                {receipt.txRef}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Paid on</span>
              <span className="text-gray-800">{receipt.paymentDate}</span>
            </div>
          </div>

          {/* Total */}
          <div className="bg-gray-50 px-6 py-5 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Total Paid</span>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                #{receipt.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 text-center border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Thank you for booking with StayFinder
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 mt-6 space-y-3 print:hidden">
        <button
          onClick={handlePrint}
          className="w-full flex items-center justify-center gap-2.5 bg-black text-white py-3.5 rounded-full font-medium text-sm shadow-sm active:scale-[0.98] transition-transform"
        >
          <Download size={18} />
          Download / Print Receipt
        </button>

        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2.5 border border-gray-200 bg-white text-gray-800 py-3.5 rounded-full font-medium text-sm hover:bg-gray-50 transition-colors"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}