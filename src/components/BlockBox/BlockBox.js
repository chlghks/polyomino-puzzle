import * as THREE from "three";
import PropTypes from "prop-types";

import useStore from "../../Store/useStore";
import Block from "../Block/Block";
import { RIGHT_ANGLE } from "../../constants/angles";

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

export default function BlockBox({ position, length, type, edgeLength, height, boxColor, isOutLine, outLineColor }) {
  const selectBlock = useStore((state) => state.selectBlock);
  const cubePositions = blocks[type];

  const handleSelectBlock = (event) => {
    event.stopPropagation();

    selectBlock(type);
  };

  return (
    <group onPointerDown={handleSelectBlock}>
      <mesh position={position}>
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(length, length)]} />
          <lineBasicMaterial />
        </lineSegments>
      </mesh>
      <Block
        cubePositions={cubePositions}
        blockPosition={position}
        rotation={[0, RIGHT_ANGLE * 4 - RIGHT_ANGLE / 3, 0]}
        edgeLength={edgeLength}
        height={height}
        boxColor={boxColor}
        isOutLine={isOutLine}
        outLineColor={outLineColor}
      />
    </group>
  );
}

BlockBox.propTypes = {
  position: PropTypes.array.isRequired,
  length: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  edgeLength: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  boxColor: PropTypes.string.isRequired,
  isOutLine: PropTypes.bool.isRequired,
  outLineColor: PropTypes.string.isRequired,
};
