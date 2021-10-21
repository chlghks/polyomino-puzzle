import styled, { createGlobalStyle } from "styled-components";
import { Canvas } from "@react-three/fiber";

import Camera from "../Camera/Camera";
import Scene from "../Scene/Scene";
import Audio from "../Audio/Audio";
import Light from "../Light/Light";
import Welcome from "../Welcome/Welcome";
import Main from "../Main/Main";
import Ranking from "../Ranking/Ranking";
import Setting from "../Setting/Setting";
import Game from "../Game/Game";
import GameOver from "../GameOver/GameOver";

import useStore from "../../Store/useStore";
import { BLACK } from "../../constants/colors";
import { WELCOME } from "../../constants/cameraPositions";

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
  const cameraPosition = useStore((state) => state.cameraPosition);

  const isWelcome = cameraPosition === WELCOME;

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
          {isWelcome ?
            <Welcome />
            :
            <>
              <Main />
              <Ranking />
              <Setting />
              <Game />
              <GameOver />
            </>
          }
        </Canvas>
      </CanvasBoard>
    </>
  );
}
