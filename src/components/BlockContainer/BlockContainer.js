import { useRef, useState } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import BlockBox from "../BlockBox/BlockBox";
import { RIGHT_ANGLE } from "../../constants/angles";

export default function BlockContainer({ blocks, width, height, depth, boxColor, isOutLine, outLineColor }) {
  const vector = new THREE.Vector3();

  const [carouselTarget, setCarouselTarget] = useState(null);
  const container = useRef();

  const blockOptions = [];

  const INTERVAL = 40;
  const LEFT_LIMIT = - INTERVAL;
  const RIGHT_LIMIT = - INTERVAL * blocks.length + INTERVAL * 2;
  const SCROLL_LENGTH = INTERVAL * blocks.length;
  const SCROLL_BOARD_X = INTERVAL * blocks.length / 2 - 20;
  const CONTAINER_Y = -15;
  const CONTAINER_Z = 70;
  const BLOCK_BOX_LENGTH = 35;

  for (let i = 0; i < blocks.length; i++) {
    const X = INTERVAL * i;

    const option = {
      position: [X, CONTAINER_Y, CONTAINER_Z],
      kind: blocks[i],
    };

    blockOptions.push(option);
  }

  useFrame(() => {
    if (carouselTarget === null) {
      return;
    }

    const SPEED = 0.15;
    const { position } = container.current;

    position.lerp(vector.set(carouselTarget, 0, 0), SPEED);

    const bigger = Math.max(position.x, carouselTarget);
    const smaller = Math.min(position.x, carouselTarget);

    if (bigger - smaller < 1) {
      position.x = carouselTarget;

      setCarouselTarget(null);
    }
  });

  const handleScroll = ({ wheelDeltaX }) => {
    if (carouselTarget !== null) {
      return;
    }

    const { position } = container.current;

    const scrollableToRight = wheelDeltaX < 0
      && position.x > RIGHT_LIMIT;

    if (scrollableToRight) {
      setCarouselTarget(position.x - INTERVAL);

      return;
    }

    const scrollableToLeft = wheelDeltaX > 0
      && position.x + INTERVAL < 0;

    if (scrollableToLeft) {
      setCarouselTarget(position.x + INTERVAL);
    }
  };

  return (
    <group ref={container} position={[LEFT_LIMIT, 0, 0]}>
      <mesh
        position={[SCROLL_BOARD_X, CONTAINER_Y, CONTAINER_Z]}
        onWheel={handleScroll}
        visible={false}
      >
        <planeGeometry args={[SCROLL_LENGTH, BLOCK_BOX_LENGTH]} />
        <meshBasicMaterial />
      </mesh>
      {blockOptions.map((option) => {
        const { position, kind } = option;

        return (
          <BlockBox
            key={position.toString()}
            kind={kind}
            length={BLOCK_BOX_LENGTH}
            position={position}
            rotation={[0, RIGHT_ANGLE / 2, 0]}
            width={width}
            height={height}
            depth={depth}
            boxColor={boxColor}
            isOutLine={isOutLine}
            outLineColor={outLineColor} />
        );
      })}
    </group>
  );
};

BlockContainer.propTypes = {
  blocks: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  boxColor: PropTypes.string.isRequired,
  isOutLine: PropTypes.bool.isRequired,
  outLineColor: PropTypes.string.isRequired,
};
