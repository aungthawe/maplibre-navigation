"use client";

import { searchPlace } from "@/lib/geocoding";
import { useNavigationStore } from "@/store/useNavigationStore";
import { useState, useEffect } from "react";

export default function SearchPanel() {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    Array<{ name: string; lat: number; lng: number }>
  >([]);
  const [open, setOpen] = useState(false);

  const setDestination = useNavigationStore((s) => s.setDestination);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  async function handleSearch() {
    const data = await searchPlace(query+", Myanmar");
    setResults(data);
  }

  function handleSelect(r: { lat: number; lng: number }) {
    setDestination({ lat: r.lat, lng: r.lng });
    setOpen(false); // ✅ collapse after selection
    setResults([]);
    setQuery("");
  }

  return (
    <>
      {/* 🔘 Floating Toggle Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="absolute z-30 top-4 left-4 px-5 h-10 rounded-full 
                   bg-white/60 text-gray-400 shadow-lg flex items-center justify-center
                   hover:bg-gray-100 transition"
      >
        🔍 Search Your Dream Place
      </button>

      {/* 🧠 Search Panel */}
      {open && (
        <div
          className="absolute z-30 top-16 left-1/2 -translate-x-1/2 
                     w-[420px] bg-white/50 backdrop-blur 
                     rounded-xl p-4 shadow-xl"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destination"
            className="w-full text-gray-700 rounded-lg bg-gray-100/60 p-3 
                       outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSearch}
            className="mt-2 w-full cursor-pointer rounded-lg bg-blue-600 py-2 
                       text-white font-medium hover:bg-blue-700 transition"
          >
            Search
          </button>

          {results.length > 0 && (
            <div className="mt-3 max-h-48 overflow-y-auto space-y-2">
              {results.map((r, i) => (
                <div
                  key={i}
                  className="cursor-pointer rounded-lg bg-gray-100 p-2 text-sm text-gray-700
                             hover:bg-blue-100 transition"
                  onClick={() => handleSelect(r)}
                >
                  {r.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
