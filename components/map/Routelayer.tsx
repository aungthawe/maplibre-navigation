import maplibregl from "maplibre-gl";
import { RouteInfo } from "@/type/location";

export function drawRoute(map: maplibregl.Map, route: RouteInfo) {
    if(map.getLayer("route-line")) {
        map.removeLayer("route-line");
        map.removeSource("route");
    }

    map.addSource("route", {
        type: "geojson",
        data: {
            type: "Feature",
            properties: {},
            geometry: route.geometry,
         
        },
    });

    map.addLayer({
      id: "route-line",
      type: "line",
      source: "route",
      paint: {
        "line-color": "#2563eb",
        "line-width": 6,
        "line-opacity": 0.9,
      },
    });
}
