import { Line } from "@react-three/drei";

import useStore from "../../Store/useStore";
import RankingList from "../RankingList/RankingList";
import RankingTableHeader from "../RankingTableHeader/RankingTableHeader";
import { WHITE } from "../../constants/colors";
import { RIGHT_ANGLE } from "../../constants/angles";
import { RANKING } from "../../constants/cameraPositions";

const tablePoints = [[0, 0, 0], [0, -80, 0], [105, -80, 0], [105, 0, 0], [0, 0, 0]];

export default function RankingTable() {
  const cameraPosition = useStore((state) => state.cameraPosition);
  const isLooking = cameraPosition === RANKING;

  return (
    <>
      <Line
        points={tablePoints}
        position={[0, 20, 52.5]}
        rotation={[0, RIGHT_ANGLE, 0]}
        color={WHITE}
        lineWidth={4}
      />
      <RankingTableHeader position={[0, 25, 0]} />
      {isLooking && <RankingList position={[95, 24, 0]} />}
    </>
  );
}
