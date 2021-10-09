import Board from "../Board/Board";
import Arrow from "../Arrow/Arrow";
import BlockContainer from "../BlockContainer/BlockContainer";

import useStore from "../../Store/useStore";
import InteractiveBoard from "../InteractiveBoard/InteractiveBoard";
import { RIGHT_ANGLE } from "../../constants/angles";

import {
  BLACK,
  WHITE,
} from "../../constants/colors";

export default function Game() {
  const getBoardStatus = useStore(state => state.getBoardStatus);
  const COUNT = 4;
  const EDGE_LENGTH = 10;
  const BOARD_HEIGHT = 2;
  const BLOCK_HEIGHT = 4;
  const OFFSET_HEIGHT = 0;
  const OFFSET_LENGTH = EDGE_LENGTH / -2 * COUNT + 5;

  const blockPositions = [];
  const boardStatus = {};

  for (let i = 0; i < COUNT; i++) {
    for (let j = 0; j < COUNT; j++) {
      const X = EDGE_LENGTH * i + OFFSET_LENGTH;
      const Y = 0;
      const Z = EDGE_LENGTH * j + OFFSET_LENGTH;

      const position = [X, Y, Z];

      blockPositions.push(position);

      const location = [X, Z].toString();

      boardStatus[location] = false;
    }
  }

  getBoardStatus(boardStatus);

  return (
    <>
      <Board
        blockPositions={blockPositions}
        offsetHeight={OFFSET_HEIGHT}
        boardHeight={BOARD_HEIGHT}
        edgeLength={EDGE_LENGTH}
      />
      <InteractiveBoard
        offsetHeight={OFFSET_HEIGHT}
        boardHeight={BOARD_HEIGHT}
        blockHeight={BLOCK_HEIGHT}
        edgeLength={EDGE_LENGTH}
        count={COUNT}
      />
      <object3D rotation={[0, RIGHT_ANGLE / 2, 0]}>
        <Arrow offsetHeight={OFFSET_HEIGHT} />
        <BlockContainer
          edgeLength={EDGE_LENGTH}
          height={BLOCK_HEIGHT}
          boxColor={WHITE}
          isOutLine={true}
          outLineColor={BLACK}
        />
      </object3D>
    </>
  );
}
