import { useRef } from "react";
import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";

import useStore from "../../Store/useStore";
import Cube from "../Cube/Cube";
import InteractiveBoard from "../InteractiveBoard/InteractiveBoard";

export default function Board({ offsetHeight, boardHeight, blockHeight, edgeLength, count }) {
  const rotatingAmount = useStore((state) => state.angle);
  const boxGroup = useRef();
  const positions = [];

  const OFFSET_LENGTH = edgeLength / -2 * count + 5;

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

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      const X = edgeLength * i + OFFSET_LENGTH;
      const Y = 0;
      const Z = edgeLength * j + OFFSET_LENGTH;

      const position = [X, Y, Z];

      positions.push(position);
    }
  }

  return (
    <>
      <group
        ref={boxGroup}
        position={[0, offsetHeight, 0]}
      >
        {positions.map((position) => (
          <Cube
            key={position.toString()}
            edgeLength={edgeLength}
            height={boardHeight}
            isOutLine={true}
            position={position}
          />
        ))}
      </group>
      <InteractiveBoard
        offsetHeight={offsetHeight}
        boardHeight={boardHeight}
        blockHeight={blockHeight}
        edgeLength={edgeLength}
        count={count}
      />
    </>
  );
}

Board.propTypes = {
  offsetHeight: PropTypes.number.isRequired,
  boardHeight: PropTypes.number.isRequired,
  blockHeight: PropTypes.number.isRequired,
  edgeLength: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
};
