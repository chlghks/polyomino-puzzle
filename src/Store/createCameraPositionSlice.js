const positions = {
  main: { x: 680, y: 0, z: 680 },
  game: { x: 80, y: 60, z: 80 },
  gameOver: { x: 600, y: -200, z: 600 },
};

const createCameraPositionSlice = (set, get) => ({
  cameraPosition: positions.main,
  setCameraPosition: (value) => {
    set(() => ({ cameraPosition: positions[value] }));
  },
});

export default createCameraPositionSlice;
