import { useRef } from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import PropTypes from "prop-types";

import useStore from "../../Store/useStore";
import Block from "../Block/Block";
import { WHITE } from "../../constants/colors";
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

export default function BlockContainer({ edgeLength, height, boxColor, isOutLine, outLineColor }) {
  const selectBlock = useStore((state) => state.selectBlock);
  const blockList = useStore((state) => state.blockList);
  const blockContainer = useRef();

  const handleSelectBlock = (event) => {
    event.stopPropagation();

    const block = event.eventObject.userData;

    selectBlock(block);
  };

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
  const lineLength = 45;

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

  const points = pointsPath.curves.reduce((points, curve) => [...points, ...curve.getPoints(6)], []);

  return (
    <>
      <group
        position={[68, -5, -68]}
        rotation={[0, RIGHT_ANGLE / 3, 0]}
      >
        <Line
          points={points}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          color={WHITE}
          lineWidth={4}
          visible={false}
        />
        <group ref={blockContainer}>
          {blockList.map((block, index) => {
            const { type, direction } = block;
            const rotationY = RIGHT_ANGLE / -3 - RIGHT_ANGLE * 4 * direction;
            const cubePositions = blocks[type];
            const fraction = index / blockList.length;
            const currentPosition = pointsPath.getPoint(fraction);
            const blockPosition = Object.values(currentPosition);

            return (
              <group
                key={index}
                userData={block}
                onPointerDown={handleSelectBlock}
              >
                <Block
                  cubePositions={cubePositions}
                  blockPosition={blockPosition}
                  rotation={[0, rotationY, 0]}
                  edgeLength={edgeLength}
                  height={height}
                  boxColor={boxColor}
                  isOutLine={isOutLine}
                  outLineColor={outLineColor}
                />
              </group>
            );
          })}
        </group>
        <mesh
          position={[0, 0, 0]}
          rotation={[0, RIGHT_ANGLE / 6, 0]}
          onWheel={handleScroll}
          visible={false}
        >
          <planeGeometry args={[50, 120]} />
          <meshBasicMaterial />
        </mesh>
      </group>
    </>
  );
};

BlockContainer.propTypes = {
  edgeLength: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  boxColor: PropTypes.string.isRequired,
  isOutLine: PropTypes.bool.isRequired,
  outLineColor: PropTypes.string.isRequired,
};
