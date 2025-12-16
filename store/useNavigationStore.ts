import { create } from "zustand";

type Point = {
  lat: number;
  lng: number;
};

type NavigationState = {
  start?: Point;
  destination?: Point;
  setStart: (p: Point) => void;
  setDestination?: (p: Point) => void;
};

export const useNavigationStore = create<NavigationState>((set) => ({
  setStart: (start) => set({ start }),
  setDestination: (destination) => set({ destination }),
}));
