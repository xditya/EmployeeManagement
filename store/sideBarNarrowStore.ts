import { create } from "zustand";

interface SidebarNarrowState {
  isNarrow: boolean;
  setIsNarrow: (value: boolean) => void;
}

const useSidebarNarrowStore = create<SidebarNarrowState>((set) => ({
  isNarrow: false,
  setIsNarrow: (value: boolean) => {
    set({ isNarrow: value });
  },
}));

export default useSidebarNarrowStore;