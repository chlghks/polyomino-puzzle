import { forwardRef, useState } from "react";
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

  const points = [[0, 0, 0], [0, -10, 0], [50, -10, 0], [50, 0, 0], [0, 0, 0]];

  const renderInputValue = ({ target }) => {
    setInputValue(target.value);
  };

  return (
    <group position={position}>
      <Line
        points={points}
        position={[0, 5, 25]}
        rotation={[0, RIGHT_ANGLE, 0]}
        color={WHITE}
        lineWidth={4}
      />
      <Text
        content={inputValue}
        position={[0, 0, 0]}
        rotation={[0, RIGHT_ANGLE, 0]}
        size={4}
        height={3}
        bevelEnabled={true}
        bevelThickness={2}
        bevelSize={0.4}
        bevelSegments={10}
      />
      <Html position={[0, 5, 25]}>
        <InvisibleInput
          ref={ref}
          onChange={renderInputValue}
        />
      </Html>
    </group>
  );
});

export default NicknameInput;
