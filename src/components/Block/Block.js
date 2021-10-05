import { forwardRef } from "react";
import PropTypes from "prop-types";

import Box from "../Box/Box";

const blocks = {
  domino: [[0, 0, 0], [0, 0, 10]],
  trominoI: [[0, 0, 0], [0, 0, 10], [0, 0, 20]],
  trominoL: [[0, 0, 0], [0, 0, -10], [10, 0, 0]],
  tetrominoI: [[0, 0, 0], [0, 0, 10], [0, 0, 20], [0, 0, 30]],
  tetrominoO: [[0, 0, 0], [10, 0, 0], [0, 0, 10], [10, 0, 10]],
  tetrominoT: [[0, 0, 0], [-10, 0, 0], [0, 0, 10], [10, 0, 0]],
  tetrominoJ: [[0, 0, 0], [-10, 0, 0], [10, 0, 0], [10, 0, 10]],
  tetrominoL: [[0, 0, 0], [-10, 0, 0], [10, 0, 0], [-10, 0, 10]],
  tetrominoS: [[0, 0, 0], [10, 0, 0], [0, 0, 10], [-10, 0, 10]],
  tetrominoZ: [[0, 0, 0], [-10, 0, 0], [0, 0, 10], [10, 0, 10]],
};

const Block = forwardRef(({ kind, rotation, width, height, depth, boxColor, isOutLine, outLineColor }, ref) => {
  const block = blocks[kind];

  return (
    <group ref={ref} rotation={rotation}>
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
});

Block.propTypes = {
  kind: PropTypes.string.isRequired,
  rotation: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  boxColor: PropTypes.string.isRequired,
  isOutLine: PropTypes.bool.isRequired,
  outLineColor: PropTypes.string.isRequired,
};

export default Block;
