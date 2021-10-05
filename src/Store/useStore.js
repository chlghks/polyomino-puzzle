import create from "zustand";

import { RIGHT_ANGLE } from "../constants/angles";

const useStore = create(set => ({
  angle: RIGHT_ANGLE / 2,
  turnRight: () => set((state) => ({ angle: state.angle + RIGHT_ANGLE })),
  turnLeft: () => set((state) => ({ angle: state.angle - RIGHT_ANGLE })),
}));

export default useStore;
