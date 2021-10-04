import PropTypes from "prop-types";

import Box from "../Box/Box";

export default function Board({ width, height, depth, edgeLength }) {
  const positions = [];
  const OFFSET_WIDTH = width / -2 * edgeLength;
  const OFFSET_HEIGHT = height / -2;
  const OFFSET_DEPTH = depth / -2 * edgeLength;
  const positionOffset = [OFFSET_WIDTH, OFFSET_HEIGHT, OFFSET_DEPTH];

  for (let i = 0; i < edgeLength; i++) {
    for (let j = 0; j < edgeLength; j++) {
      const X = width * i;
      const Y = 0;
      const Z = depth * j;

      const position = [X, Y, Z];

      positions.push(position);
    }
  }

  return (
    <group position={positionOffset}>
      {positions.map((position) => (
        <Box
          key={position.toString()}
          width={width}
          height={height}
          depth={depth}
          isOutLine={true}
          position={position}
        />
      ))}
    </group>
  );
}

Board.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  edgeLength: PropTypes.number.isRequired,
};
