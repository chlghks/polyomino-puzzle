import Stage from "../Stage/Stage";
import Timer from "../Timer/Timer";
import Score from "../Score/Score";
import PauseButton from "../PauseButton/PauseButton";

export default function GameHeader() {
  return (
    <group position={[40, 10, 0]}>
      <Stage />
      <Timer />
      <Score />
      <PauseButton />
    </group>
  );
}
