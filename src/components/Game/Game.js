import { Canvas } from "@react-three/fiber";
import styled from "styled-components";

import Scene from "../Scene/Scene";
import Camera from "../Camera/Camera";
import Light from "../Light/Light";
import Board from "../Board/Board";
import Arrow from "../Arrow/Arrow";
import BlockContainer from "../BlockContainer/BlockContainer";

import {
  BLACK,
  WHITE,
} from "../../constants/colors";

import {
  DOMINO,
  TROMINO_I,
  TROMINO_L,
  TETROMINO_I,
  TETROMINO_O,
  TETROMINO_T,
  TETROMINO_J,
  TETROMINO_L,
  TETROMINO_S,
  TETROMINO_Z,
} from "../../constants/blockTypes";

const GameBoard = styled.div`
  width: 600px;
  height: 700px;
  margin: 0 auto;
`;

const mockBlocks = [DOMINO, TROMINO_I, TROMINO_L, TETROMINO_I, TETROMINO_O, TETROMINO_T, TETROMINO_J, TETROMINO_L, TETROMINO_S, TETROMINO_Z];

export default function Game() {
  const width = 10;
  const depth = 10;
  const edgeLength = 5;
  const boardHeight = 2;
  const blockHeight = 6;
  const offsetHeight = 15;

  return (
    <GameBoard>
      <Canvas>
        <Scene backgroundColor={BLACK} />
        <Camera
          left={-65}
          right={65}
          top={65}
          bottom={-65}
          near={0}
          far={150}
          position={[0, 40, 100]}
          lookAt={[0, 0, 0]}
        />
        <Light />
        <Board
          offsetHeight={offsetHeight}
          width={width}
          height={boardHeight}
          depth={depth}
          edgeLength={edgeLength}
        />
        <BlockContainer
          blocks={mockBlocks}
          width={width}
          height={blockHeight}
          depth={depth}
          boxColor={WHITE}
          isOutLine={true}
          outLineColor={BLACK}
        />
        <Arrow />
      </Canvas>
    </GameBoard>
  );
}
