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
  const userLocation = useNavigationStore((s) => s.userLocation);
  const setUserLocation = useNavigationStore((s) => s.setUserLocation);
  const start = useNavigationStore((s) => s.start);
  const destination = useNavigationStore((s) => s.destination);
  const setStart = useNavigationStore((s) => s.setStart);
  const setDestination = useNavigationStore((s) => s.setDestination);
  const route = useNavigationStore((s) => s.route);
  const setRoute = useNavigationStore((s) => s.setRoute);
  const pickMode = useNavigationStore((s) => s.pickMode);
  const setPickMode = useNavigationStore((s) => s.setPickMode);

  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const userMarkerRef = useRef<maplibregl.Marker | null>(null);

  const username = useUserStore((s) => s.userName);

  useEffect(() => {
    if (!mapContainer.current) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        console.warn("Geolocation error:", err);
      },
      { enableHighAccuracy: true }
    );

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: MAP_STYLE,
      center: [96.1951, 16.8661],
      zoom: 14,
      pitch: 35,
      bearing: -15,
    });

    map.addControl(new maplibregl.NavigationControl(), "bottom-right");

    map.on("click", (e) => {
      if (!pickMode) return;

      const point = {
        lat: e.lngLat.lat,
        lng: e.lngLat.lng,
      };

      if (pickMode === "start") {
        setStart(point);
      }

      if (pickMode === "destination") {
        setDestination(point);
      }

      // exit pick mode after selection
      setPickMode(null);
    });

    mapRef.current = map;
    return () => map.remove();
  }, []);

  // User marker
  useEffect(() => {
    if (!mapRef.current || !username || !userLocation) return;

    if (!userMarkerRef.current) {
      userMarkerRef.current = createUserMarker(
        mapRef.current,
        userLocation.lng,
        userLocation.lat,
        username
      );
    } else {
      userMarkerRef.current.setLngLat([userLocation.lng, userLocation.lat]);
    }
  }, [username, userLocation]);

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
