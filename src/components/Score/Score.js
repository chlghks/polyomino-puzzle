import useStore from "../../Store/useStore";
import Text from "../Text/Text";
import { RIGHT_ANGLE } from "../../constants/angles";

export default function Score() {
  const score = useStore((state) => state.score);

  const SCORE = "SCORE";

  return (
    <group position={[40, 3, 0]}>
      <Text
        content={SCORE}
        position={[0, 70, 20]}
        rotation={[-RIGHT_ANGLE / 2, 0, 0]}
        size={3}
        height={0}
        bevelEnabled={true}
        bevelThickness={1}
        bevelSize={0.3}
      />
      <Text
        content={String(score)}
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
