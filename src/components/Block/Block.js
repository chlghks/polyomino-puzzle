import PropTypes from "prop-types";

import Cube from "../Cube/Cube";

export default function Block({ cubePositions, blockPosition, rotation, edgeLength, height, color }) {

  return (
    <group
      position={blockPosition}
      rotation={rotation}
    >
      {cubePositions.map((position) => (
        <Cube
          key={position.toString()}
          edgeLength={edgeLength}
          height={height}
          position={position}
          color={color}
        />
      ))}
    </group>
  );
};

Block.propTypes = {
  cubePositions: PropTypes.array.isRequired,
  blockPosition: PropTypes.array.isRequired,
  rotation: PropTypes.array.isRequired,
  edgeLength: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.objectOf(PropTypes.number).isRequired,
};
