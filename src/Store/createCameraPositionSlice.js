import { MAIN } from "../constants/cameraPositions";

const createCameraPositionSlice = (set, get) => ({
  cameraPosition: MAIN,
  setCameraPosition: (value) => {
    set(() => ({ cameraPosition: value }));
  },
});

export default createCameraPositionSlice;
