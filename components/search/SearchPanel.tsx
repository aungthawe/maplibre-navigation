"use client";

import { useState } from "react";
import { searchPlace } from "@/lib/geocoding";
import { useNavigationStore } from "@/store/useNavigationStore";

export default function SearchPanel() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    Array<{ name: string; lat: number; lng: number }>
  >([]);
  const setDestination = useNavigationStore((s) => s.setDestination);
  async function handleSearch() {
    const data = await searchPlace(query);
    setResults(data);
  }

  return (
    <div className="absolute z-30 top-4 left-1/2 -translate-x-1/2 w-[420px] bg-neutral-900 rounded-xl p-4 shadow-xl">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search destination"
        className="w-full rounded-lg bg-neutral-800 p-3 outline-none"
      />

      <button
        onClick={handleSearch}
        className="mt-2 w-full rounded-lg bg-blue-600 py-2 courser-pointer font-medium"
      >
        Search
      </button>

      <div className="mt-3 space-y-2">
        {results.map((r, i) => (
          <div
            key={i}
            className="cursor-pointer rounded-lg bg-neutral-800 p-2 text-sm hover:bg-neutral-700"
            onClick={() => setDestination({ lat: r.lat, lng: r.lng })}
          >
            {r.name}
          </div>
        ))}
      </div>
    </div>
  );
}
