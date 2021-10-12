import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import useStore from "../../Store/useStore";
import Text from "../Text/Text";
import { RIGHT_ANGLE } from "../../constants/angles";

export default function Score() {
  const score = useStore((state) => state.score);
  const stageBox = useRef();

  const SCORE = "SCORE";

  useFrame(() => {
    stageBox.current.children[0].geometry.center();
    stageBox.current.children[1].geometry.center();
  });

  return (
    <group
      ref={stageBox}
      position={[30, 3, 0]}
    >
      <Text
        text={SCORE}
        position={[0, 70, 20]}
        rotation={[-RIGHT_ANGLE / 2, 0, 0]}
        size={3}
        height={0}
        bevelEnabled={true}
        bevelThickness={1}
        bevelSize={0.3}
      />
      <Text
        text={String(score)}
        position={[0, 70, 32]}
        rotation={[-RIGHT_ANGLE / 2, 0, 0]}
        size={5}
        height={0}
        bevelEnabled={true}
        bevelThickness={1}
        bevelSize={0.3}
        bevelSegments={10}
      />
    </group>
  );
};
