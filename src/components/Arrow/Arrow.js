import * as THREE from "three";

import useStore from "../../Store/useStore";
import { RIGHT_ANGLE } from "../../constants/angles";

export default function Arrow() {
  const selectedBlock = useStore((state) => state.selectedBlock);
  const turnRight = useStore((state) => state.turnRight);
  const turnLeft = useStore((state) => state.turnLeft);

  const AUTO = "auto";
  const POINTER = "pointer";

  const options = [{
    handleArrowClick: () => turnLeft(),
    position: [-45, 0, 30],
    rotation: [-0.1, 0, 0],
  }, {
    handleArrowClick: () => turnRight(),
    position: [45, 0, 30],
    rotation: [-0.1, RIGHT_ANGLE * 2, 0],
  }];

  const scale = [0.3, 0.3, 0.3];

  const x = 0, y = 0;

  const arrowShape = new THREE.Shape();

  arrowShape.moveTo(x, y);
  arrowShape.lineTo(x - 8, y - 9);
  arrowShape.lineTo(x - 3, y - 9);
  arrowShape.bezierCurveTo(x - 3, y - 14, x - 3, y - 19, x + 8, y - 19);
  arrowShape.bezierCurveTo(x + 3, y - 19, x + 3, y - 14, x + 3, y - 9);
  arrowShape.lineTo(x + 3, y - 9);
  arrowShape.lineTo(x + 8, y - 9);

  const extrudeSettings = {
    steps: 3,
    depth: 3,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 0.5,
    bevelOffset: 0,
    bevelSegments: 4,
  };

  const changeCursor = (option) => {
    if (selectedBlock) {
      return;
    }

    document.body.style.cursor = option;
  };

  return (
    <>
      {options.map((option) => {
        const { handleArrowClick, position, rotation } = option;

        return (
          <group
            key={position.toString()}
            position={position}
            rotation={rotation}
          >
            <mesh scale={scale}>
              <extrudeGeometry args={[arrowShape, extrudeSettings]} />
              <meshNormalMaterial side={THREE.DoubleSide} />
            </mesh>
            <mesh
              position={[0, -3, 0]}
              onClick={handleArrowClick}
              onPointerOver={() => changeCursor(POINTER)}
              onPointerOut={() => changeCursor(AUTO)}
            >
              <planeGeometry args={[20, 20]} />
              <meshBasicMaterial
                side={THREE.DoubleSide}
                visible={false}
              />
            </mesh>
          </group>
        );
      })}
    </>
  );
};
