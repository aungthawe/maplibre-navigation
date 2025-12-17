"use client";

import { useNavigationStore } from "@/store/useNavigationStore";

function formatDistance(meters: number) {
  return meters < 1000
    ? `${Math.round(meters)} m`
    : `${(meters / 1000).toFixed(1)} km`;
}

function formatDuration(seconds: number) {
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const hrs = Math.floor(mins / 60);
  const rem = mins % 60;
  return `${hrs} h ${rem} min`;
}

export default function RouteInfoDialog() {
  const { route, start, destination } = useNavigationStore();
  const clearRoute = useNavigationStore((s) => s.clearRoute);

  if (!route || !start || !destination) return null;

  return (
    <div
      className="
        absolute z-30 bottom-6 left-1/2 -translate-x-1/2
        bg-white/50 backdrop-blur
        rounded-2xl shadow-xl
        px-6 py-4
        min-w-[320px]
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">Route</p>
          <p className="text-lg font-semibold text-gray-800">
            {formatDuration(route.duration)}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500">Distance</p>
          <p className="text-sm font-medium text-gray-700">
            {formatDistance(route.distance)}
          </p>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          className="
            flex-1 rounded-xl bg-blue-600 py-2
            text-white text-sm font-medium
            hover:bg-blue-700
          "
        >
          Start navigation
        </button>

        <button
          onClick={clearRoute}
          className="
            flex-1 rounded-xl bg-gray-100 py-2
            text-sm text-gray-700
            hover:bg-gray-200
          "
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
