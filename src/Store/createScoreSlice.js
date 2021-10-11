const createScoreSlice = (set, get) => ({
  score: 0,
  increaseScore: (value) => {
    set((state) => ({ score: state.score + value }));
  },
  resetScore: () => {
    set(() => ({ score: 0 }));
  },
});

export default createScoreSlice;
