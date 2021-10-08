import { useRef } from "react";
import * as THREE from "three";
import PropType from "prop-types";
import { useThree } from "@react-three/fiber";

import useStore from "../../Store/useStore";
import SelectedArea from "../SelectedArea/SelectedArea";
import { RED } from "../../constants/colors";
import { RIGHT_ANGLE } from "../../constants/angles";
import convertDegree from "../../utils/convertDegree";
import correctPosition from "../../utils/correctPosition";

const geometry = new THREE.PlaneGeometry(575, 1050);

geometry.rotateX(-RIGHT_ANGLE);
geometry.rotateY(RIGHT_ANGLE / 2);

const material = new THREE.MeshBasicMaterial();

const raycasterObject = [new THREE.Mesh(geometry, material)];

const blocks = {
  domino: [[0, 0, 10], [0, 0, 0]],
  trominoI: [[0, 0, -10], [0, 0, 0], [0, 0, 10]],
  trominoL: [[0, 0, 0], [0, 0, -10], [-10, 0, 0]],
  tetrominoI: [[0, 0, -10], [0, 0, 0], [0, 0, 10], [0, 0, 20]],
  tetrominoO: [[0, 0, 0], [-10, 0, 0], [0, 0, -10], [-10, 0, -10]],
  tetrominoT: [[0, 0, 0], [-10, 0, 0], [0, 0, 10], [10, 0, 0]],
  tetrominoJ: [[0, 0, 0], [-10, 0, 0], [10, 0, 0], [10, 0, 10]],
  tetrominoL: [[0, 0, 0], [-10, 0, 0], [10, 0, 0], [-10, 0, 10]],
  tetrominoS: [[0, 0, 0], [10, 0, 0], [0, 0, 10], [-10, 0, 10]],
  tetrominoZ: [[0, 0, 0], [-10, 0, 0], [0, 0, 10], [10, 0, 10]],
};

export default function InteractiveBoard({ offsetHeight, boardHeight, blockHeight, edgeLength, count }) {
  const selectedBlock = useStore(state => state.selectedBlock);
  const unselectBlock = useStore(state => state.unselectBlock);
  const removeBlock = useStore(state => state.removeBlock);
  const selectArea = useRef(null);
  const scene = useThree(state => state.scene);
  const size = useThree(state => state.size);

  const getPosition = (offsetX, offsetY, camera) => {
    if (selectArea.current === null) {
      return null;
    }

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const { width: canvasWidth, height: canvasHeight } = size;
    const [mouseX, mouseY] = [(offsetX / canvasWidth) * 2 - 1, -(offsetY / canvasHeight) * 2 + 1];

    mouse.set(mouseX, mouseY);
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(raycasterObject, false);

    if (!intersects.length) {
      return null;
    }

    const position = intersects[0].point;
    const offsetPosition = intersects[0].face.normal;

    position
      .add(offsetPosition)
      .divideScalar(edgeLength)
      .floor()
      .multiplyScalar(edgeLength)
      .addScalar(5)
      .setY(offsetHeight + boardHeight / 2 + .1);

    return position;
  };

  const setSelectedAreaPosition = ({ offsetX, offsetY, camera }) => {
    const position = getPosition(offsetX, offsetY, camera);

    if (position === null) {
      return;
    }

    selectArea.current.position.copy(position);
  };

  const createBlock = ({ offsetX, offsetY, camera }) => {
    const createdBlockPosition = getPosition(offsetX, offsetY, camera);

    if (createdBlockPosition === null) {
      return;
    }

    const board = scene.children[2];
    const block = new THREE.Group();

    blocks[selectedBlock].forEach((position) => {
      const geometry = new THREE.BoxGeometry(edgeLength, blockHeight, edgeLength);
      const material = new THREE.MeshLambertMaterial({ color: "blue" });
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(...position);

      return block.add(mesh);
    });

    const boardDegree = convertDegree(board.rotation.y);
    const direction = boardDegree / 360 % 1;
    const correctedPosition = correctPosition(createdBlockPosition, direction);

    block.position
      .copy(correctedPosition)
      .setY(offsetHeight + blockHeight / 2 + boardHeight / 2);

    block.rotateY(RIGHT_ANGLE - board.rotation.y);

    board.add(block);

    removeBlock(selectedBlock);
    unselectBlock();
  };

  const showSelectedArea = () => {
    if (selectedBlock === null) {
      return;
    }

    selectArea.current.visible = true;
  };

  const hideSelectedArea = () => {
    if (selectedBlock === null) {
      return;
    }

    selectArea.current.visible = false;
  };

  return (
    <>
      <mesh
        position={[0, offsetHeight, 0]}
        rotation={[-RIGHT_ANGLE, 0, 0]}
        onPointerUp={createBlock}
        onPointerOut={hideSelectedArea}
        onPointerEnter={showSelectedArea}
        onPointerMove={setSelectedAreaPosition}
      >
        <planeGeometry args={[edgeLength * count, edgeLength * count]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      {selectedBlock && (
        <SelectedArea
          ref={selectArea}
          type={selectedBlock}
          color={RED}
          rotation={[0, RIGHT_ANGLE, 0]}
        />
      )}
    </>
  );
}

InteractiveBoard.propType = {
  offsetHeight: PropType.number.isRequired,
  edgeLength: PropType.number.isRequired,
  boardHeight: PropType.number.isRequired,
  blockHeight: PropType.number.isRequired,
  count: PropType.number.isRequired,
};
