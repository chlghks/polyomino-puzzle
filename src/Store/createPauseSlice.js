const createPauseSlice = (set, get) => ({
  isPause: false,
  setPauseStatus: (value) => {
    set(() => ({ isPause: value }));
  },
});

export default createPauseSlice;
