import { useEffect, useRef } from "react";

import useStore from "../../Store/useStore";
import Text from "../Text/Text";
import RankingRegistration from "../RankingRegistration/RankingRegistration";
import { RIGHT_ANGLE } from "../../constants/angles";
import {
  GAME,
  MAIN,
} from "../../constants/cameraPositions";

import {
  DOMINO,
  TROMINO_I,
  TROMINO_L,
  TETROMINO_I,
  TETROMINO_T,
} from "../../constants/blockTypes";

const mockBlockList = [DOMINO, TROMINO_I, TROMINO_L, TETROMINO_I, TETROMINO_T];

export default function GameOver() {
  const setCameraPosition = useStore((state) => state.setCameraPosition);
  const setBlockList = useStore((state) => state.setBlockList);
  const resetScore = useStore((state) => state.resetScore);
  const startGame = useStore((state) => state.startGame);
  const score = useStore((state) => state.score);
  const textContainer = useRef();

  const TRY_AGAIN = "Try Again";
  const SCORE = "SCORE";
  const HOME = "Home";

  useEffect(() => {
    textContainer.current.children[1].geometry.center();
  }, [score]);

  const restartGame = () => {
    startGame();
    resetScore();
    setBlockList(mockBlockList);
    setCameraPosition(GAME);
  };

  const moveHome = () => {
    resetScore();
    setCameraPosition(MAIN);
  };

  return (
    <>
      <group
        ref={textContainer}
        position={[520, -155, 520]}
      >
        <Text
          text={SCORE}
          position={[-16, 13, 16]}
          rotation={[0, RIGHT_ANGLE / 2, 0]}
          size={10}
          height={3}
          bevelEnabled={true}
          bevelThickness={2}
          bevelSize={0.7}
        />
        <Text
          text={String(score)}
          position={[0, 0, 0]}
          rotation={[0, RIGHT_ANGLE / 2, 0]}
          size={15}
          height={3}
          bevelEnabled={true}
          bevelThickness={2}
          bevelSize={0.7}
          bevelSegments={10}
        />
        <RankingRegistration />
        <Text
          text={TRY_AGAIN}
          position={[-25.5, -56, 25.5]}
          rotation={[0, RIGHT_ANGLE / 2, 0]}
          size={5}
          height={3}
          bevelEnabled={true}
          bevelThickness={2}
          bevelSize={0.4}
          bevelSegments={10}
          onClick={restartGame}
        />
        <Text
          text={HOME}
          position={[8.5, -57, -8.5]}
          rotation={[0, RIGHT_ANGLE / 2, 0]}
          size={5}
          height={3}
          bevelEnabled={true}
          bevelThickness={2}
          bevelSize={0.4}
          bevelSegments={10}
          onClick={moveHome}
        />
      </group>
    </>
  );
}
