import { create } from "zustand";

const useStore = create((set) => ({
  fileContents: "",

  setFileContents: (value) =>
    set((prevState) => ({
      fileContents: prevState.fileContents + `\n` + value,
    })),
}));

export default useStore;
