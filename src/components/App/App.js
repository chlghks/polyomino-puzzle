import { createGlobalStyle } from "styled-components";

import Game from "../Game/Game";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Game />
    </>
  );
}
