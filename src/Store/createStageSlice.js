const createStageSlice = (set, get) => ({
  stage: 1,
  stateGame: () => {
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
