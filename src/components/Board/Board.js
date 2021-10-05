import { useRef } from "react";
import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";

import useStore from "../../Store/useStore";
import Box from "../Box/Box";
import { RIGHT_ANGLE } from "../../constants/angles";

export default function Board({ offsetHeight, width, height, depth, edgeLength }) {
  const boxGroup = useRef();
  const rotatingAmount = useStore((state) => state.angle);

  const positions = [];
  const OFFSET_WIDTH = width / -2 * edgeLength + 5;
  const OFFSET_DEPTH = depth / -2 * edgeLength + 5;

  useFrame(() => {
    const { rotation } = boxGroup.current;
    const SPEED = 0.05;

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

  for (let i = 0; i < edgeLength; i++) {
    for (let j = 0; j < edgeLength; j++) {
      const X = width * i + OFFSET_WIDTH;
      const Y = 0;
      const Z = depth * j + OFFSET_DEPTH;

      const position = [X, Y, Z];

      positions.push(position);
    }
  }

  return (
    <group ref={boxGroup} position={[0, offsetHeight, 0]} rotation={[0, RIGHT_ANGLE / 2, 0]}>
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
  offsetHeight: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  edgeLength: PropTypes.number.isRequired,
};
