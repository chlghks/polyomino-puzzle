import { useEffect, useRef, useState } from "react";
import { getDatabase, ref, child, push } from "@firebase/database";
import PropTypes from "prop-types";

import useStore from "../../Store/useStore";
import Text from "../Text/Text";
import NicknameInput from "../NicknameInput/NicknameInput";
import { PATH_RANKING } from "../../constants/path";
import { RIGHT_ANGLE } from "../../constants/angles";
import { TITLE_REGISTER } from "../../constants/titles";
import { RANKING } from "../../constants/cameraPositions";

export default function RankingRegistration({ position }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const setCameraPosition = useStore((state) => state.setCameraPosition);
  const score = useStore((state) => state.score);
  const inputValue = useRef();

  const REGISTER_SCORE = "Register Score";

  useEffect(() => (
    useStore.subscribe(() => {
      setIsRegistering(false);
    }, (state) => state.stage)
  ), []);

  const showNicknameInput = () => {
    setIsRegistering(true);
  };

  const registerRanking = async () => {
    const database = getDatabase();
    const parent = child(ref(database), PATH_RANKING);
    const nickname = inputValue.current.value;
    const data = {
      nickname,
      score
    };

    await push(parent, data);

    setCameraPosition(RANKING);
  };

  return (
    <group position={position}>
      {isRegistering ?
        <>
          <NicknameInput
            ref={inputValue}
            position={[0, 5, 0]}
          />
          <Text
            text={TITLE_REGISTER}
            position={[0, -7, 0]}
            rotation={[0, RIGHT_ANGLE, 0]}
            size={3.8}
            height={3}
            bevelEnabled={true}
            bevelThickness={2}
            bevelSize={0.4}
            bevelSegments={10}
            onClick={registerRanking}
          />
        </>
        :
        <Text
          text={REGISTER_SCORE}
          position={[0, 0, 0]}
          rotation={[0, RIGHT_ANGLE, 0]}
          size={5}
          height={3}
          bevelEnabled={true}
          bevelThickness={2}
          bevelSize={0.4}
          bevelSegments={10}
          onClick={showNicknameInput}
        />
      }
    </group>
  );
}

RankingRegistration.propTypes ={
  position: PropTypes.array.isRequired,
};
