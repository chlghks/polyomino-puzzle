import { forwardRef, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import styled from "styled-components";

import Text from "../Text/Text";
import { WHITE } from "../../constants/colors";
import { RIGHT_ANGLE } from "../../constants/angles";

const InvisibleInput = styled.input`
  width: 220px;
  height: 45px;
  opacity: 0;
`;

const NicknameInput = forwardRef(({ position }, ref) => {
  const [inputValue, setInputValue] = useState("");
  const nickname = useRef();

  const points = [[0, 0, 0], [0, -10, 0], [50, -10, 0], [50, 0, 0], [0, 0, 0]];

  const renderInputValue = ({ target }) => {
    setInputValue(target.value);
  };

  useFrame(() => {
    nickname.current.geometry.center();
  });

  return (
    <group position={position}>
      <Line
        points={points}
        position={[-17.5, 5, 17.5]}
        rotation={[0, RIGHT_ANGLE / 2, 0]}
        color={WHITE}
        lineWidth={4}
      />
      <Text
        ref={nickname}
        text={inputValue}
        position={[0, 0, 0]}
        rotation={[RIGHT_ANGLE / 6, RIGHT_ANGLE / 2, RIGHT_ANGLE / 90 * -10]}
        size={4}
        height={3}
        bevelEnabled={true}
        bevelThickness={2}
        bevelSize={0.4}
        bevelSegments={10}
      />
      <Html position={[-17.5, 5, 17.5]}>
        <InvisibleInput
          ref={ref}
          onChange={renderInputValue}
        />
      </Html>
    </group>
  );
});

export default NicknameInput;
