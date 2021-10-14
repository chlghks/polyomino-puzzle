import Stage from "../Stage/Stage";
import Timer from "../Timer/Timer";
import Score from "../Score/Score";

export default function GameHeader() {
  return (
    <group position={[40, 0, 0]}>
      <Stage />
      <Timer />
      <Score />
    </group>
  );
}
