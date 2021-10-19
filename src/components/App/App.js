import styled, { createGlobalStyle } from "styled-components";
import { Canvas } from "@react-three/fiber";

import Camera from "../Camera/Camera";
import Scene from "../Scene/Scene";
import Audio from "../Audio/Audio";
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
        <Canvas
          orthographic
          camera={{ far: 300 }}
        >
          <Scene backgroundColor={BLACK} />
          <Camera />
          <Audio />
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
