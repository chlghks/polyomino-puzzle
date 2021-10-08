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
  const width = 10;
  const depth = 10;
  const edgeLength = 6;
  const boardHeight = 2;
  const blockHeight = 6;
  const offsetHeight = 0;

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
          offsetHeight={offsetHeight}
          width={width}
          height={boardHeight}
          depth={depth}
          edgeLength={edgeLength}
        />
        <object3D rotation={[0, RIGHT_ANGLE / 2, 0]}>
          <Arrow offsetHeight={offsetHeight} />
          <BlockContainer
            width={width}
            height={blockHeight}
            depth={depth}
            boxColor={WHITE}
            isOutLine={true}
            outLineColor={BLACK}
          />
        </object3D>
      </Canvas>
    </GameBoard>
  );
}
