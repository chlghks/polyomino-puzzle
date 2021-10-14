import convertDegree from "../utils/convertDegree";

const createAngleSlice = (set, get) => ({
  angle: 0,
  turnRight: () => {
    set((state) => {
      const convertedDegree = convertDegree(state.angle);
      const targetDegree = convertedDegree + 90;
      const convertedRadian = targetDegree * Math.PI / 180;

      return { angle: convertedRadian };
    });
  },
  turnLeft: () => {
    set((state) => {
      const convertedDegree = convertDegree(state.angle);
      const targetDegree = convertedDegree - 90;
      const convertedRadian = targetDegree * Math.PI / 180;

      return { angle: convertedRadian };
    });
  },
  resetAngle: () => {
    set((state) => ({ angle: 0 }));
  },
});

export default createAngleSlice;
