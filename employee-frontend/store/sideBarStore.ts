import { create } from "zustand";

const useSidebarStore = create((set) => ({
  tabSelected: "dashboard",

  setTabSelected: (tab: string) => {
    set({ tabSelected: tab });
  },
}));

export default useSidebarStore;
