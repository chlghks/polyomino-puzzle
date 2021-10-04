import { useEffect } from "react";
import * as THREE from "three";
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
  const set = useThree(state => state.set);

  scene.background = BLACK;

  useEffect(() => {
    const [LEFT, RIGHT, TOP, BOTTOM, NEAR, FAR] = [-5, 5, 5, -5, 1, 1000];

    const camera = new THREE.OrthographicCamera(LEFT, RIGHT, TOP, BOTTOM, NEAR, FAR);

    camera.position.set(4, 4, 4);

    set({ camera });
  }, [set]);

  return null;
};

export default function Game() {
  return (
    <GameBoard>
      <Canvas>
        <CanvasSetting />
        <Light />
      </Canvas>
    </GameBoard>
  );
}
