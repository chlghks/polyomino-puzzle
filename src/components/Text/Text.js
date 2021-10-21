import { forwardRef } from "react";
import * as THREE from "three";
import PropTypes from "prop-types";

import fontJson from "../../font/KenPixel_Regular.json";

const Text = forwardRef(({ content, position, rotation, size, height, curveSegments, bevelEnabled, bevelThickness, bevelSize, bevelOffset, bevelSegments, onClick, interactive }, ref) => {
  const font = new THREE.FontLoader().parse(fontJson);

  const eventDetectorWidth = size * content.length;
  const eventDetectorHeight = size * 1.5;
  const hasEvent = !!onClick;

  const AUTO = "auto";
  const POINTER = "pointer";

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

  const geometry = new THREE.TextGeometry(content, textOptions).center();

  const ChangeCursor = (option) => {
    document.body.style.cursor = option;
  };

  return (
    <group
      ref={ref}
      position={position}
      rotation={rotation}>
      <mesh geometry={geometry}>
        <meshNormalMaterial />
      </mesh>
      {hasEvent && (
        <mesh
          onClick={onClick}
          onPointerUp={() => ChangeCursor(AUTO)}
          onPointerOver={() => ChangeCursor(POINTER)}
          onPointerOut={() => ChangeCursor(AUTO)}
        >
          <planeGeometry args={[eventDetectorWidth, eventDetectorHeight]} />
          <meshBasicMaterial visible={false} />
        </mesh>
      )}
    </group>
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
