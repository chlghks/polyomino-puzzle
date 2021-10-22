import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { getDatabase, ref, child, get } from "@firebase/database";
import PropTypes from "prop-types";

import Text from "../Text/Text";
import { PATH_RANKING } from "../../constants/path";
import { RIGHT_ANGLE } from "../../constants/angles";

export default function RankingList({ position }) {
  const [rankingData, setRankingData] = useState(null);
  const rankingList = useRef();

  const SCROLL_BOARD = "scrollBoard";

  useEffect(() => {
    (async () => {
      const database = getDatabase();
      const parent = child(ref(database), PATH_RANKING);
      const dataSnapshot = await get(parent);
      const rankingData = dataSnapshot.val();

      const rankings = [];

      for (const [id, value] of Object.entries(rankingData)) {
        value.id = id;

        rankings.push(value);
      }

      rankings.sort((a, b) => b.score - a.score);

      setRankingData(rankings);
    })();
  }, []);

  const lineLength = rankingData?.length - 10;

  const pointsPath = new THREE.CurvePath();

  const firstLine = new THREE.LineCurve3(
    new THREE.Vector3(lineLength * 7, -7, 0),
    new THREE.Vector3(0, -7, 0)
  );

  const secondLine = new THREE.LineCurve3(
    new THREE.Vector3(0, -7, 0),
    new THREE.Vector3(0, -70, 0)
  );

  const thirdLine = new THREE.LineCurve3(
    new THREE.Vector3(0, -70, 0),
    new THREE.Vector3((lineLength + 1) * 7, -70, 0),
  );

  pointsPath.add(firstLine);
  pointsPath.add(secondLine);
  pointsPath.add(thirdLine);

  let scroll = 0;

  const handleScroll = ({ wheelDeltaY }) => {
    const SPEED = 0.2;

    if (wheelDeltaY > 0) {
      scroll += SPEED;
    } else {
      scroll -= SPEED;
    }

    if (scroll >= 0) {
      scroll = 0;
      return;
    }

    if (scroll <= -lineLength) {
      scroll = -lineLength;
      return;
    }

    rankingList.current.children.forEach((row, index) => {
      const pathLength = lineLength * 2 + 10;
      const offsetValue = lineLength + index + scroll;
      const fraction = 1 / pathLength * offsetValue;

      const currentPosition = pointsPath.getPoint(fraction);

      row.position.copy(currentPosition);
    });
  };

  return (
    <>
      <mesh
        name={SCROLL_BOARD}
        position={[0, -20, 0]}
        rotation={[0, RIGHT_ANGLE, 0]}
        onWheel={handleScroll}
      >
        <planeGeometry args={[100, 80]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      <group
        ref={rankingList}
        position={position}
      >
        {rankingData && rankingData.map((data, index) => {
          const { id, nickname, score } = data;
          const rank = index + 1;
          const pathLength = lineLength * 2 + 10;
          const offsetValue = lineLength + index;
          const fraction = 1 / pathLength * offsetValue;
          const currentPosition = pointsPath.getPoint(fraction);
          const position = Object.values(currentPosition);

          return (
            <group
              key={id}
              position={position}
            >
              <Text
                content={String(rank)}
                position={[0, -10, 40]}
                rotation={[0, RIGHT_ANGLE, 0]}
                size={4}
                height={3}
                bevelEnabled={true}
                bevelThickness={2}
                bevelSize={0.2}
                bevelSegments={10} />
              <Text
                content={nickname}
                position={[0, -10, 3]}
                rotation={[0, RIGHT_ANGLE, 0]}
                size={4}
                height={3}
                bevelEnabled={true}
                bevelThickness={2}
                bevelSize={0.2}
                bevelSegments={10} />
              <Text
                content={String(score)}
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
        })}
      </group>
    </>
  );
}

RankingList.propTypes ={
  position: PropTypes.array.isRequired,
};
