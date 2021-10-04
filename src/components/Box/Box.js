import * as THREE from "three";
import PropTypes from "prop-types";

import { BLACK, WHITE } from "../../constants/Colors";

export default function Box({ width, height, depth, position, boxColor, isOutLine, outLineColor }) {
  const size = [width, height, depth];
  const lineGeometry = new THREE.BoxGeometry(...size);

  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshLambertMaterial color={boxColor} />
      {isOutLine && (
        <lineSegments>
          <edgesGeometry args={[lineGeometry]} />
          <lineBasicMaterial color={outLineColor} />
        </lineSegments>
      )}
    </mesh>
  );
}

Box.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  depth: PropTypes.number,
  position: PropTypes.array,
  boxColor: PropTypes.string,
  isOutLine: PropTypes.bool,
  outLineColor: PropTypes.string,
};

Box.defaultProps = {
  width: 1,
  height: 1,
  depth: 1,
  position: [0, 0, 0],
  boxColor: WHITE,
  isOutLine: false,
  outLineColor: BLACK,
};
