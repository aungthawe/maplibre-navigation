export type Coordinate = {
  lat: number;
  lng: number;
};

export type RouteInfo = {
  distance: number; // meters
  duration: number; // seconds
  geometry: GeoJSON.LineString;
};
