import { useEffect, useRef, useState } from "react";
import { getDatabase, ref, child, get, push } from "@firebase/database";

import useStore from "../../Store/useStore";
import Text from "../Text/Text";
import NicknameInput from "../NicknameInput/NicknameInput";
import { RIGHT_ANGLE } from "../../constants/angles";

export default function RankingRegistration() {
  const [isRegistering, setIsRegistering] = useState(false);
  const score = useStore((state) => state.score);
  const test = useRef();
  const database = getDatabase();

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
    const parent = child(ref(database), RANKING);
    const nickname = test.current.value;
    const data = {
      nickname,
      score
    };

    await push(parent, data);
    await get(parent);
  };

  return (
    <>
      {isRegistering ?
        <group>
          <NicknameInput
            ref={test}
            position={[0, -23, 0]}
          />
          <Text
            text={REGISTER}
            position={[-8.5, -38, 8.5]}
            rotation={[0, RIGHT_ANGLE / 2, 0]}
            size={3.8}
            height={3}
            bevelEnabled={true}
            bevelThickness={2}
            bevelSize={0.4}
            bevelSegments={10}
            onClick={registerRanking}
          />
        </group>
        :
        <Text
          text={REGISTER_SCORE}
          position={[-16.5, -27, 16.5]}
          rotation={[0, RIGHT_ANGLE / 2, 0]}
          size={5}
          height={3}
          bevelEnabled={true}
          bevelThickness={2}
          bevelSize={0.4}
          bevelSegments={10}
          onClick={showNicknameInput}
        />
      }
    </>
  );
}
