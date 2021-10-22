import PropTypes from "prop-types";

import Text from "../Text/Text";
import { RIGHT_ANGLE } from "../../constants/angles";

export default function RankingTableHeader({ position }) {
  const RANK = "Rank";
  const NICKNAME = "Nickname";
  const SCORE = "Score";

  return (
    <group position={position}>
      <Text
        content={RANK}
        position={[0, -10, 40]}
        rotation={[0, RIGHT_ANGLE, 0]}
        size={4}
        height={3}
        bevelEnabled={true}
        bevelThickness={2}
        bevelSize={0.2}
        bevelSegments={10} />
      <Text
        content={NICKNAME}
        position={[0, -10, 3]}
        rotation={[0, RIGHT_ANGLE, 0]}
        size={4}
        height={3}
        bevelEnabled={true}
        bevelThickness={2}
        bevelSize={0.2}
        bevelSegments={10} />
      <Text
        content={SCORE}
        position={[0, -10, -37]}
        rotation={[0, RIGHT_ANGLE, 0]}
        size={4}
        height={3}
        bevelEnabled={true}
        bevelThickness={2}
        bevelSize={0.2}
        bevelSegments={10} />
    </group>
  );
}

RankingTableHeader.propTypes ={
  position: PropTypes.array.isRequired,
};
