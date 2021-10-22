import { useState } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

import useStore from "../../Store/useStore";
import Text from "../Text/Text";
import { RIGHT_ANGLE } from "../../constants/angles";
import { TITLE_SETTING } from "../../constants/titles";
import { MAIN } from "../../constants/cameraPositions";

export default function Setting() {
  const setCameraPosition = useStore((state) => state.setCameraPosition);
  const scene = useThree((state) => state.scene);
  const [isMute, setIsMute] = useState(false);

  const AUDIO = "audio";
  const HOME = "Home";
  const AUTO = "auto";
  const POINTER = "pointer";

  const x = -10, y = 2;

  const speakerShape = new THREE.Shape();

  speakerShape.moveTo(x, y);
  speakerShape.lineTo(x, y - 4);
  speakerShape.bezierCurveTo(x, y - 4, x, y - 5, x + 1, y - 5);
  speakerShape.lineTo(x + 6, y - 5);
  speakerShape.lineTo(x + 11, y - 10);
  speakerShape.bezierCurveTo(x + 11, y - 10, x + 12, y - 11, x + 12, y - 10);
  speakerShape.lineTo(x + 12, y + 6);
  speakerShape.bezierCurveTo(x + 12, y + 6, x + 12, y + 7, x + 11, y + 6);
  speakerShape.lineTo(x + 6, y + 1);
  speakerShape.lineTo(x + 1, y + 1);
  speakerShape.bezierCurveTo(x + 1, y + 1, x, y + 1, x, y);

  const smallWaveShape = new THREE.Shape();

  smallWaveShape.moveTo(x + 15, y);
  smallWaveShape.quadraticCurveTo(x + 16, y - 2, x + 15, y - 4);
  smallWaveShape.lineTo(x + 16, y - 5);
  smallWaveShape.quadraticCurveTo(x + 18, y - 2, x + 16, y + 1);

  const bigWaveShape = new THREE.Shape();

  bigWaveShape.moveTo(x + 18, y + 3);
  bigWaveShape.quadraticCurveTo(x + 20.5, y - 2, x + 18, y - 7);
  bigWaveShape.lineTo(x + 19, y - 8);
  bigWaveShape.quadraticCurveTo(x + 22, y - 2, x + 19, y + 4);

  const muteShape = new THREE.Shape();

  muteShape.moveTo(x + 18, y + 7);
  muteShape.lineTo(x, y - 10);
  muteShape.lineTo(x + 1, y - 11);
  muteShape.lineTo(x + 19, y + 6);
  muteShape.lineTo(x + 18, y + 7);

  const extrudeSettings = {
    steps: 3,
    depth: 2,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 0.5,
    bevelOffset: 0,
    bevelSegments: 4,
  };

  const toggleAudio = () => {
    const audio = scene.getObjectByName(AUDIO);

    const volume = isMute ? 1 : 0;

    audio.children.forEach((sound) => {
      sound.setVolume(volume);
    });

    if (isMute) {
      setIsMute(false);

      return;
    }

    setIsMute(true);
  };

  const changeCursor = (option) => {
    document.body.style.cursor = option;
  };

  const moveHome = () => {
    setCameraPosition(MAIN);
  };

  return (
    <group
      position={[600, 1000, 0]}
      rotation={[0, RIGHT_ANGLE, 0]}
    >
      <Text
        content={TITLE_SETTING}
        position={[0, 40, 0]}
        rotation={[0, 0, 0]}
        size={10}
        height={3}
        bevelEnabled={true}
        bevelThickness={2}
        bevelSize={0.7}
      />
      <group rotation={[0, 0, 0]}>
        <mesh>
          <extrudeGeometry args={[speakerShape, extrudeSettings]} />
          <meshNormalMaterial />
        </mesh>
        <mesh>
          <extrudeGeometry args={[smallWaveShape, extrudeSettings]} />
          <meshNormalMaterial />
        </mesh>
        <mesh>
          <extrudeGeometry args={[bigWaveShape, extrudeSettings]} />
          <meshNormalMaterial />
        </mesh>
        {isMute && (
          <mesh>
            <extrudeGeometry args={[muteShape, extrudeSettings]} />
            <meshNormalMaterial />
          </mesh>
        )}
        <mesh
          onClick={toggleAudio}
          onPointerOver={() => changeCursor(POINTER)}
          onPointerOut={() => changeCursor(AUTO)}
        >
          <planeGeometry args={[25, 25]} />
          <meshBasicMaterial visible={false} />
        </mesh>
      </group>
      <Text
        content={HOME}
        position={[0, -40, 0]}
        rotation={[0, 0, 0]}
        size={7}
        height={1}
        bevelEnabled={true}
        bevelThickness={2}
        bevelSize={0.4}
        onClick={moveHome}
      />
    </ group>
  );
}
