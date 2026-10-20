"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { listings } from "@/data/listings";

export const instant = false;   // ← add this line

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
// ... rest of the code stays the same
const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function BookPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const listing = listings.find((item) => item.id === id);

  // Calendar state (default to May 2023 to match the design)
  const [currentMonth, setCurrentMonth] = useState(4); // May = 4
  const [currentYear, setCurrentYear] = useState(2023);
  const [selectedDates, setSelectedDates] = useState<number[]>([14, 16]); // matching design

  // Guests state
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(2);

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Listing not found</p>
      </div>
    );
  }

  // Calendar helpers
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
        // keep only the new range start
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
    if (selectedDates.length === 1) return `${selectedDates[0]} ${MONTHS[currentMonth].slice(0, 3)} ${currentYear}`;
    return `${selectedDates[0]}-${selectedDates[1]} ${MONTHS[currentMonth].slice(0, 3)} ${currentYear}`;
  };

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto flex flex-col">
      {/* Dark Header */}
      <header className="bg-black text-white px-4 pt-4 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-1 -ml-1"
          >
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
            <button
              onClick={clearDates}
              className="text-sm text-blue-600 font-medium"
            >
              Clear
            </button>
          </div>

          {/* Month navigation */}
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

          {/* Day labels */}
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

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-y-1">
            {/* Empty cells for previous month */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10" />
            ))}

            {/* Days of the month */}
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
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Guests</h2>
            <button
              onClick={clearGuests}
              className="text-sm text-blue-600 font-medium"
            >
              Clear
            </button>
          </div>

          {/* Adults */}
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

          {/* Children */}
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
      </div>

      {/* Fixed Book Now button */}
      <div className="px-4 pb-6 pt-2">
        <button
          onClick={() => {
            alert(
              `Booking ${listing.title}\nDates: ${formatSelectedRange()}\nAdults: ${adults}, Children: ${children}`
            );
          }}
          className="w-full bg-black text-white text-center py-3.5 rounded-full font-medium text-base shadow-lg active:scale-[0.98] transition-transform"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}