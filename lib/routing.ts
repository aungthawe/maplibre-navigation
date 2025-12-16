import axios from "axios";
import { Coordinate, RouteInfo } from "@/type/location";

export async function getCarRoute(
  start: Coordinate,
  end: Coordinate
): Promise<RouteInfo> {
  const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}`;

  const res = await axios.get(url, {
    params: {
      geometries: "geojson",
      overview: "full",
    },
  });

  const route = res.data.routes[0];

  return {
    distance: route.distance,
    duration: route.duration,
    geometry: route.geometry,
  };
}
