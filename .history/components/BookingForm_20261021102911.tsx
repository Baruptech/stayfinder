"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import RemitaPayment from "react-remita";
import { Listing } from "@/types";

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface BookingFormProps {
  listing: Listing;
}

type PaymentMethod = "flutterwave" | "remita";

export default function BookingForm({ listing }: BookingFormProps) {
  const router = useRouter();

  const [currentMonth, setCurrentMonth] = useState(4);
  const [currentYear, setCurrentYear] = useState(2023);
  const [selectedDates, setSelectedDates] = useState<number[]>([14, 16]);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("flutterwave");

  const nights =
    selectedDates.length === 2
      ? selectedDates[1] - selectedDates[0]
      : selectedDates.length === 1
      ? 1
      : 0;

  const totalAmount = nights * listing.pricePerNight;

  // ========== FLUTTERWAVE (unchanged) ==========
  const config = {
    public_key: "FLWPUBK_TEST-aa438f2fb0f5993ec72ced12227e05f2-X",
    tx_ref: `stayfinder-${Date.now()}`,
    amount: totalAmount,
    currency: "NGN",
    payment_options: "card,ussd,banktransfer",
    customer: {
      email: "guest@stayfinder.com",
      phone_number: "08000000000",
      name: "StayFinder Guest",
    },
    customizations: {
      title: "StayFinder",
      description: `Booking for ${listing.title} (${nights} night${nights > 1 ? "s" : ""})`,
      logo: "https://stayfinder-rho-six.vercel.app/icon-192.png",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  // ========== REMITA ==========
  const remitaData = {
    key: "pk_test_6V6gnE4ExVEDp7yMF4f1dPkqjEgaSo8JgF49KYoqAlRGnWCMalUVP56A7jtqTCi6", // public key only
    customerId: "guest@stayfinder.com",
    firstName: "StayFinder",
    lastName: "Guest",
    email: "guest@stayfinder.com",
    amount: totalAmount,
    narration: `Booking for ${listing.title} (${nights} night${nights > 1 ? "s" : ""})`,
    onSuccess: function (response: any) {
      console.log("Remita success:", response);

      const receiptData = {
        listingTitle: listing.title,
        location: listing.location,
        nights,
        adults,
        children,
        totalAmount,
        transactionId:
          response?.paymentReference ||
          response?.transactionId ||
          response?.rrr ||
          "N/A",
        txRef: response?.transactionId || `remita-${Date.now()}`,
        dateRange: formatSelectedRange(),
        paymentDate: new Date().toLocaleString(),
      };

      try {
        localStorage.setItem("stayfinder_receipt", JSON.stringify(receiptData));
        sessionStorage.setItem("stayfinder_receipt", JSON.stringify(receiptData));

        const existing = localStorage.getItem("stayfinder_bookings");
        let list = existing ? JSON.parse(existing) : [];
        list = list.filter(
          (b: any) => b.transactionId !== receiptData.transactionId
        );
        list.unshift(receiptData);
        list = list.slice(0, 20);
        localStorage.setItem("stayfinder_bookings", JSON.stringify(list));
      } catch (err) {
        console.error("Could not save receipt:", err);
      }

      setTimeout(() => {
        router.push("/receipt");
      }, 500);
    },
    onError: function (response: any) {
      console.log("Remita error:", response);
      alert("Payment was not successful. Please try again.");
    },
    onClose: function () {
      console.log("Remita modal closed");
    },
  };

  // ========== Helpers ==========
  const getDaysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (month: number, year: number) =>
    new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const toggleDate = (day: number) => {
    setSelectedDates((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      }
      if (prev.length >= 2) {
        return [day];
      }
      return [...prev, day].sort((a, b) => a - b);
    });
  };

  const clearDates = () => setSelectedDates([]);
  const clearGuests = () => {
    setAdults(1);
    setChildren(0);
  };

  const formatSelectedRange = () => {
    if (selectedDates.length === 0) return "Select dates";
    if (selectedDates.length === 1)
      return `${selectedDates[0]} ${MONTHS[currentMonth].slice(0, 3)} ${currentYear}`;
    return `${selectedDates[0]}-${selectedDates[1]} ${MONTHS[currentMonth].slice(0, 3)} ${currentYear}`;
  };

  const handleFlutterBookNow = () => {
    if (nights < 1) {
      alert("Please select at least one night (start and end date).");
      return;
    }

    handleFlutterPayment({
      callback: (response: any) => {
        console.log("Payment response:", response);

        const isSuccess =
          response?.status === "successful" ||
          response?.status === "success" ||
          response?.status === "completed" ||
          !!response?.transaction_id ||
          !!response?.id;

        if (isSuccess) {
          const receiptData = {
            listingTitle: listing.title,
            location: listing.location,
            nights,
            adults,
            children,
            totalAmount,
            transactionId:
              response.transaction_id || response.id || response.flw_ref || "N/A",
            txRef: response.tx_ref || config.tx_ref,
            dateRange: formatSelectedRange(),
            paymentDate: new Date().toLocaleString(),
          };

          try {
            localStorage.setItem(
              "stayfinder_receipt",
              JSON.stringify(receiptData)
            );
            sessionStorage.setItem(
              "stayfinder_receipt",
              JSON.stringify(receiptData)
            );

            const existing = localStorage.getItem("stayfinder_bookings");
            let list = existing ? JSON.parse(existing) : [];
            list = list.filter(
              (b: any) => b.transactionId !== receiptData.transactionId
            );
            list.unshift(receiptData);
            list = list.slice(0, 20);
            localStorage.setItem("stayfinder_bookings", JSON.stringify(list));
          } catch (err) {
            console.error("Could not save receipt:", err);
          }

          closePaymentModal();
          setTimeout(() => {
            router.push("/receipt");
          }, 500);
        } else {
          closePaymentModal();
          alert("Payment was not successful. Please try again.");
        }
      },
      onClose: () => {
        console.log("Payment modal closed");
      },
    });
  };

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col">
      {/* Header */}
      <header className="bg-black text-white px-4 pt-4 pb-5">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-1 -ml-1">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-base font-semibold">{listing.title}</h1>
            <p className="text-xs text-gray-300 mt-0.5">{formatSelectedRange()}</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 px-4 py-5 overflow-y-auto">
        {/* Dates Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Dates</h2>
            <button onClick={clearDates} className="text-sm text-blue-600 font-medium">
              Clear
            </button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="p-1">
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <span className="text-sm font-medium text-gray-900">
              {MONTHS[currentMonth]}
            </span>
            <button onClick={nextMonth} className="p-1">
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {DAYS.map((day) => (
              <div
                key={day}
                className="text-center text-[11px] font-medium text-gray-400 py-1"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = selectedDates.includes(day);
              const isInRange =
                selectedDates.length === 2 &&
                day > selectedDates[0] &&
                day < selectedDates[1];

              return (
                <button
                  key={day}
                  onClick={() => toggleDate(day)}
                  className={`h-10 w-full flex items-center justify-center text-sm rounded-full transition-colors
                    ${isSelected ? "bg-black text-white font-medium" : ""}
                    ${isInRange ? "bg-gray-100 text-gray-900" : ""}
                    ${!isSelected && !isInRange ? "text-gray-800 hover:bg-gray-50" : ""}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Guests Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Guests</h2>
            <button onClick={clearGuests} className="text-sm text-blue-600 font-medium">
              Clear
            </button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm text-gray-800">Adults</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setAdults((v) => Math.max(1, v - 1))}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
              >
                −
              </button>
              <span className="w-6 text-center text-sm font-medium">{adults}</span>
              <button
                onClick={() => setAdults((v) => v + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-gray-800">Children</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setChildren((v) => Math.max(0, v - 1))}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
              >
                −
              </button>
              <span className="w-6 text-center text-sm font-medium">{children}</span>
              <button
                onClick={() => setChildren((v) => v + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        {nights > 0 && (
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">
                #{listing.pricePerNight.toLocaleString()} × {nights} night
                {nights > 1 ? "s" : ""}
              </span>
              <span className="font-medium">#{totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base font-semibold border-t border-gray-200 pt-2">
              <span>Total</span>
              <span>#{totalAmount.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Payment Method Selector */}
        {nights > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">
              Choose payment method
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentMethod("flutterwave")}
                className={`py-3 rounded-xl text-sm font-medium border transition-colors ${
                  paymentMethod === "flutterwave"
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-200"
                }`}
              >
                Flutterwave
              </button>
              <button
                onClick={() => setPaymentMethod("remita")}
                className={`py-3 rounded-xl text-sm font-medium border transition-colors ${
                  paymentMethod === "remita"
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-200"
                }`}
              >
                Remita
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Payment Button */}
      <div className="px-4 pb-6 pt-2">
        {nights < 1 ? (
          <button
            disabled
            className="w-full bg-black text-white text-center py-3.5 rounded-full font-medium text-base opacity-50 cursor-not-allowed"
          >
            Select dates to book
          </button>
        ) : paymentMethod === "flutterwave" ? (
          <button
            onClick={handleFlutterBookNow}
            className="w-full bg-black text-white text-center py-3.5 rounded-full font-medium text-base shadow-lg active:scale-[0.98] transition-transform"
          >
            Pay #{totalAmount.toLocaleString()} with Flutterwave
          </button>
        ) : (
          <RemitaPayment
            remitaData={remitaData}
            className="w-full bg-[#003366] text-white text-center py-3.5 rounded-full font-medium text-base shadow-lg"
            text={`Pay #${totalAmount.toLocaleString()} with Remita`}
          />
        )}
      </div>
    </div>
  );
}