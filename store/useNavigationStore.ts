import { create } from "zustand";
import { Coordinate, RouteInfo } from "@/type/location";

type NavigationState = {
  start?: Coordinate;
  destination?: Coordinate;
  route?: RouteInfo;
  userLocation?: Coordinate;
  pickMode?: "start" | "destination" | null;
  setPickMode: (m: "start" | "destination" | null) => void;
  setUserLocation: (p: Coordinate) => void;
  setStart: (p: Coordinate) => void;
  setDestination: (p: Coordinate) => void;
  setRoute: (r: RouteInfo) => void;
  clearRoute: () => void;
};

export const useNavigationStore = create<NavigationState>((set) => ({
  setPickMode: (pickMode) => set({ pickMode }),
  setStart: (start) => set({ start }),
  setDestination: (destination) => set({ destination }),
  setRoute: (route) => set({ route }),
  clearRoute: () =>
    set({ route: undefined, destination: undefined, start: undefined }),
  setUserLocation: (userLocation) => set({ userLocation }),
}));
