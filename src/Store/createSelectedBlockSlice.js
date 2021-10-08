const createSelectedBlockSlice = (set, get) => ({
  selectedBlock: null,
  selectBlock: (value) => {
    set(() => ({ selectedBlock: value }));
  },
  unselectBlock: () => {
    set(() => ({ selectedBlock: null }));
  },
});

export default createSelectedBlockSlice;
