const createBoardStatusSlice = (set, get) => ({
  boardStatus: null,
  getBoardStatus: (value) => {
    set(() => ({ boardStatus: value }));
  },
  resetBoard: () => {
    set(() => ({ boardStatus: null }));
  },
  setBlock: (value) => {
    set((state) => {
      const newBoardStatus = { ...state.boardStatus };

      value.forEach(position => {
        const location = position.toString();

        newBoardStatus[location] = true;
      });
      return { boardStatus: newBoardStatus };
    });
  },
});

export default createBoardStatusSlice;
