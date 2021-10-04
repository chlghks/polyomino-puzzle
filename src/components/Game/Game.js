import { Canvas, useThree } from "@react-three/fiber";
import styled from "styled-components";

import Light from "../Light/Light";
import { BLACK } from "../../constants/Colors";

const GameBoard = styled.div`
  width: 600px;
  height: 700px;
  margin: 0 auto;
`;

const CanvasSetting = () => {
  const scene = useThree(state => state.scene);

  scene.background = BLACK;

  return null;
};

export default function Game() {
  return (
    <GameBoard>
      <Canvas
        camera={{ position: [4, 4, 4] }}>
        <CanvasSetting />
        <Light />
      </Canvas>
    </GameBoard>
  );
}
