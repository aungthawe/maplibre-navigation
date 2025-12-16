import { create } from "zustand";

type userState = {
  userName: string;
  setUserName: (name: string) => void;
};

export const useUserStore = create<userState>((set) => ({
  userName:
    typeof window !== "undefined" ? localStorage.getItem("username") || "" : "",
  setUserName: (name) => {
    localStorage.setItem("username", name);
    set({ userName: name });
  },
}));
