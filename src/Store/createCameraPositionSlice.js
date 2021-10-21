import { WELCOME } from "../constants/cameraPositions";

const createCameraPositionSlice = (set, get) => ({
  cameraPosition: WELCOME,
  setCameraPosition: (value) => {
    set(() => ({ cameraPosition: value }));
  },
});

export default createCameraPositionSlice;
