import { useRef } from "react";
import * as THREE from "three";
import PropTypes from "prop-types";

import useStore from "../../Store/useStore";
import BlockBox from "../BlockBox/BlockBox";
import { RIGHT_ANGLE } from "../../constants/angles";

export default function BlockContainer({ edgeLength, height }) {
  const blockList = useStore((state) => state.blockList);
  const blockContainer = useRef();

  let scroll = 0;

  const handleScroll = ({ wheelDeltaY }) => {
    const length = blockContainer.current.children.length;
    const SPEED = 0.05;

    if (wheelDeltaY < 0) {
      scroll += SPEED;
    } else {
      scroll -= SPEED;
    }

    if (scroll < 0) {
      scroll = length;
    }

    if (scroll > length) {
      scroll = 0;
    }

    blockContainer.current.children.forEach((row, index) => {
      let offsetValue = index + scroll;

      if (offsetValue < 0) {
        offsetValue = scroll + (length - index);
      }

      if (offsetValue > length) {
        offsetValue = scroll - (length - index);
      }

      let fraction = offsetValue / length;

      if (fraction > 1) {
        fraction = 1;
      }

      const currentPosition = pointsPath.getPoint(fraction);

      row.children[0].position.copy(currentPosition);
    });
  };

  const pointsPath = new THREE.CurvePath();
  const lineLength = 39;

  const firstCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, 0, lineLength),
    new THREE.Vector3(0, lineLength, lineLength),
    new THREE.Vector3(0, lineLength, 0),
  );

  const secondCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, lineLength, 0),
    new THREE.Vector3(0, lineLength, -lineLength),
    new THREE.Vector3(0, 0, -lineLength),
  );

  const thirdCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, 0, -lineLength),
    new THREE.Vector3(0, -lineLength, -lineLength),
    new THREE.Vector3(0, -lineLength, 0),
  );

  const fourthCurve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, -lineLength, 0),
    new THREE.Vector3(0, -lineLength, lineLength),
    new THREE.Vector3(0, 0, lineLength),
  );

  pointsPath.add(firstCurve);
  pointsPath.add(secondCurve);
  pointsPath.add(thirdCurve);
  pointsPath.add(fourthCurve);

  return (
    <>
      <group
        position={[68, -5, -68]}
        rotation={[0, RIGHT_ANGLE / 3, 0]}
      >
        <mesh
          position={[0, 0, 0]}
          rotation={[0, RIGHT_ANGLE / 6, 0]}
          onWheel={handleScroll}
          visible={false}
        >
          <planeGeometry args={[50, 120]} />
          <meshBasicMaterial />
        </mesh>
        <group ref={blockContainer}>
          {blockList.map((blockOption, index) => {
            const { cubePositions, direction, color } = blockOption;
            const rotationY = (RIGHT_ANGLE / -3) - (RIGHT_ANGLE * 4 * direction);
            const fraction = index / blockList.length;
            const currentPosition = pointsPath.getPoint(fraction);
            const blockPosition = Object.values(currentPosition);

            return (
              <BlockBox
                key={index}
                cubePositions={cubePositions}
                blockPosition={blockPosition}
                blockOption={blockOption}
                rotation={[0, rotationY, 0]}
                edgeLength={edgeLength}
                height={height}
                color={color}
              />
            );
          })}
        </group>
      </group>
    </>
  );
};

BlockContainer.propTypes = {
  edgeLength: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
