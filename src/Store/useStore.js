import create from "zustand";

import createAngleSlice from "./createAngleSlice";
import createScoreSlice from "./createScoreSlice";
import createStageSlice from "./createStageSlice";
import createBlockListSlice from "./createBlockListSlice";
import createBoardStatusSlice from "./createBoardStatusSlice";
import createSelectedBlockSlice from "./createSelectedBlockSlice";
import createCameraPositionSlice from "./createCameraPositionSlice";

const useStore = create((set, get) => ({
  ...createAngleSlice(set, get),
  ...createScoreSlice(set, get),
  ...createStageSlice(set, get),
  ...createBlockListSlice(set, get),
  ...createBoardStatusSlice(set, get),
  ...createSelectedBlockSlice(set, get),
  ...createCameraPositionSlice(set, get),
}));

export default useStore;
