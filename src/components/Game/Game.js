import { useEffect } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import styled from "styled-components";

import Light from "../Light/Light";
import Board from "../Board/Board";
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
    const [LEFT, RIGHT, TOP, BOTTOM, NEAR, FAR] = [-50, 50, 50, -50, 0, 1000];

    const camera = new THREE.OrthographicCamera(LEFT, RIGHT, TOP, BOTTOM, NEAR, FAR);

    camera.position.set(50, 40, 50);
    camera.lookAt(0, 0, 0);

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
        <Board width={10} height={2} depth={10} edgeLength={5}/>
      </Canvas>
    </GameBoard>
  );
}
