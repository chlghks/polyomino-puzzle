const createBoardStatusSlice = (set, get) => ({
  boardStatus: null,
  getBoardStatus: (value) => {
    set(() => ({ boardStatus: value }));
  },
  resetBoard: () => {
    set(() => ({ boardStatus: null }));
  },
  setBoardStatus: (value, boolean) => {
    set((state) => {
      const newBoardStatus = { ...state.boardStatus };

      value.forEach(position => {
        const location = position.toString();

        newBoardStatus[location] = boolean;
      });

      return { boardStatus: newBoardStatus };
    });
  },
});

export default createBoardStatusSlice;
