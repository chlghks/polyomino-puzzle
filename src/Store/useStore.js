import create from "zustand";

import createAngleSlice from "./createAngleSlice";
import createBlockListSlice from "./createBlockListSlice";
import createBoardStatusSlice from "./createBoardStatusSlice";
import createSelectedBlockSlice from "./createSelectedBlockSlice";

const useStore = create((set, get) => ({
  ...createAngleSlice(set, get),
  ...createBlockListSlice(set, get),
  ...createBoardStatusSlice(set, get),
  ...createSelectedBlockSlice(set, get),
}));

export default useStore;
