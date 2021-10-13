import { useEffect, useRef, useState } from "react";
import { getDatabase, ref, child, get, push } from "@firebase/database";

import useStore from "../../Store/useStore";
import Text from "../Text/Text";
import NicknameInput from "../NicknameInput/NicknameInput";
import { RIGHT_ANGLE } from "../../constants/angles";

export default function RankingRegistration({ position }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const score = useStore((state) => state.score);
  const input = useRef();

  const REGISTER_SCORE = "Register Score";
  const REGISTER = "REGISTER";
  const RANKING = "ranking";

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
    const parent = child(ref(database), RANKING);
    const nickname = input.current.value;
    const data = {
      nickname,
      score
    };

    await push(parent, data);
    await get(parent);
  };

  return (
    <group position={position}>
      {isRegistering ?
        <>
          <NicknameInput
            ref={input}
            position={[0, 5, 0]}
          />
          <Text
            text={REGISTER}
            position={[0, -7, 12]}
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
          position={[0, 0, 23]}
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
