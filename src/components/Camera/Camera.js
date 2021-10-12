import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import PropTypes from "prop-types";
import useStore from "../../Store/useStore";

export default function Camera({ left, right, top, bottom, near, far, lookAt }) {
  const set = useThree((state) => state.set);
  const cameraPosition = useStore((state) => state.cameraPosition);
  const camera = useMemo(() => new THREE.OrthographicCamera(left, right, top, bottom, near, far), [left, right, top, bottom, near, far]);

  useEffect(() => {
    set({ camera });
  }, [set, camera]);

  useFrame(() => {
    const SPEED = 0.08;

    camera.position.lerp(cameraPosition, SPEED);
    camera.lookAt(...lookAt);
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
