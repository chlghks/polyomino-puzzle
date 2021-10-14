import { useEffect, useRef } from "react";

import useStore from "../../Store/useStore";
import Text from "../Text/Text";
import RankingRegistration from "../RankingRegistration/RankingRegistration";
import { RIGHT_ANGLE } from "../../constants/angles";

import {
  GAME,
  MAIN,
} from "../../constants/cameraPositions";

import getBlockList from "../../utils/getBlockList";

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
    const blockList = getBlockList(1);

    startGame();
    resetScore();
    setBlockList(blockList);
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
        position={[580, 0, 1000]}
      >
        <Text
          text={SCORE}
          position={[0, 30, 23]}
          rotation={[0, RIGHT_ANGLE, 0]}
          size={10}
          height={3}
          bevelEnabled={true}
          bevelThickness={2}
          bevelSize={0.7}
        />
        <Text
          text={String(score)}
          position={[0, 15, 0]}
          rotation={[0, RIGHT_ANGLE, 0]}
          size={15}
          height={3}
          bevelEnabled={true}
          bevelThickness={2}
          bevelSize={0.7}
          bevelSegments={10}
        />
        <RankingRegistration position={[0, -10, 0]} />
        <Text
          text={TRY_AGAIN}
          position={[0, -30, 40]}
          rotation={[0, RIGHT_ANGLE, 0]}
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
          position={[0, -30, -15]}
          rotation={[0, RIGHT_ANGLE, 0]}
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
