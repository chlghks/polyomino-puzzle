import { useRef } from "react";
import PropTypes from "prop-types";

import useStore from "../../Store/useStore";
import BlockBox from "../BlockBox/BlockBox";
import { RIGHT_ANGLE } from "../../constants/angles";

export default function BlockContainer({ edgeLength, height, boxColor, isOutLine, outLineColor }) {
  const blockList = useStore((state) => state.blockList);
  const container = useRef();
  const blockOptions = [];

  const INTERVAL = 40;
  const LEFT_LIMIT = - INTERVAL;
  const RIGHT_LIMIT = - INTERVAL * blockList.length + INTERVAL * 2;
  const SCROLL_LENGTH = INTERVAL * blockList.length;
  const SCROLL_BOARD_X = INTERVAL * blockList.length / 2 - 20;
  const CONTAINER_Y = -15;
  const CONTAINER_Z = 70;
  const BLOCK_BOX_LENGTH = 35;

  for (let i = 0; i < blockList.length; i++) {
    const X = INTERVAL * i;

    const option = {
      position: [X, CONTAINER_Y, CONTAINER_Z],
      type: blockList[i],
    };

    blockOptions.push(option);
  }

  const handleScroll = ({ wheelDeltaX }) => {
    const { position } = container.current;
    const SPEED = 2;

    const scrollableToRight = wheelDeltaX < 0
      && position.x > RIGHT_LIMIT;

    if (scrollableToRight) {
      position.x -= SPEED;

      return;
    }

    const scrollableToLeft = wheelDeltaX > 0
      && position.x + INTERVAL < 0;

    if (scrollableToLeft) {

      position.x += SPEED;
    }
  };

  return (
    <group
      ref={container}
      position={[LEFT_LIMIT, 0, 0]}>
      <mesh
        position={[SCROLL_BOARD_X, CONTAINER_Y, CONTAINER_Z]}
        onWheel={handleScroll}
        visible={false}
      >
        <planeGeometry args={[SCROLL_LENGTH, BLOCK_BOX_LENGTH]} />
        <meshBasicMaterial />
      </mesh>
      {blockOptions.map((option) => {
        const { type, position } = option;
        const key = type + String(position);

        return (
          <BlockBox
            key={key}
            type={type}
            length={BLOCK_BOX_LENGTH}
            position={position}
            rotation={[0, RIGHT_ANGLE / 2, 0]}
            edgeLength={edgeLength}
            height={height}
            boxColor={boxColor}
            isOutLine={isOutLine}
            outLineColor={outLineColor}
          />
        );
      })}
    </group>
  );
};

BlockContainer.propTypes = {
  edgeLength: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  boxColor: PropTypes.string.isRequired,
  isOutLine: PropTypes.bool.isRequired,
  outLineColor: PropTypes.string.isRequired,
};
