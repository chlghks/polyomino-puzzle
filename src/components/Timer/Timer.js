import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

import Text from "../Text/Text";
import { RIGHT_ANGLE } from "../../constants/angles";

export default function Timer() {
  const [timeLimit, setTimeLimit] = useState(61);
  const timer = useRef();

  const TIMEOUT_MESSAGE = "Game over";
  const START_MESSAGE = "Start";
  const NUMBER = "number";
  const DELAY = 1000;

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
      position={[0, 70, 20]}
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
