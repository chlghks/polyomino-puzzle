import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

import Text from "../Text/Text";
import { RIGHT_ANGLE } from "../../constants/angles";
import useStore from "../../Store/useStore";

export default function Timer() {
  const increaseScore = useStore(state => state.increaseScore);
  const [timeLimit, setTimeLimit] = useState(61);
  const timer = useRef();

  const TIMEOUT_MESSAGE = "Game over";
  const START_MESSAGE = "Start";
  const NUMBER = "number";
  const DELAY = 1000;

  useEffect(() => (
    useStore.subscribe((stage, previousStage) => {
      if (stage > previousStage) {
        setTimeLimit(60);
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
      return;
    }

    const countdown = setInterval(() => {
      setTimeLimit(timeLimit - 1);
    }, DELAY);

    return () => clearInterval(countdown);
  }, [timeLimit]);

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
