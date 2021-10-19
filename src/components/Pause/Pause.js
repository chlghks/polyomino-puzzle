import Text from "../Text/Text";
import useStore from "../../Store/useStore";
import { RIGHT_ANGLE } from "../../constants/angles";
import { TITLE_PAUSE } from "../../constants/titles";

import {
  GAME,
  MAIN,
} from "../../constants/cameraPositions";

export default function Pause() {
  const setCameraPosition = useStore((state) => state.setCameraPosition);
  const setPauseStatus = useStore((state) => state.setPauseStatus);
  const deleteBoard = useStore((state) => state.deleteBoard);
  const resetAngle = useStore((state) => state.resetAngle);
  const endGame = useStore((state) => state.endGame);

  const CONTINUE = "Continue";
  const HOME = "Home";

  const moveGame = () => {
    setPauseStatus(false);
    setCameraPosition(GAME);
  };

  const moveHome = () => {
    endGame();
    resetAngle();
    deleteBoard();
    setPauseStatus(false);
    setCameraPosition(MAIN);
  };

  return (
    <group
      position={[110, -350, 50]}
      rotation={[RIGHT_ANGLE / 90 * 80, RIGHT_ANGLE / 90 * 10, RIGHT_ANGLE / 90 * -44]}
    >
      <Text
        content={TITLE_PAUSE}
        position={[0, 30, 0]}
        rotation={[0, 0, 0]}
        size={10}
        height={1}
        bevelEnabled={true}
        bevelThickness={2}
        bevelSize={0.7}
      />
      <Text
        content={CONTINUE}
        position={[-40, -50, 0]}
        rotation={[0, 0, 0]}
        size={7}
        height={1}
        bevelEnabled={true}
        bevelThickness={2}
        bevelSize={0.4}
        onClick={moveGame}
      />
      <Text
        content={HOME}
        position={[40, -50, 0]}
        rotation={[0, 0, 0]}
        size={7}
        height={1}
        bevelEnabled={true}
        bevelThickness={2}
        bevelSize={0.4}
        onClick={moveHome}
      />
    </group>
  );
}
