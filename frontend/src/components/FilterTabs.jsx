import React from "react";

export default function FilterTabs({ current, setFilter }) {
  const filters = ["All", "Completed", "Pending"];

  return (
    <div className="flex gap-2 justify-center mb-4">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-4 py-1 rounded ${
            current === f ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
