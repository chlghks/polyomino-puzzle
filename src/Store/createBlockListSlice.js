import {
  DOMINO,
  TROMINO_I,
  TROMINO_L,
  TETROMINO_I,
  TETROMINO_T,
} from "../constants/blockTypes";

const mockBlockList = [DOMINO, TROMINO_I, TROMINO_L, TETROMINO_I, TETROMINO_T];

const createBlockListSlice = (set, get) => ({
  blockList: mockBlockList,
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
