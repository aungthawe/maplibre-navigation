"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { MAP_STYLE } from "@/lib/mapStyle";
import { useUserStore } from "@/store/useUserStore";

export default function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const userName = useUserStore((s) => s.userName);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: [96.1951, 16.8661],
      zoom: 13,
    });

    map.addControl(new maplibregl.NavigationControl(), "bottom-left");
    map.on("load", () => {
      if (!userName) return;

      const el = document.createElement("div");
      el.className = "user-marker";
      el.innerText = userName;

      new maplibregl.Marker(el).setLngLat([96.1951, 16.8661]).addTo(map);
    });
    mapRef.current = map;
    return () => map.remove();
  }, [userName]);

  return <div ref={mapContainer} className="h-full w-full"/>;
}
