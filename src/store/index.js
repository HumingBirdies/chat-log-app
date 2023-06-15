import { create } from "zustand";

const useStore = create((set) => ({
  fileContents: "",
  setFileContents: (state) => set({ fileContents: state + state }),
}));

export default useStore;
