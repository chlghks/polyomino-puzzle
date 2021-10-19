import { useEffect, useMemo } from "react";

import useStore from "../../Store/useStore";
import Board from "../Board/Board";
import Arrow from "../Arrow/Arrow";
import Pause from "../Pause/Pause";
import GameHeader from "../GameHeader/GameHeader";
import BlockContainer from "../BlockContainer/BlockContainer";
import InteractiveBoard from "../InteractiveBoard/InteractiveBoard";
import { RIGHT_ANGLE } from "../../constants/angles";

export default function Game() {
  const setBoardStatus = useStore((state) => state.setBoardStatus);
  const stage = useStore((state) => state.stage);
  const isPlaying = !!stage;
  const COUNT = 4;
  const EDGE_LENGTH = 10;
  const BOARD_HEIGHT = 2;
  const BLOCK_HEIGHT = 4;
  const OFFSET_LENGTH = EDGE_LENGTH / -2 * COUNT + 5;

  const blockPositions = [];

  const boardStatus = useMemo(() => ({}), []);

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

  useEffect(() => (
    useStore.subscribe((stage) => {
      if (stage === 1) {
        setBoardStatus(boardStatus);
      }
    }, (state) => state.stage)
  ), [boardStatus, setBoardStatus]);

  return (
    <>
      {!!isPlaying && (
        <>
          <object3D rotation={[0, RIGHT_ANGLE / 2, 0]}>
            <GameHeader />
            <Arrow />
          </object3D>
          <Board
            blockPositions={blockPositions}
            blockHeight={BLOCK_HEIGHT}
            boardHeight={BOARD_HEIGHT}
            edgeLength={EDGE_LENGTH}
          />
          <InteractiveBoard
            boardHeight={BOARD_HEIGHT}
            blockHeight={BLOCK_HEIGHT}
            edgeLength={EDGE_LENGTH}
            count={COUNT}
          />
          <BlockContainer
            edgeLength={EDGE_LENGTH}
            height={BLOCK_HEIGHT}
          />
          <Pause />
        </>
      )}
    </>
  );
}
