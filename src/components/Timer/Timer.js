import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import { RIGHT_ANGLE } from "../../constants/angles";
import fontJson from "../../font/helvetiker_regular.typeface.json";

export default function Timer() {
  const font = new THREE.FontLoader().parse(fontJson);
  const [timeLimit, setTimeLimit] = useState(1);
  const timer = useRef();
  const TIMEOUT_MESSAGE = "Game over";
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
  });

  const TextOptions = {
    font,
    size: 10,
    height: 0,
    bevelEnabled: true,
    bevelThickness: 2,
    bevelSize: 0.7,
    bevelSegments: 10,
  };

  return (
    <mesh
      ref={timer}
      position={[0, 70, 20]}
      rotation={[-RIGHT_ANGLE / 2, 0, 0]}
    >
      <textGeometry args={[String(timeLimit === 61 ? 60 : timeLimit), TextOptions]} />
      <meshNormalMaterial />
    </mesh>
  );
};
