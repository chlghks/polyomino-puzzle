const createBoardStatusSlice = (set, get) => ({
  boardStatus: null,
  setBoardStatus: (value) => {
    set(() => ({ boardStatus: value }));
  },
  deleteBoard: () => {
    set(() => ({ boardStatus: null }));
  },
  resetBoard: () => {
    set((state) => {
      const locations =  Object.keys(state.boardStatus);

      const newBoardStatus = locations.reduce((boardStatus, location) => {
        boardStatus[location] = false;

        return boardStatus;
      }, {});

      return { boardStatus: newBoardStatus };
    });
  },
  updateBoardStatus: (value, boolean) => {
    set((state) => {
      const newBoardStatus = { ...state.boardStatus };

      value.forEach((position) => {
        const location = position.toString();

        newBoardStatus[location] = boolean;
      });

      return { boardStatus: newBoardStatus };
    });
  },
});

export default createBoardStatusSlice;
