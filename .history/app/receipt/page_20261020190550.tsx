"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Download, Home } from "lucide-react";
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
  const router = useRouter();
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Give a little time for sessionStorage to be available
    const timer = setTimeout(() => {
      const data = sessionStorage.getItem("stayfinder_receipt");

      if (data) {
        try {
          setReceipt(JSON.parse(data));
        } catch (err) {
          console.error("Failed to parse receipt:", err);
          router.replace("/");
        }
      } else {
        console.warn("No receipt found in sessionStorage");
        router.replace("/");
      }
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [router]);

  if (loading || !receipt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading receipt...</p>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto">
      {/* Success Header */}
      <div className="bg-green-600 text-white px-6 pt-10 pb-8 text-center">
        <CheckCircle size={48} className="mx-auto mb-3" />
        <h1 className="text-xl font-bold">Payment Successful!</h1>
        <p className="text-green-100 text-sm mt-1">Your booking is confirmed</p>
      </div>

      {/* Receipt Card */}
      <div className="px-4 -mt-4">
        <div
          id="receipt"
          className="bg-white rounded-2xl shadow-lg p-6 print:shadow-none print:rounded-none"
        >
          <div className="text-center mb-6 pb-4 border-b border-dashed border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">StayFinder</h2>
            <p className="text-xs text-gray-500">Booking Receipt</p>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Property</span>
              <span className="font-medium text-right">{receipt.listingTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Location</span>
              <span className="font-medium text-right">{receipt.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Dates</span>
              <span className="font-medium text-right">{receipt.dateRange}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Nights</span>
              <span className="font-medium">{receipt.nights}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Guests</span>
              <span className="font-medium">
                {receipt.adults} Adult{receipt.adults > 1 ? "s" : ""}
                {receipt.children > 0 &&
                  `, ${receipt.children} Child${receipt.children > 1 ? "ren" : ""}`}
              </span>
            </div>

            <div className="border-t border-dashed border-gray-200 my-3" />

            <div className="flex justify-between">
              <span className="text-gray-500">Transaction ID</span>
              <span className="font-mono text-xs">{receipt.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Reference</span>
              <span className="font-mono text-xs">{receipt.txRef}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Date</span>
              <span className="font-medium">{receipt.paymentDate}</span>
            </div>

            <div className="border-t border-dashed border-gray-200 my-3" />

            <div className="flex justify-between text-base font-bold">
              <span>Total Paid</span>
              <span>#{receipt.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Thank you for booking with StayFinder
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-6 space-y-3 print:hidden">
        <button
          onClick={handlePrint}
          className="w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-full font-medium"
        >
          <Download size={18} />
          Download / Print Receipt
        </button>

        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-800 py-3.5 rounded-full font-medium"
        >
          <Home size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}