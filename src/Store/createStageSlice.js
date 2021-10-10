const createStageSlice = (set, get) => ({
  stage: null,
  startGame: () => {
    set(() => ({ stage: 1 }));
  },
  increaseStage: () => {
    set((state) => {

      return { stage: state.stage + 1 };
    });
  },
  endGame: () => {
    set(() => ({ stage: null }));
  },
});

export default createStageSlice;
