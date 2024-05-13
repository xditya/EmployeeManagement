import { create } from "zustand";

const useSidebarNarrowStore = create((set) => ({
  isNarrow: false,
  setIsNarrow: (value: boolean) => {
    set({ isNarrow: value });
  },
}));

export default useSidebarNarrowStore;
