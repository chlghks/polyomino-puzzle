import * as THREE from "three";
import PropTypes from "prop-types";

import useStore from "../../Store/useStore";
import Block from "../Block/Block";
import { RIGHT_ANGLE } from "../../constants/angles";

export default function BlockBox({ position, length, kind, width, height, depth, boxColor, isOutLine, outLineColor }) {
  const selectBlock = useStore((state) => state.selectBlock);

  const handleSelectBlock = (event) => {
    event.stopPropagation();

    selectBlock(kind);
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
        kind={kind}
        position={position}
        rotation={[0, RIGHT_ANGLE / 2, 0]}
        width={width}
        height={height}
        depth={depth}
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
  kind: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  boxColor: PropTypes.string.isRequired,
  isOutLine: PropTypes.bool.isRequired,
  outLineColor: PropTypes.string.isRequired,
};
