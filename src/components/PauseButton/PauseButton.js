import useStore from "../../Store/useStore";
import { RIGHT_ANGLE } from "../../constants/angles";
import { PAUSE } from "../../constants/cameraPositions";

export default function PauseButton() {
  const setCameraPosition = useStore((state) => state.setCameraPosition);
  const setPauseStatus = useStore((state) => state.setPauseStatus);

  const radius = 4;
  const tube = 0.4;
  const radialSegments = 10;
  const tubularSegments = 50;

  const movePause = () => {
    setPauseStatus(true);
    setCameraPosition(PAUSE);
  };

  return (
    <group
      position={[90, 55, 0]}
      rotation={[-RIGHT_ANGLE / 2, 0, 0]}
    >
      <mesh>
        <torusGeometry args={[radius, tube, radialSegments, tubularSegments]} />
        <meshNormalMaterial />
      </mesh>
      <mesh position={[-1, 0, 0]}>
        <boxGeometry args={[1, 3, 3]} />
        <meshNormalMaterial />
      </mesh>
      <mesh position={[1, 0, 0]}>
        <boxGeometry args={[1, 3, 3]} />
        <meshNormalMaterial />
      </mesh>
      <mesh onClick={movePause}>
        <planeGeometry args={[9, 9]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </group>
  );
}
