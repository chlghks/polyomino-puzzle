import * as THREE from "three";
import PropTypes from "prop-types";

import { BLACK, WHITE } from "../../constants/colors";

export default function Box({ edgeLength, height, position, boxColor, isOutLine, outLineColor }) {
  const size = [edgeLength, height, edgeLength];
  const lineGeometry = new THREE.BoxGeometry(...size);

  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshLambertMaterial color={boxColor}/>
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
  edgeLength: PropTypes.number,
  height: PropTypes.number,
  position: PropTypes.array,
  boxColor: PropTypes.string,
  isOutLine: PropTypes.bool,
  outLineColor: PropTypes.string,
};

Box.defaultProps = {
  edgeLength: 1,
  height: 1,
  position: [0, 0, 0],
  boxColor: WHITE,
  isOutLine: false,
  outLineColor: BLACK,
};
