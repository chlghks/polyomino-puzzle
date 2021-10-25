import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import useStore from "../../Store/useStore";
import Text from "../Text/Text";
import { RIGHT_ANGLE } from "../../constants/angles";
import { TIMER_SOUND } from "../../constants/sounds";
import { GAME_OVER } from "../../constants/cameraPositions";

export default function Timer() {
  const setCameraPosition = useStore((state) => state.setCameraPosition);
  const increaseScore = useStore((state) => state.increaseScore);
  const unselectBlock = useStore((state) => state.unselectBlock);
  const deleteBoard = useStore((state) => state.deleteBoard);
  const resetAngle = useStore((state) => state.resetAngle);
  const endGame = useStore((state) => state.endGame);
  const isPause = useStore((state) => state.isPause);
  const scene = useThree((state) => state.scene);
  const [timeLimit, setTimeLimit] = useState(61);
  const timer = useRef();

  const timerSound = scene.getObjectByName(TIMER_SOUND);
  const TIMEOUT_MESSAGE = "Game over";
  const START_MESSAGE = "Start";
  const NUMBER = "number";
  const DELAY = 1000;

  useEffect(() => (
    useStore.subscribe((stage, previousStage) => {
      if (stage > previousStage) {
        if (timerSound.isPlaying) {
          timerSound.stop();
        }

        setTimeLimit(60);
        increaseScore(timeLimit * 10);
      }
    }, (state) => state.stage)
  ), [increaseScore, timeLimit, timerSound]);

  useEffect(() => {
    if (typeof timeLimit !== NUMBER) {
      return;
    }

    if (timeLimit === 10) {
      timerSound.play();
    }

    if (timeLimit === 3) {
      timerSound.setPlaybackRate(2);
    }

    if (timeLimit === 0) {
      timerSound.stop();

      setTimeLimit(TIMEOUT_MESSAGE);

      setTimeout(() => {

        endGame();
        deleteBoard();
        resetAngle();
        unselectBlock();
        setCameraPosition(GAME_OVER);
      }, 2500);
      return;
    }

    let countdown = 0;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (!isPause) {
      countdown = setInterval(() => {
        setTimeLimit(timeLimit - 1);
      }, DELAY);
    }

    return () => clearInterval(countdown);
  }, [deleteBoard, endGame, isPause, resetAngle, setCameraPosition, timeLimit, timerSound, unselectBlock]);

  useFrame(() => {
    if (timeLimit !== TIMEOUT_MESSAGE) {
      return;
    }

    const SPEED = 0.02;

    timer.current.position.lerp({ x: 0, y: 70, z: 115 }, SPEED);
  });

  return (
    <Text
      ref={timer}
      content={String(timeLimit === 61 ? START_MESSAGE : timeLimit)}
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
