import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

import useStore from "../../Store/useStore";
import Text from "../Text/Text";
import { RIGHT_ANGLE } from "../../constants/angles";
import { GAME_OVER } from "../../constants/cameraPositions";

export default function Timer() {
  const setCameraPosition = useStore(state => state.setCameraPosition);
  const increaseScore = useStore(state => state.increaseScore);
  const deleteBoard = useStore(state => state.deleteBoard);
  const endGame = useStore(state => state.endGame);
  const [timeLimit, setTimeLimit] = useState(1);
  const timer = useRef();

  const TIMEOUT_MESSAGE = "Game over";
  const START_MESSAGE = "Start";
  const NUMBER = "number";
  const DELAY = 1000;

  useEffect(() => (
    useStore.subscribe((stage, previousStage) => {
      if (stage > previousStage) {
        setTimeLimit(1);
        increaseScore(timeLimit * 10);
      }
    }, state => state.stage)
  ), [increaseScore, timeLimit]);

  useEffect(() => {
    if (typeof timeLimit !== NUMBER) {
      return;
    }

    if (timeLimit === 0) {
      setTimeLimit(TIMEOUT_MESSAGE);
      setTimeout(() => {
        endGame();
        deleteBoard();
        setCameraPosition(GAME_OVER);
      }, 2500);
      return;
    }

    const countdown = setInterval(() => {
      setTimeLimit(timeLimit - 1);
    }, DELAY);

    return () => clearInterval(countdown);
  }, [deleteBoard, endGame, setCameraPosition, timeLimit]);

  useFrame(() => {
    timer.current.geometry.center();

    if (timeLimit !== TIMEOUT_MESSAGE) {
      return;
    }

    const SPEED = 0.02;

    timer.current.position.lerp({ x: 0, y: 70, z: 115 }, SPEED);
  });

  return (
    <Text
      ref={timer}
      text={String(timeLimit === 61 ? START_MESSAGE : timeLimit)}
      position={[0, 80, 40]}
      rotation={[-RIGHT_ANGLE / 2, 0, 0]}
      size={10}
      height={0}
      bevelEnabled={true}
      bevelThickness={2}
      bevelSize={0.7}
      bevelSegments={10}
    />
  );
};
