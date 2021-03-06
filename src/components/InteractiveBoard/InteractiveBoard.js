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
  RED
} from "../../constants/colors";

import {
  ADDING_BLOCK_SOUND,
  REMOVING_BLOCK_SOUND,
} from "../../constants/sounds";

import getBlockList from "../../utils/getBlockList";

const geometry = new THREE.PlaneGeometry(300, 280);

geometry.rotateX(-RIGHT_ANGLE);
geometry.rotateY(RIGHT_ANGLE / 2);

const material = new THREE.MeshBasicMaterial();
const raycasterBoard = new THREE.Mesh(geometry, material);

const raycasterObject = [raycasterBoard];

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

  const cubePositions = selectedBlock?.cubePositions?.map((position) => {
    const convertedPosition = {
      x: position[0],
      y: position[1],
      z: position[2],
    };

    const { x, y, z } = correctPosition(convertedPosition, selectedBlock.direction);

    return [x, y, z];
  });

  const offsetHeight = (stage - 1) * blockHeight;
  const board = scene.getObjectByName(BOARD);
  const addingBlockSound = scene.getObjectByName(ADDING_BLOCK_SOUND);
  const removingBlockSound = scene.getObjectByName(REMOVING_BLOCK_SOUND);

  const isFullBlock = Object.values(boardStatus).every((value) => {
    return value;
  });

  useEffect(() => {
    if (!isFullBlock) {
      return;
    }

    increaseStage();
    resetBoard();

    const blockList = getBlockList(4);

    setBlockList(blockList);
  }, [isFullBlock, increaseStage, resetBoard, setBlockList, stage]);

  const NONE = "none";
  const AUTO = "auto";

  useEffect(() => {
    document.body.style.cursor = selectedBlock ? NONE : AUTO;
  }, [selectedBlock]);

  useFrame(({ mouse }) => {
    if (selectedBlock === null) {
      return null;
    }

    const offsetX = (window.innerWidth / 2) + mouse.x * (window.innerWidth / 2);
    const offsetY = (window.innerHeight / 2) - mouse.y * (window.innerHeight / 2);

    const intersectObject = getIntersectObject(size, offsetX, offsetY, camera, raycasterObject);

    if (intersectObject === null) {
      return;
    }

    const PREVIEW_HEIGHT = 15;
    const SPEED = 0.2;

    const position = intersectObject.point;
    const offsetPosition = intersectObject.face.normal;

    position
      .add(offsetPosition)
      .setY(PREVIEW_HEIGHT);

    previewBlock.current.position
      .setX(position.x)
      .setZ(position.z);

    previewBlock.current.position.lerp(position, SPEED);
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

    const color = new THREE.Color(isValid ? BLACK : RED);

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
    const boardDirection = boardDegree / 360 % 1;

    const validCubePositions = getValidatePosition(cubePositions, offsetPosition, boardDirection, count, boardStatus);

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
      cube.material.color = selectedBlock.color;
    });

    const correctedPosition = correctPosition(offsetPosition, boardDirection);

    block.position
      .copy(correctedPosition)
      .setY(offsetHeight + blockHeight / 2 + boardHeight / 2);

    block.rotateY(-boardRadian);
    block.userData = selectedBlock;

    blockGroup.add(block);

    addingBlockSound.play();

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
    if (!board) {
      return;
    }

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

    removingBlockSound.play();

    updateBoardStatus(returningBlockPositions, false);

    addBlock(returningBlock.userData);

    returningBlock.removeFromParent();
  };

  return (
    <>
      <mesh
        position={[30, 0, -30]}
        rotation={[0, RIGHT_ANGLE / 2, 0]}
        onPointerUp={createBlock}
        onPointerOut={hideSelectedArea}
        onPointerDown={returnBlock}
        onPointerEnter={showSelectedArea}
        onPointerMove={setSelectedArea}
      >
        <planeGeometry args={[edgeLength * 15 * 1.4, edgeLength * 15]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      {selectedBlock && (
        <>
          <SelectedArea
            ref={selectArea}
            edgeLength={edgeLength}
            count={cubePositions.length}
          />
          <group ref={previewBlock}>
            <Block
              cubePositions={cubePositions}
              blockPosition={[0, 0, 0]}
              rotation={[0, 0, 0]}
              edgeLength={edgeLength}
              height={blockHeight}
              color={selectedBlock.color}
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
