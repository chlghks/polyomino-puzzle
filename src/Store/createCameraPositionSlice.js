const positions = {
  main: { x: 680, y: 0, z: 680 },
  game: { x: 80, y: 60, z: 80 },
};

const createCameraPositionSlice = (set, get) => ({
  cameraPosition: positions.main,
  setCameraPosition: (value) => {
    set(() => ({ cameraPosition: positions[value] }));
  },
});

export default createCameraPositionSlice;
