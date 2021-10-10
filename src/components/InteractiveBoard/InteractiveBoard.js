import { useEffect, useRef } from "react";
import * as THREE from "three";
import PropType from "prop-types";
import { useFrame, useThree } from "@react-three/fiber";

import useStore from "../../Store/useStore";
import Block from "../Block/Block";
import SelectedArea from "../SelectedArea/SelectedArea";
import correctPosition from "../../utils/correctPosition";
import convertDegree from "../../utils/convertDegree";
import { RIGHT_ANGLE } from "../../constants/angles";
import { BOARD } from "../../constants/blockTypes";

import {
  BLACK,
  BLUE,
  RED
} from "../../constants/colors";

import {
  DOMINO,
  TETROMINO_I,
  TETROMINO_T,
  TROMINO_I,
  TROMINO_L,
} from "../../constants/blockTypes";

const geometry = new THREE.PlaneGeometry(130, 290);

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

const getPosition = (selectedBlock, size, offsetX, offsetY, camera) => {
  if (selectedBlock === null) {
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
    .add(offsetPosition);

  return position;
};

const validatePosition = (cubePositions, offsetPosition, direction, count, boardStatus) => {
  const validPositions = [];

  cubePositions.forEach((cubePosition) => {
    const convertedCubePosition = {
      x: cubePosition[0] + offsetPosition.x,
      z: cubePosition[2] + offsetPosition.z
    };

    const correctedPosition = correctPosition(convertedCubePosition, direction);

    const X = correctedPosition.x;
    const Z = correctedPosition.z;
    const BOARD_LIMIT = (count - 1) * 5;

    if (Math.abs(X) > BOARD_LIMIT || Math.abs(Z) > BOARD_LIMIT) {
      return;
    }

    const location = [X, Z].toString();

    if (boardStatus[location]) {
      return;
    }

    validPositions.push([X, Z]);
  });

  return validPositions;
};

export default function InteractiveBoard({ boardHeight, blockHeight, edgeLength, count }) {
  const updateBoardStatus = useStore(state => state.updateBoardStatus);
  const increaseStage = useStore(state => state.increaseStage);
  const selectedBlock = useStore(state => state.selectedBlock);
  const unselectBlock = useStore(state => state.unselectBlock);
  const setBlockList = useStore(state => state.setBlockList);
  const boardStatus = useStore(state => state.boardStatus);
  const removeBlock = useStore(state => state.removeBlock);
  const resetBoard = useStore(state => state.resetBoard);
  const addBlock = useStore(state => state.addBlock);
  const stage = useStore(state => state.stage);
  const camera = useThree(state => state.camera);
  const scene = useThree(state => state.scene);
  const size = useThree(state => state.size);
  const previewBlock = useRef(null);
  const selectArea = useRef(null);

  const offsetHeight = (stage - 1) * blockHeight;
  const cubePositions = blocks[selectedBlock];
  const board = scene.getObjectByName(BOARD);

  const isFullBlock = Object.values(boardStatus).every((value) => {
    return value;
  });

  useEffect(() => {
    if (!isFullBlock) {
      return;
    }

    increaseStage();
    resetBoard();

    const mockBlockList = [DOMINO, TROMINO_I, TROMINO_L, TETROMINO_I, TETROMINO_T];

    setBlockList(mockBlockList);
  }, [isFullBlock, increaseStage, resetBoard, setBlockList]);

  useFrame((state) => {
    const offsetX = 300 + state.mouse.x * 300;
    const offsetY = 350 - state.mouse.y * 350;
    const offsetPosition = getPosition(selectedBlock, size, offsetX, offsetY, camera);

    if (offsetPosition === null) {
      return;
    }

    previewBlock.current.position.set(...Object.values(offsetPosition));
    previewBlock.current.position.y = offsetHeight + 15;
  });

  const setSelectedArea = ({ offsetX, offsetY, camera }) => {
    const offsetPosition = getPosition(selectedBlock, size, offsetX, offsetY, camera);

    if (offsetPosition === null) {
      return;
    }

    offsetPosition
      .divideScalar(edgeLength)
      .floor()
      .multiplyScalar(edgeLength)
      .addScalar(5);

    const boardDegree = convertDegree(board.rotation.y);
    const direction = boardDegree / 360 % 1;

    const correctedCubePositions = validatePosition(cubePositions, offsetPosition, direction, count, boardStatus);

    const isInValid = correctedCubePositions.length !== cubePositions.length;

    const color = new THREE.Color(isInValid ? BLACK : RED);

    selectArea.current.children.forEach((area, index) => {
      if (!correctedCubePositions[index]) {
        area.visible = false;

        return;
      }

      area.position.x = correctedCubePositions[index][0];
      area.position.z = correctedCubePositions[index][1];
      area.material.color = color;
      area.visible = true;
    });

    selectArea.current.rotation.y = board.rotation.y;

    selectArea.current.position
      .setY(boardHeight / 2 + 0.1);;
  };

  const createBlock = ({ offsetX, offsetY, camera }) => {
    const offsetPosition = getPosition(selectedBlock, size, offsetX, offsetY, camera);

    if (offsetPosition === null) {
      return;
    }

    offsetPosition
      .divideScalar(edgeLength)
      .floor()
      .multiplyScalar(edgeLength)
      .addScalar(5);

    const boardDegree = convertDegree(board.rotation.y);
    const direction = boardDegree / 360 % 1;

    const correctedCubePositions = validatePosition(cubePositions, offsetPosition, direction, count, boardStatus);

    const isInValid = correctedCubePositions.length !== cubePositions.length;

    if (isInValid) {
      unselectBlock();

      return;
    }

    const block = new THREE.Group().copy(previewBlock.current.children[0]);

    block.children.forEach((cube) => {
      cube.material.color = new THREE.Color(BLUE);
    });

    const correctedPosition = correctPosition(offsetPosition, direction);

    block.position
      .copy(correctedPosition)
      .setY(offsetHeight + blockHeight / 2 + boardHeight / 2);

    block.rotateY(-board.rotation.y);
    block.name = selectedBlock;

    board.add(block);

    unselectBlock();
    removeBlock(selectedBlock);
    updateBoardStatus(correctedCubePositions, true);
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

  const returnBlock = ({ offsetX, offsetY }) => {
    if (selectedBlock !== null) {
      return;
    }

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const { width: canvasWidth, height: canvasHeight } = size;
    const [mouseX, mouseY] = [(offsetX / canvasWidth) * 2 - 1, -(offsetY / canvasHeight) * 2 + 1];

    mouse.set(mouseX, mouseY);

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(board.children, true);

    if (!intersects.length) {
      return;
    }

    const returningBlock = intersects[0].object.parent;
    const isBoard = returningBlock.name === BOARD;

    if (isBoard) {
      return;
    }

    const returningBlockPositions = [];

    returningBlock.children.forEach((cube) => {
      const { x, y, z } = cube.position;

      returningBlockPositions.push([x, y, z]);
    });

    const boardDegree = convertDegree(board.rotation.y);
    const direction = boardDegree / 360 % 1;

    const offsetPosition = getPosition(returningBlock, size, offsetX, offsetY, camera);

    offsetPosition
      .divideScalar(edgeLength)
      .floor()
      .multiplyScalar(edgeLength)
      .addScalar(5);

    const correctedCubeLocations = returningBlockPositions.map((cubePosition) => {
      const convertedCubePosition = {
        x: cubePosition[0] + offsetPosition.x,
        z: cubePosition[2] + offsetPosition.z
      };

      const correctedPosition = correctPosition(convertedCubePosition, direction);

      const X = correctedPosition.x;
      const Z = correctedPosition.z;

      const location = [X, Z].toString();

      return location;
    });

    updateBoardStatus(correctedCubeLocations, false);

    addBlock(returningBlock.name);

    returningBlock.removeFromParent();
  };

  return (
    <>
      <mesh
        position={[0, 0, 0]}
        rotation={[0, RIGHT_ANGLE / 2, 0]}
        onPointerUp={createBlock}
        onPointerOut={hideSelectedArea}
        onPointerDown={returnBlock}
        onPointerEnter={showSelectedArea}
        onPointerMove={setSelectedArea}
      >
        <planeGeometry args={[edgeLength * 15, edgeLength * 15]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      {selectedBlock && (
        <>
          <SelectedArea
            ref={selectArea}
            edgeLength={edgeLength}
            count={cubePositions.length}
            color={RED}
          />
          <group ref={previewBlock}>
            <Block
              cubePositions={cubePositions}
              blockPosition={[0, 0, 0]}
              rotation={[0, 0, 0]}
              edgeLength={edgeLength}
              height={blockHeight}
              boxColor={RED}
              isOutLine={false}
            />
          </group>
        </>
      )}
    </>
  );
}

InteractiveBoard.propType = {
  edgeLength: PropType.number.isRequired,
  boardHeight: PropType.number.isRequired,
  blockHeight: PropType.number.isRequired,
  count: PropType.number.isRequired,
};
