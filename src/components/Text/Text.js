import { forwardRef } from "react";
import * as THREE from "three";
import PropTypes from "prop-types";

import fontJson from "../../font/helvetiker_regular.typeface.json";

const Text = forwardRef(({ text, position, rotation, size, height, curveSegments, bevelEnabled, bevelThickness, bevelSize, bevelOffset, bevelSegments, onClick }, ref) => {
  const font = new THREE.FontLoader().parse(fontJson);

  const textOptions = {
    font,
    size,
    height,
    curveSegments,
    bevelEnabled,
    bevelThickness,
    bevelSize,
    bevelOffset,
    bevelSegments,
  };

  return (
    <mesh
      ref={ref}
      position={position}
      rotation={rotation}
      onClick={onClick}
    >
      <textGeometry args={[text, textOptions]} />
      <meshNormalMaterial />
    </mesh>
  );
});

Text.propTypes = {
  position: PropTypes.array.isRequired,
  rotation: PropTypes.array.isRequired,
  size: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  curveSegments: PropTypes.number,
  bevelEnabled: PropTypes.bool,
  bevelThickness: PropTypes.number,
  bevelSize: PropTypes.number,
  bevelOffset: PropTypes.number,
  bevelSegments: PropTypes.number,
  onClick: PropTypes.func,
};

Text.defaultProps = {
  curveSegments: 12,
  bevelEnabled: false,
  bevelThickness: 10,
  bevelSize: 8,
  bevelOffset: 0,
  bevelSegments: 3,
  onClick: undefined,
};

export default Text;
