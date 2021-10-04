import { Canvas } from "@react-three/fiber";
import styled from "styled-components";

import Scene from "../Scene/Scene";
import Camera from "../Camera/Camera";
import Light from "../Light/Light";
import Board from "../Board/Board";
import { BLACK } from "../../constants/Colors";

const GameBoard = styled.div`
  width: 600px;
  height: 700px;
  margin: 0 auto;
`;

export default function Game() {
  return (
    <GameBoard>
      <Canvas>
        <Scene backgroundColor={BLACK} />
        <Camera
          left={-50}
          right={50}
          top={50}
          bottom={-50}
          near={0}
          far={1000}
          position={[50, 40, 50]}
          lookAt={[0, 0, 0]}
        />
        <Light />
        <Board
          width={10}
          height={2}
          depth={10}
          edgeLength={5}
        />
      </Canvas>
    </GameBoard>
  );
}
