import { create } from "zustand";

// Define an interface for the store state
interface SidebarState {
  tabSelected: string;
  setTabSelected: (tab: string) => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  tabSelected: "dashboard", // Initial state with default value
  setTabSelected: (tab: string) => {
    set({ tabSelected: tab });
  },
}));

export default useSidebarStore;
