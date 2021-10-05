import * as THREE from "three";

import useStore from "../../Store/useStore";
import { WHITE } from "../../constants/Colors";

export default function Arrow() {
  const { turnRight, turnLeft } = useStore((state) => ({
    turnRight: state.turnRight,
    turnLeft: state.turnLeft
  }));

  const options = [{
    handleArrowClick() { turnLeft(); },
    position: [0, 10, 50],
    rotation: [0, Math.PI * 45 / 180, 0],
  }, {
    handleArrowClick() { turnRight(); },
    position: [50, 10, 0],
    rotation: [0, Math.PI * 225 / 180, 0],
  }];

  const scale = [0.3, 0.3, 0.3];

  const x = 5, y = 5;

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
