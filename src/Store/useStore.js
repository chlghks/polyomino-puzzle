import create from "zustand";

import createAngleSlice from "./createAngleSlice";
import createBlockListSlice from "./createBlockListSlice";
import createSelectedBlockSlice from "./createSelectedBlockSlice";

const useStore = create((set, get) => ({
  ...createAngleSlice(set, get),
  ...createBlockListSlice(set,get),
  ...createSelectedBlockSlice(set, get),
}));

export default useStore;
