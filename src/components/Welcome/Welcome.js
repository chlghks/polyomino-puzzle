import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import useStore from "../../Store/useStore";
import Text from "../Text/Text";
import { RIGHT_ANGLE } from "../../constants/angles";
import { MAIN } from "../../constants/cameraPositions";
import { TITLE_POLYOMINO } from "../../constants/titles";
import { BACKGROUND_SOUND } from "../../constants/sounds";

export default function Welcome() {
  const setCameraPosition = useStore((state) => state.setCameraPosition);
  const scene = useThree((state) => state.scene);
  const message = useRef();
  const title = useRef();
  const grid = useRef();

  const WELCOME_DELAY = 2000;
  const BLINK_MESSAGE = "* click to start *";

  useEffect(() => {
    const moveMain = () => {
      const backGroundSound = scene.getObjectByName(BACKGROUND_SOUND);

      backGroundSound.play();

      setCameraPosition(MAIN);
    };

    setTimeout(() => {
      document.addEventListener("click", moveMain);
    }, WELCOME_DELAY);

    return () => document.removeEventListener("click", moveMain);
  }, [scene, setCameraPosition]);

  useEffect(() => {
    const blinkDelay = 500;
    let blinkMessage = 0;

    message.current.visible = false;

    setTimeout(() => {
      blinkMessage = setInterval(() => {
        message.current.visible = !message.current.visible;
      }, blinkDelay);
    }, WELCOME_DELAY);

    return () => clearInterval(blinkMessage);
  });

  useFrame(() => {
    const ROTATION_SPEED = 0.001;
    const INTERPOLATE_SPEED = 0.04;

    grid.current.rotation.y += ROTATION_SPEED;
    title.current.position.lerp({ x: 0, y: 20, z: 0 }, INTERPOLATE_SPEED);
  });

  return (
    <group position={[1200, 0, 0]}>
      <mesh
        ref={grid}
        rotation={[RIGHT_ANGLE, 0, 0]}
        position={[-200, 0, 0]}
      >
        <sphereGeometry args={[200, 40, 20, 0, Math.PI * 2, 0.78]} />
        <meshBasicMaterial wireframe />
      </mesh>
      <Text
        ref={title}
        content={TITLE_POLYOMINO}
        position={[0, 400, 0]}
        rotation={[0, RIGHT_ANGLE, 0]}
        size={17}
        height={3}
        bevelEnabled={true}
        bevelThickness={2}
        bevelSize={0.7}
      />
      <Text
        ref={message}
        content={BLINK_MESSAGE}
        position={[0, -40, 0]}
        rotation={[0, RIGHT_ANGLE, 0]}
        size={2.5}
        height={1}
        bevelEnabled={false}
      />
    </group>
  );
}
