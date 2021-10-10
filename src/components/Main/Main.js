import useStore from "../../Store/useStore";
import { RIGHT_ANGLE } from "../../constants/angles";
import { GAME } from "../../constants/cameraPositions";

import {
  DOMINO,
  TROMINO_I,
  TROMINO_L,
  TETROMINO_I,
  TETROMINO_T,
} from "../../constants/blockTypes";

const mockBlockList = [DOMINO, TROMINO_I, TROMINO_L, TETROMINO_I, TETROMINO_T];

export default function Main() {
  const startGame = useStore(state => state.startGame);
  const setBlockList = useStore(state => state.setBlockList);
  const setCameraPosition = useStore(state => state.setCameraPosition);

  const setup = () => {
    setCameraPosition(GAME);
    setBlockList(mockBlockList);
    startGame();
  };

  return (
    <>
      <mesh
        position={[600, 40, 600]}
        rotation={[0, RIGHT_ANGLE / 2, 0]}
        onClick={setup}
      >
        <planeGeometry args={[80, 20]} />
        <meshBasicMaterial />
      </mesh>
      <mesh
        position={[600, 0, 600]}
        rotation={[0, RIGHT_ANGLE / 2, 0]}
      >
        <planeGeometry args={[80, 20]} />
        <meshBasicMaterial />
      </mesh>
      <mesh
        position={[600, -40, 600]}
        rotation={[0, RIGHT_ANGLE / 2, 0]}
      >
        <planeGeometry args={[80, 20]} />
        <meshBasicMaterial />
      </mesh>
    </>
  );
}
