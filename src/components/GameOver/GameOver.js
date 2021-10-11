import { useEffect, useRef } from "react";

import useStore from "../../Store/useStore";
import Text from "../Text/Text";
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
  const setCameraPosition = useStore(state => state.setCameraPosition);
  const setBlockList = useStore(state => state.setBlockList);
  const resetScore = useStore(state => state.resetScore);
  const startGame = useStore(state => state.startGame);
  const score = useStore(state => state.score);
  const textContainer = useRef();

  const REGISTER_SCORE = "Register Score";
  const TRY_AGAIN = "Try Again";
  const SCORE = "SCORE";
  const HOME = "Home";

  useEffect(() => {
    textContainer.current.children.forEach((text) => {
      text.geometry.center();
    });
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
          position={[0, 18, 0]}
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
        <Text
          text={REGISTER_SCORE}
          position={[0, -25, 0]}
          rotation={[0, RIGHT_ANGLE / 2, 0]}
          size={5}
          height={3}
          bevelEnabled={true}
          bevelThickness={2}
          bevelSize={0.4}
          bevelSegments={10}
        />
        <Text
          text={TRY_AGAIN}
          position={[15, -64, 45]}
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
          position={[45, -64, 15]}
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
