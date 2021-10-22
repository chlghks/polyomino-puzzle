import useStore from "../../Store/useStore";
import Text from "../Text/Text";
import RankingTable from "../RankingTable/RankingTable";
import { RIGHT_ANGLE } from "../../constants/angles";
import { TITLE_RANKING } from "../../constants/titles";
import { MAIN } from "../../constants/cameraPositions";

export default function Ranking() {
  const setCameraPosition = useStore((state) => state.setCameraPosition);
  const BACK = "BACK";

  const moveMain = () => {
    setCameraPosition(MAIN);
  };

  return (
    <group
      position={[580, 0, 1000]}
    >
      <Text
        content={BACK}
        position={[0, 55, -45]}
        rotation={[0, RIGHT_ANGLE, 0]}
        size={3}
        height={1}
        bevelEnabled={true}
        bevelThickness={2}
        bevelSize={0.2}
        bevelSegments={10}
        onClick={moveMain}
      />
      <Text
        content={TITLE_RANKING}
        position={[0, 45, 0]}
        rotation={[0, RIGHT_ANGLE, 0]}
        size={8}
        height={3}
        bevelEnabled={true}
        bevelThickness={2}
        bevelSize={0.4}
        bevelSegments={10}
      />
      <RankingTable />
    </group>
  );
}
