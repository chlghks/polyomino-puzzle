import * as THREE from "three";
import PropTypes from "prop-types";

import useStore from "../../Store/useStore";
import Block from "../Block/Block";
import { RIGHT_ANGLE } from "../../constants/angles";

export default function BlockBox({ position, length, type, edgeLength, height, boxColor, isOutLine, outLineColor }) {
  const selectBlock = useStore((state) => state.selectBlock);

  const handleSelectBlock = (event) => {
    event.stopPropagation();

    selectBlock(type);
  };

  return (
    <group onPointerDown={handleSelectBlock}>
      <mesh position={position}>
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(length, length)]} />
          <lineBasicMaterial />
        </lineSegments>
      </mesh>
      <Block
        type={type}
        position={position}
        rotation={[0, RIGHT_ANGLE / 2, 0]}
        edgeLength={edgeLength}
        height={height}
        boxColor={boxColor}
        isOutLine={isOutLine}
        outLineColor={outLineColor}
      />
    </group>
  );
}

BlockBox.propTypes = {
  position: PropTypes.array.isRequired,
  length: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  edgeLength: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  boxColor: PropTypes.string.isRequired,
  isOutLine: PropTypes.bool.isRequired,
  outLineColor: PropTypes.string.isRequired,
};
