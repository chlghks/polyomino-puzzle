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
      const newState = [...state.blockList];

      const index = newState.findIndex((block) => {
        return (block.name === value.name) && (block.direction === value.direction);
      });

      newState.splice(index, 1);

      return { blockList: newState };
    });
  },
  resetBlockList: () => {
    set(() => ({ blockList: null }));
  },
});

export default createBlockListSlice;
