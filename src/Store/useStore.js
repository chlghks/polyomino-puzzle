import create from "zustand";

import { RIGHT_ANGLE } from "../constants/angles";

const useStore = create(set => ({
  angle: 0,
  turnRight: () => set((state) => ({ angle: state.angle + RIGHT_ANGLE })),
  turnLeft: () => set((state) => ({ angle: state.angle - RIGHT_ANGLE })),
}));

export default useStore;
