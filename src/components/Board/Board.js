import { useRef } from "react";
import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";

import useStore from "../../Store/useStore";
import Cube from "../Cube/Cube";

export default function Board({ blockPositions, offsetHeight, boardHeight, blockHeight, edgeLength, count }) {
  const rotatingAmount = useStore((state) => state.angle);
  const boxGroup = useRef();

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

  return (
    <>
      <group
        ref={boxGroup}
        position={[0, offsetHeight, 0]}
      >
        {blockPositions.map((position) => (
          <Cube
            key={position.toString()}
            edgeLength={edgeLength}
            height={boardHeight}
            isOutLine={true}
            position={position}
          />
        ))}
      </group>
    </>
  );
}

Board.propTypes = {
  blockPositions: PropTypes.array.isRequired,
  offsetHeight: PropTypes.number.isRequired,
  boardHeight: PropTypes.number.isRequired,
  blockHeight: PropTypes.number.isRequired,
  edgeLength: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
};
