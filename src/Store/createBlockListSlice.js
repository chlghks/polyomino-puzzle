import {
  DOMINO,
  TROMINO_I,
  TROMINO_L,
  TETROMINO_I,
  TETROMINO_O,
  TETROMINO_T,
  TETROMINO_J,
  TETROMINO_L,
  TETROMINO_S,
  TETROMINO_Z,
} from "../constants/blockTypes";

const mockBlockList = [DOMINO, TROMINO_I, TROMINO_L, TETROMINO_I, TETROMINO_O, TETROMINO_T, TETROMINO_J, TETROMINO_L, TETROMINO_S, TETROMINO_Z];

const createBlockListSlice = (set, get) => ({
  blockList: mockBlockList,
  setBlockList: (value) => {
    set(() => ({ blockList: value }));
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
