import { useRef } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

import useStore from "../../Store/useStore";
import Box from "../Box/Box";
import SelectedArea from "../SelectedArea/SelectedArea";
import { RIGHT_ANGLE } from "../../constants/angles";
import { RED } from "../../constants/colors";

const geometry = new THREE.PlaneGeometry(575, 1050);

geometry.rotateX(- RIGHT_ANGLE);
geometry.rotateY(RIGHT_ANGLE / 2);

const material = new THREE.MeshBasicMaterial();

const object = new THREE.Mesh(geometry, material);

const objects = [object];

export default function Board({ offsetHeight, width, height, depth, edgeLength }) {
  const { width: canvasWidth, height: canvasHeight } = useThree(state => state.size);
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const rotatingAmount = useStore((state) => state.angle);
  const selectArea = useRef();
  const boxGroup = useRef();
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

  const showSelectedArea = ({ offsetX, offsetY, camera }) => {
    const [mouseX, mouseY] = [(offsetX / canvasWidth) * 2 - 1, - (offsetY / canvasHeight) * 2 + 1];

    mouse.set(mouseX, mouseY);
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(objects, false);

    if (intersects.length > 0) {
      const intersect = intersects[0];
      const copyPosition = intersect.point;
      const addPosition = intersect.face.normal;

      selectArea.current.position
        .copy(copyPosition)
        .add(addPosition)
        .divideScalar(10)
        .floor()
        .multiplyScalar(10)
        .addScalar(5);

      selectArea.current.position.y = offsetHeight + 1.1;
    }
  };

  return (
    <>
      <group
        ref={boxGroup}
        position={[0, offsetHeight, 0]}
      >
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
      <mesh
        ref={selectArea}
        position={[0, offsetHeight, 0]}
        onPointerMove={showSelectedArea}
        rotation={[-RIGHT_ANGLE, 0, 0]}
      >
        <planeGeometry args={[10 * edgeLength, 10 * edgeLength]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      <SelectedArea
        ref={selectArea}
        rotation={[0, RIGHT_ANGLE, 0]}
        color={RED}
      />
    </>
  );
}

Board.propTypes = {
  offsetHeight: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  edgeLength: PropTypes.number.isRequired,
};
