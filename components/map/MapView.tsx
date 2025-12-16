"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { MAP_STYLE } from "@/lib/mapStyle";
import { useUserStore } from "@/store/useUserStore";
import { useNavigationStore } from "@/store/useNavigationStore";
import createUserMarker from "./UserMarker";
import { drawRoute } from "./Routelayer";
import { getCarRoute } from "@/lib/routing";

export default function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const userMarkerRef = useRef<maplibregl.Marker | null>(null);

  const username = useUserStore((s) => s.userName);
  const { start, destination, setStart, setDestination, route, setRoute } =
    useNavigationStore();

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: [96.1951, 16.8661],
      zoom: 14,
      pitch: 35,
      bearing: -15,
    });

    map.addControl(new maplibregl.NavigationControl(), "bottom-right");

    map.on("click", async (e) => {
      const point = {
        lat: e.lngLat.lat,
        lng: e.lngLat.lng,
      };

      if (!start) {
        setStart(point);
      } else if (!destination) {
        setDestination(point);
      }
    });



    mapRef.current = map;
    return () => map.remove();
  }, []);

  // User marker
  useEffect(() => {
    if (!mapRef.current || !username) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }

    userMarkerRef.current = createUserMarker(
      mapRef.current,
      96.1951,
      16.8661,
      username
    );
  }, [username]);

  // Route calculation
  useEffect(() => {
    if (!mapRef.current || !start || !destination) return;

    getCarRoute(start, destination).then((r) => {
      setRoute(r);
      drawRoute(mapRef.current!, r);
    });
  }, [start, destination]);

  return <div ref={mapContainer} className="h-full w-full" />;
}
