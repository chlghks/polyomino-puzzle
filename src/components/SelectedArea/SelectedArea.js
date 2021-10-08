import { forwardRef } from "react";
import PropTypes from "prop-types";

import { RIGHT_ANGLE } from "../../constants/angles";

const areas = {
  domino: [[0, 0, 10], [0, 0, 0]],
  trominoI: [[0, 0, -10], [0, 0, 0], [0, 0, 10]],
  trominoL: [[0, 0, 0], [0, 0, -10], [-10, 0, 0]],
  tetrominoI: [[0, 0, -10], [0, 0, 0], [0, 0, 10], [0, 0, 20]],
  tetrominoO: [[0, 0, 0], [-10, 0, 0], [0, 0, -10], [-10, 0, -10]],
  tetrominoT: [[0, 0, 0], [-10, 0, 0], [0, 0, 10], [10, 0, 0]],
  tetrominoJ: [[0, 0, 0], [-10, 0, 0], [10, 0, 0], [10, 0, 10]],
  tetrominoL: [[0, 0, 0], [-10, 0, 0], [10, 0, 0], [-10, 0, 10]],
  tetrominoS: [[0, 0, 0], [10, 0, 0], [0, 0, 10], [-10, 0, 10]],
  tetrominoZ: [[0, 0, 0], [-10, 0, 0], [0, 0, 10], [10, 0, 10]],
};

const SelectedArea = forwardRef(({ kind, rotation, color }, ref) => {
  const area = areas[kind];

  return (
    <group
      ref={ref}
      rotation={rotation}
    >
      {area.map((position) => (
        <mesh
          key={position.toString()}
          position={position}
          rotation={[- RIGHT_ANGLE, 0, 0]}
        >
          <planeGeometry args={[10, 10]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
});

SelectedArea.propTypes = {
  kind: PropTypes.string.isRequired,
  rotation: PropTypes.array.isRequired,
  color: PropTypes.string.isRequired,
};

export default SelectedArea;
