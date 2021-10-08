import { Canvas } from "@react-three/fiber";
import styled from "styled-components";

import Scene from "../Scene/Scene";
import Camera from "../Camera/Camera";
import Light from "../Light/Light";
import Board from "../Board/Board";
import Arrow from "../Arrow/Arrow";
import BlockContainer from "../BlockContainer/BlockContainer";
import { RIGHT_ANGLE } from "../../constants/angles";

import {
  BLACK,
  WHITE,
} from "../../constants/colors";

const GameBoard = styled.div`
  width: 600px;
  height: 700px;
  margin: 0 auto;
`;

export default function Game() {
  const COUNT = 6;
  const EDGE_LENGTH = 10;
  const BOARD_HEIGHT = 2;
  const BLOCK_HEIGHT = 6;
  const OFFSET_HEIGHT = 0;

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
          position={[60, 40, 60]}
          lookAt={[0, 0, 0]}
        />
        <Light />
        <Board
          offsetHeight={OFFSET_HEIGHT}
          boardHeight={BOARD_HEIGHT}
          blockHeight={BLOCK_HEIGHT}
          edgeLength={EDGE_LENGTH}
          count={COUNT}
        />
        <object3D rotation={[0, RIGHT_ANGLE / 2, 0]}>
          <Arrow offsetHeight={OFFSET_HEIGHT} />
          <BlockContainer
            edgeLength={EDGE_LENGTH}
            height={BLOCK_HEIGHT}
            boxColor={WHITE}
            isOutLine={true}
            outLineColor={BLACK}
          />
        </object3D>
      </Canvas>
    </GameBoard>
  );
}
