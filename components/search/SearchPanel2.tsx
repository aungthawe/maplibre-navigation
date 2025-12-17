"use client";

import { useState, useEffect } from "react";
import { searchPlace } from "@/lib/geocoding";
import { useNavigationStore } from "@/store/useNavigationStore";

export default function SearchPanel() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    Array<{ name: string; lat: number; lng: number }>
  >([]);
  const pickMode = useNavigationStore((s) => s.pickMode);
  const setPickMode = useNavigationStore((s) => s.setPickMode);

  const { userLocation, setStart, setDestination } = useNavigationStore();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  async function handleSearch() {
    const data = await searchPlace(query + ", Yangon, Myanmar");
    setResults(data);
  }

  function handleResultSelect(r: { lat: number; lng: number }) {
    setDestination({ lat: r.lat, lng: r.lng });
    setOpen(false);
    setQuery("");
    setResults([]);
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="absolute z-30 top-4 left-100 w-10 h-10 rounded-full
                   bg-white shadow-lg flex items-center justify-center"
      >
        🧭
      </button>

      {open && (
        <div
          className="text-gray-500 absolute z-30 top-16 left-1/2 -translate-x-1/2
                        w-[420px] bg-white/90 backdrop-blur
                        rounded-xl p-4 shadow-xl space-y-4"
        >
          {/* START POINT */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              Start point
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => userLocation && setStart(userLocation)}
                className="flex-1 rounded-lg bg-blue-600 py-2 text-sm hover:bg-blue-300 text-white"
              >
                Use current
              </button>
              {/* <button
                onClick={() => setPickMode("start")}
                className={`flex-1 rounded-lg py-2 text-sm
                  ${
                    pickMode === "start"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                Pick on map
              </button> */}
            </div>
          </div>

          {/* DESTINATION */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              Destination
            </p>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destination"
              className="w-full rounded-lg bg-gray-100 p-3 outline-none"
            />

            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSearch}
                className="flex-1 rounded-lg bg-blue-600 py-2 text-white text-sm"
              >
                Search
              </button>
              {/* <button
                onClick={() => setPickMode("destination")}
                className={`flex-1 rounded-lg py-2 text-sm
                  ${
                    pickMode === "destination"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                Pick on map
              </button> */}
            </div>
          </div>

          {/* RESULTS */}
          {results.length > 0 && (
            <div className="max-h-48 overflow-y-auto space-y-2">
              {results.map((r, i) => (
                <div
                  key={i}
                  className="cursor-pointer rounded-lg bg-gray-100 p-2 text-sm hover:bg-blue-100"
                  onClick={() => handleResultSelect(r)}
                >
                  {r.name}
                </div>
              ))}
            </div>
          )}

          {/* PICK MODE INFO */}
          {pickMode && (
            <p className="text-xs text-blue-600 text-center">
              Click on map to select {pickMode} point
            </p>
          )}
        </div>
      )}
    </>
  );
}
