import PropTypes from "prop-types";

import Cube from "../Cube/Cube";

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

export default function Block({ type, position, rotation, edgeLength, height, boxColor, isOutLine, outLineColor }) {
  const block = blocks[type];

  return (
    <group position={position} rotation={rotation}>
      {block.map((position) => (
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
  type: PropTypes.string.isRequired,
  position: PropTypes.array.isRequired,
  rotation: PropTypes.array.isRequired,
  edgeLength: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  boxColor: PropTypes.string.isRequired,
  isOutLine: PropTypes.bool.isRequired,
  outLineColor: PropTypes.string.isRequired,
};
