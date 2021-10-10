const createBlockListSlice = (set, get) => ({
  blockList: null,
  setBlockList: (value) => {
    set(() => ({ blockList: value }));
  },
  addBlock: (value) => {
    set((state) => {
      const newState = [...state.blockList];

      newState.push(value);

      return { blockList: newState };
    });
  },
  removeBlock: (value) => {
    set((state) => {
      const newState = state.blockList.filter(block => block !== value);

      return { blockList: newState };
    });
  },
  resetBlockList: () => {
    set(() => ({ blockList: null }));
  },
});

export default createBlockListSlice;
