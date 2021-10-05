import { useRef } from "react";
import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";

import Box from "../Box/Box";
import useStore from "../../Store/useStore";

export default function Board({ offsetHeight, width, height, depth, edgeLength }) {
  const boxGroup = useRef();
  const rotatingAmount = useStore((state) => state.angle);

  const positions = [];
  const OFFSET_WIDTH = width / -2 * edgeLength + 5;
  const OFFSET_DEPTH = depth / -2 * edgeLength + 5;

  useFrame(() => {
    const { rotation } = boxGroup.current;

    if (Math.abs(rotation.y - rotatingAmount) < 0.05) {
      rotation.y = rotatingAmount;
    } else if (rotation.y < rotatingAmount) {
      rotation.y += 0.05;
    } else if (rotation.y > rotatingAmount) {
      rotation.y -= 0.05;
    }
  });

  for (let i = 0; i < edgeLength; i++) {
    for (let j = 0; j < edgeLength; j++) {
      const x = width * i + OFFSET_WIDTH;
      const y = 0;
      const z = depth * j + OFFSET_DEPTH;

      const position = [x, y, z];

      positions.push(position);
    }
  }

  return (
    <group ref={boxGroup} position={[0, offsetHeight, 0]}>
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
