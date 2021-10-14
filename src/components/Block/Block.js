import PropTypes from "prop-types";

import Cube from "../Cube/Cube";

export default function Block({ cubePositions, blockPosition, rotation, edgeLength, height, boxColor, isOutLine, outLineColor }) {

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
          boxColor={boxColor}
          isOutLine={isOutLine}
          outLineColor={outLineColor}
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
  boxColor: PropTypes.string.isRequired,
  isOutLine: PropTypes.bool.isRequired,
  outLineColor: PropTypes.string,
};

Block.defaultProps = {
  outLineColor: null,
};
