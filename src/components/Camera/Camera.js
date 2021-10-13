import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import PropTypes from "prop-types";
import useStore from "../../Store/useStore";

export default function Camera({ left, right, top, bottom, near, far, lookAt }) {
  const set = useThree((state) => state.set);
  const targetPosition = useStore((state) => state.cameraPosition);
  const camera = useMemo(() => new THREE.OrthographicCamera(left, right, top, bottom, near, far), [left, right, top, bottom, near, far]);

  useEffect(() => {
    set({ camera });
  }, [set, camera]);

  const { x: targetX, y: targetY, z: targetZ } = targetPosition;

  const isGame = targetX === 80;

  const lookingPoint = isGame ? [0,0,0] : [targetX - 100, targetY, targetZ];

  useFrame(() => {
    const SPEED = 0.08;
    const difference = Math.abs(camera.position.x - targetX);

    camera.position.lerp(targetPosition, SPEED);
    camera.lookAt(...lookingPoint);

    if (difference > 400) {
      camera.position.x = targetX + 400;
      camera.position.z = targetZ + 400;
    }
  });

  return null;
}

Camera.propTypes = {
  left: PropTypes.number.isRequired,
  right: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  bottom: PropTypes.number.isRequired,
  near: PropTypes.number.isRequired,
  far: PropTypes.number.isRequired,
  lookAt: PropTypes.array.isRequired,
};
