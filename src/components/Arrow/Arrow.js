import * as THREE from "three";

import useStore from "../../Store/useStore";
import { WHITE } from "../../constants/colors";
import { RIGHT_ANGLE } from "../../constants/angles";

export default function Arrow() {
  const turnRight = useStore((state) => state.turnRight);
  const turnLeft = useStore((state) => state.turnLeft);

  const options = [{
    handleArrowClick: () => turnLeft(),
    position: [-50, 0, 30],
    rotation: [0, 0, 0],
  }, {
    handleArrowClick: () => turnRight(),
    position: [50, 0, 30],
    rotation: [0, RIGHT_ANGLE * 2, 0],
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

  return (
    <>
      {options.map((option) => {
        const { handleArrowClick, position, rotation } = option;

        return (
          <mesh
            key={position.toString()}
            scale={scale}
            onClick={handleArrowClick}
            position={position}
            rotation={rotation}
          >
            <shapeGeometry args={[arrowShape]} />
            <meshBasicMaterial
              color={WHITE}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </>
  );
};
