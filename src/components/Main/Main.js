import { useEffect, useRef } from "react";

import useStore from "../../Store/useStore";
import Text from "../Text/Text";
import { RIGHT_ANGLE } from "../../constants/angles";

import {
  GAME,
  RANKING,
} from "../../constants/cameraPositions";

import {
  TITLE_PLAY,
  TITLE_RANKING,
  TITLE_SETTING,
} from "../../constants/titles";

import getBlockList from "../../utils/getBlockList";

export default function Main() {
  const setCameraPosition = useStore((state) => state.setCameraPosition);
  const setBlockList = useStore((state) => state.setBlockList);
  const startGame = useStore((state) => state.startGame);
  const textContainer = useRef();

  useEffect(() => {
    textContainer.current.children.forEach((text) => {
      text.geometry.center();
    });
  }, []);

  const setup = () => {
    const blockList = getBlockList(1);

    setCameraPosition(GAME);
    setBlockList(blockList);
    startGame();
  };

  const moveRanking = () => {
    setCameraPosition(RANKING);
  };

  return (
    <group
      ref={textContainer}
      position={[600, 0, 0]}
    >
      <Text
        text={TITLE_PLAY}
        position={[0, 40, 0]}
        rotation={[0, RIGHT_ANGLE, 0]}
        size={10}
        height={3}
        bevelEnabled={true}
        bevelThickness={2}
        bevelSize={0.7}
        onClick={setup}
      />
      <Text
        text={TITLE_RANKING}
        position={[0, 0, 0]}
        rotation={[0, RIGHT_ANGLE, 0]}
        size={10}
        height={3}
        bevelEnabled={true}
        bevelThickness={2}
        bevelSize={0.7}
        onClick={moveRanking}
      />
      <Text
        text={TITLE_SETTING}
        position={[0, -40, 0]}
        rotation={[0, RIGHT_ANGLE, 0]}
        size={10}
        height={3}
        bevelEnabled={true}
        bevelThickness={2}
        bevelSize={0.7}
      />
    </group>
  );
}
