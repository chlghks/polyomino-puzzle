import styled, { createGlobalStyle } from "styled-components";
import { Canvas } from "@react-three/fiber";

import Camera from "../Camera/Camera";
import Scene from "../Scene/Scene";
import Light from "../Light/Light";
import Main from "../Main/Main";
import Ranking from "../Ranking/Ranking";
import Game from "../Game/Game";
import GameOver from "../GameOver/GameOver";

import { BLACK } from "../../constants/colors";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const CanvasBoard = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <CanvasBoard>
        <Canvas orthographic={true}>
          <Scene backgroundColor={BLACK} />
          <Camera />
          <Light />
          <Main />
          <Ranking />
          <Game />
          <GameOver />
        </Canvas>
      </CanvasBoard>
    </>
  );
}
