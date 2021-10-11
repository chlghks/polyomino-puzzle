import { useEffect, useRef } from "react";

import useStore from "../../Store/useStore";
import { RIGHT_ANGLE } from "../../constants/angles";
import { GAME } from "../../constants/cameraPositions";

import {
  DOMINO,
  TROMINO_I,
  TROMINO_L,
  TETROMINO_I,
  TETROMINO_T,
} from "../../constants/blockTypes";
import Text from "../Text/Text";

const mockBlockList = [DOMINO, TROMINO_I, TROMINO_L, TETROMINO_I, TETROMINO_T];

export default function Main() {
  const setCameraPosition = useStore(state => state.setCameraPosition);
  const setBlockList = useStore(state => state.setBlockList);
  const startGame = useStore(state => state.startGame);
  const textContainer = useRef();

  const PLAY = "Play";
  const RANKING = "Ranking";
  const SETTING = "Setting";

  useEffect(() => {
    textContainer.current.children.forEach((text) => {
      text.geometry.center();
    });
  }, []);

  const setup = () => {
    setCameraPosition(GAME);
    setBlockList(mockBlockList);
    startGame();
  };

  return (
    <group
      ref={textContainer}
      position={[600, 0, 600]}
    >
      <Text
        text={PLAY}
        position={[0, 40, 0]}
        rotation={[RIGHT_ANGLE / 6, RIGHT_ANGLE / 2, RIGHT_ANGLE / 90 * -10]}
        size={10}
        height={3}
        bevelEnabled={true}
        bevelThickness={2}
        bevelSize={0.7}
        onClick={setup}
      />
      <Text
        text={RANKING}
        position={[0, 0, 0]}
        rotation={[0, RIGHT_ANGLE / 2, 0]}
        size={10}
        height={3}
        bevelEnabled={true}
        bevelThickness={2}
        bevelSize={0.7}
      />
      <Text
        text={SETTING}
        position={[0, -40, 0]}
        rotation={[RIGHT_ANGLE / -6, RIGHT_ANGLE / 2, RIGHT_ANGLE / 90 * 10]}
        size={10}
        height={3}
        bevelEnabled={true}
        bevelThickness={2}
        bevelSize={0.7}
      />
    </group>
  );
}
