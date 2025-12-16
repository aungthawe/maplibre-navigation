import maplibregl from "maplibre-gl";

export default function createUserMarker(
  map: maplibregl.Map,
  lng: number,
  lat: number,
  label: string
) {
    const el  = document.createElement("div");
    el.className = "user-marker";
    el.innerText = label;
    
    return new maplibregl.Marker(el).setLngLat([lng, lat]).addTo(map);
}
