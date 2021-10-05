import PropTypes from "prop-types";

import Box from "../Box/Box";

const blocks = {
  domino: [[0, 0, -5], [0, 0, 5]],
  trominoI: [[0, 0, -10], [0, 0, 0], [0, 0, 10]],
  trominoL: [[2.5, 0, 2.5], [2.5, 0, -7.5], [-7.5, 0, 2.5]],
  tetrominoI: [[0, 0, -15], [0, 0, -5], [0, 0, 5], [0, 0, 15]],
  tetrominoO: [[-5, 0, -5], [5, 0, -5], [5, 0, 5], [-5, 0, 5]],
  tetrominoT: [[0, 0, 0], [-10, 0, 0], [0, 0, 10], [10, 0, 0]],
  tetrominoJ: [[-12.5, 0, -2.5], [-2.5, 0, -2.5], [7.5, 0, -2.5], [7.5, 0, 7.5]],
  tetrominoL: [[2.5, 0, -2.5], [-7.5, 0, -2.5], [12.5, 0, -2.5], [-7.5, 0, 7.5]],
  tetrominoS: [[0, 0, -5], [10, 0, -5], [0, 0, 5], [-10, 0, 5]],
  tetrominoZ: [[0, 0, -5], [-10, 0, -5], [0, 0, 5], [10, 0, 5]],
};

export default function Block({ kind, position, rotation, width, height, depth, boxColor, isOutLine, outLineColor }) {
  const block = blocks[kind];

  return (
    <group position={position} rotation={rotation}>
      {block.map((position) => (
        <Box
          key={position.toString()}
          width={width}
          height={height}
          depth={depth}
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
  kind: PropTypes.string.isRequired,
  position: PropTypes.array.isRequired,
  rotation: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  boxColor: PropTypes.string.isRequired,
  isOutLine: PropTypes.bool.isRequired,
  outLineColor: PropTypes.string.isRequired,
};
