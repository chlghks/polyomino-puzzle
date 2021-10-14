import {
  DOMINO,
  TROMINO_L,
  TROMINO_I,
  TETROMINO_I,
  TETROMINO_O,
  TETROMINO_T,
  TETROMINO_J,
  TETROMINO_L,
  TETROMINO_S,
  TETROMINO_Z,
} from "../constants/blockTypes";

const questions = [
  [DOMINO, TROMINO_I, TROMINO_L, TETROMINO_I, TETROMINO_T],
  [DOMINO, TROMINO_I, TROMINO_L, TETROMINO_O, TETROMINO_L],
  [DOMINO, DOMINO, TETROMINO_I, TETROMINO_J, TETROMINO_O],
  [DOMINO, TROMINO_L, TROMINO_L, TETROMINO_J, TETROMINO_T],
  [DOMINO, TROMINO_I, TROMINO_L, TETROMINO_O, TETROMINO_J],
  [DOMINO, TROMINO_L, TROMINO_L, TETROMINO_I, TETROMINO_O],
  [DOMINO, TROMINO_I, TROMINO_L, TETROMINO_L, TETROMINO_J],
  [DOMINO, TROMINO_L, TROMINO_L, TETROMINO_T, TETROMINO_O],
  [DOMINO, TROMINO_I, TROMINO_L, TETROMINO_L, TETROMINO_S],
  [DOMINO, TROMINO_I, TROMINO_L, TETROMINO_J, TETROMINO_Z],
  [DOMINO, DOMINO, DOMINO, TROMINO_I, TROMINO_L, TETROMINO_J],
  [TETROMINO_S, TETROMINO_S, TETROMINO_J, TETROMINO_J],
  [TETROMINO_S, TETROMINO_Z, DOMINO, DOMINO, TETROMINO_J],
  [DOMINO, TROMINO_I, TROMINO_L, TETROMINO_L, TETROMINO_J],
  [TETROMINO_L, TETROMINO_J, TETROMINO_S, DOMINO, DOMINO],
  [TETROMINO_T, TETROMINO_T, TETROMINO_S, TETROMINO_J],
];

const getRandomNumber = (number) => {
  return Math.floor(Math.random() * number);
};

const getBlockList = (stage) => {
  const total = questions.length;
  const QuestionNumber = stage - 1 < total ? stage - 1 : getRandomNumber(total);
  const blockTypeList = questions[QuestionNumber];

  const blockList = blockTypeList.map((type) => {
    const direction = getRandomNumber(4) * 0.25;

    return { type, direction };
  });

  return blockList;
};

export default getBlockList;
