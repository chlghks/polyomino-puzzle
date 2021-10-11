import styled, { createGlobalStyle } from "styled-components";
import { Canvas } from "@react-three/fiber";

import Camera from "../Camera/Camera";
import Scene from "../Scene/Scene";
import Light from "../Light/Light";
import Main from "../Main/Main";
import Game from "../Game/Game";
import GameOver from "../GameOver/GameOver";
import { BLACK } from "../../constants/colors";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const CanvasBoard = styled.div`
  width: 600px;
  height: 700px;
  margin: 0 auto;
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <CanvasBoard>
        <Canvas>
          <Scene backgroundColor={BLACK} />
          <Camera
            left={-65}
            right={65}
            top={65}
            bottom={-65}
            near={0}
            far={255}
            lookAt={[0, 0, 0]}
          />
          <Light />
          <Main />
          <Game />
          <GameOver />
        </Canvas>
      </CanvasBoard>
    </>
  );
}
