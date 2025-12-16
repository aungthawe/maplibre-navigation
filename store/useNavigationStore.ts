import { create } from "zustand";
import { Coordinate, RouteInfo } from "@/type/location";

type NavigationState = {
  start?: Coordinate;
  destination?: Coordinate;
  route?: RouteInfo;
  setStart: (p: Coordinate) => void;
  setDestination: (p: Coordinate) => void;
  setRoute: (r: RouteInfo) => void;
  clearRoute: () => void;
};

export const useNavigationStore = create<NavigationState>((set) => ({
  setStart: (start) => set({ start }),
  setDestination: (destination) => set({ destination }),
  setRoute: (route) => set({ route }),
  clearRoute: () => set({ route: undefined }),
}));
