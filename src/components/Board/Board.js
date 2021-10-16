import { useRef } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import useStore from "../../Store/useStore";
import Cube from "../Cube/Cube";
import { BOARD } from "../../constants/blockTypes";

export default function Board({ blockPositions, blockHeight, boardHeight, edgeLength }) {
  const rotatingAmount = useStore((state) => state.angle);
  const stage = useStore((state) => state.stage);
  const boxGroup = useRef();
  const offsetHeight = (stage - 1) * blockHeight;

  useFrame(() => {
    const { rotation, position } = boxGroup.current;
    const SPEED = 0.05;

    if (!rotation) {
      return;
    }

    position.lerp({ x: 0, y: -offsetHeight, z: 0 }, 0.07);

    if (Math.abs(rotation.y - rotatingAmount) < SPEED) {
      rotation.y = rotatingAmount;
      return;
    }

    if (rotation.y < rotatingAmount) {
      rotation.y += SPEED;
      return;
    }

    if (rotation.y > rotatingAmount) {
      rotation.y -= SPEED;
    }
  });

  const getColor = (cubeCount, index) => {
    const colorA = new THREE.Color("white");
    const colorB = new THREE.Color("white").addScalar(-0.15);

    return Math.floor(index / Math.sqrt(cubeCount) + index) % 2 ? colorA : colorB;
  };

  return (
    <>
      <group
        ref={boxGroup}
        name={BOARD}
      >
        {blockPositions.map((position, index) => (
          <Cube
            key={position.toString()}
            edgeLength={edgeLength}
            name={BOARD}
            height={boardHeight}
            color={getColor(blockPositions.length, index)}
            position={position}
          />
        ))}
      </group>
    </>
  );
}

Board.propTypes = {
  blockPositions: PropTypes.array.isRequired,
  blockHeight: PropTypes.number.isRequired,
  boardHeight: PropTypes.number.isRequired,
  edgeLength: PropTypes.number.isRequired,
};
