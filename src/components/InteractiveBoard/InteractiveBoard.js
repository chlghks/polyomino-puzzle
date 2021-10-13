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

const getIntersectObject = (size, offsetX, offsetY, camera, targetObject) => {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const { width: canvasWidth, height: canvasHeight } = size;
  const [mouseX, mouseY] = [(offsetX / canvasWidth) * 2 - 1, -(offsetY / canvasHeight) * 2 + 1];

  mouse.set(mouseX, mouseY);
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(targetObject, true);

  if (!intersects.length) {
    return null;
  }

  return intersects[0];
};

const getPosition = (intersectObject, edgeLength) => {
  const position = intersectObject.point;
  const offsetPosition = intersectObject.face.normal;

  position
    .add(offsetPosition)
    .divideScalar(edgeLength)
    .floor()
    .multiplyScalar(edgeLength)
    .addScalar(5);

  return position;
};

const getValidatePosition = (cubePositions, offsetPosition, direction, count, boardStatus) => {
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

    const isExceed = Math.abs(X) > BOARD_LIMIT || Math.abs(Z) > BOARD_LIMIT;

    if (isExceed) {
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
  const updateBoardStatus = useStore((state) => state.updateBoardStatus);
  const increaseStage = useStore((state) => state.increaseStage);
  const selectedBlock = useStore((state) => state.selectedBlock);
  const unselectBlock = useStore((state) => state.unselectBlock);
  const setBlockList = useStore((state) => state.setBlockList);
  const boardStatus = useStore((state) => state.boardStatus);
  const removeBlock = useStore((state) => state.removeBlock);
  const resetBoard = useStore((state) => state.resetBoard);
  const addBlock = useStore((state) => state.addBlock);
  const stage = useStore((state) => state.stage);
  const camera = useThree((state) => state.camera);
  const scene = useThree((state) => state.scene);
  const size = useThree((state) => state.size);
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
    if (selectedBlock === null) {
      return null;
    }

    const offsetX = 300 + state.mouse.x * 300;
    const offsetY = 350 - state.mouse.y * 350;
    const intersectObject = getIntersectObject(size, offsetX, offsetY, camera, raycasterObject);

    if (intersectObject === null) {
      return;
    }

    const position = intersectObject.point;
    const offsetPosition = intersectObject.face.normal;

    position
      .add(offsetPosition);

    previewBlock.current.position.set(...Object.values(position));
    previewBlock.current.position.y = offsetHeight + 15;
  });

  const setSelectedArea = ({ offsetX, offsetY, camera }) => {
    if (selectedBlock === null) {
      return;
    }

    const intersectObject = getIntersectObject(size, offsetX, offsetY, camera, raycasterObject);

    if (intersectObject === null) {
      return;
    }

    const offsetPosition = getPosition(intersectObject, edgeLength);

    const boardRadian = board.rotation.y;
    const boardDegree = convertDegree(boardRadian);
    const direction = boardDegree / 360 % 1;

    const validCubePositions = getValidatePosition(cubePositions, offsetPosition, direction, count, boardStatus);

    const isValid = validCubePositions.length === cubePositions.length;

    const color = new THREE.Color(isValid ? RED : BLACK);

    selectArea.current.children.forEach((area, index) => {
      if (!validCubePositions[index]) {
        area.visible = false;

        return;
      }

      area.position.x = validCubePositions[index][0];
      area.position.z = validCubePositions[index][1];
      area.material.color = color;
      area.visible = true;
    });

    selectArea.current.rotation.y = boardRadian;

    selectArea.current.position
      .setY(boardHeight / 2 + 0.1);;
  };

  const createBlock = ({ offsetX, offsetY, camera }) => {
    if (selectedBlock === null) {
      return;
    }

    const intersectObject = getIntersectObject(size, offsetX, offsetY, camera, raycasterObject);

    if (intersectObject === null) {
      return;
    }

    const offsetPosition = getPosition(intersectObject, edgeLength);

    const boardRadian = board.rotation.y;
    const boardDegree = convertDegree(boardRadian);
    const direction = boardDegree / 360 % 1;

    const validCubePositions = getValidatePosition(cubePositions, offsetPosition, direction, count, boardStatus);

    const isValid = validCubePositions.length === cubePositions.length;

    if (!isValid) {
      unselectBlock();

      return;
    }

    const blockGroup = board.getObjectByName(stage) || new THREE.Group();

    const isNewBlockGroup = blockGroup.name === "";

    if (isNewBlockGroup) {
      blockGroup.name = stage;
      board.add(blockGroup);
    }

    const block = new THREE.Group().copy(previewBlock.current.children[0]);

    block.children.forEach((cube, index) => {
      const cubeLocation = validCubePositions[index].toString();

      cube.name = cubeLocation;
      cube.material.color = new THREE.Color(BLUE);
    });

    const correctedPosition = correctPosition(offsetPosition, direction);

    block.position
      .copy(correctedPosition)
      .setY(offsetHeight + blockHeight / 2 + boardHeight / 2);

    block.rotateY(-boardRadian);
    block.name = selectedBlock;

    blockGroup.add(block);

    unselectBlock();
    removeBlock(selectedBlock);
    updateBoardStatus(validCubePositions, true);
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

    const intersectObject = getIntersectObject(size, offsetX, offsetY, camera, board.children);

    if (intersectObject === null) {
      return;
    }

    const returningBlock = intersectObject.object.parent;
    const isBoard = returningBlock.name === BOARD;

    if (isBoard) {
      return;
    }

    const isPreviousBlock = returningBlock.parent.name !== stage;

    if (isPreviousBlock) {
      return;
    }

    const returningBlockPositions = [];

    returningBlock.children.forEach((cube) => {
      const cubePosition = cube.name;

      returningBlockPositions.push(cubePosition);
    });

    updateBoardStatus(returningBlockPositions, false);

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
