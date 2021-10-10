import create from "zustand";

import createAngleSlice from "./createAngleSlice";
import createStageSlice from "./createStageSlice";
import createBlockListSlice from "./createBlockListSlice";
import createBoardStatusSlice from "./createBoardStatusSlice";
import createSelectedBlockSlice from "./createSelectedBlockSlice";

const useStore = create((set, get) => ({
  ...createAngleSlice(set, get),
  ...createStageSlice(set, get),
  ...createBlockListSlice(set, get),
  ...createBoardStatusSlice(set, get),
  ...createSelectedBlockSlice(set, get),
}));

export default useStore;
