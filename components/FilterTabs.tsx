"use client";

type Filter = "all" | "apartment" | "house";

interface FilterTabsProps {
  active: Filter;
  onChange: (filter: Filter) => void;
}

const tabs: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "apartment", label: "Apartments" },
  { value: "house", label: "Houses" },
];

export default function FilterTabs({ active, onChange }: FilterTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            active === tab.value
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}