import create from "zustand";

const useStore = create(set => ({
  angle: 0,
  turnRight: () => set((state) => ({ angle: state.angle + Math.PI / 2 })),
  turnLeft: () => set((state) => ({ angle: state.angle - Math.PI / 2 })),
}));

export default useStore;
