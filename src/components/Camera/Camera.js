import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import PropTypes from "prop-types";

export default function Camera({ left, right, top, bottom, near, far, position, lookAt }) {
  const set = useThree(state => state.set);

  const camera = useMemo(() => new THREE.OrthographicCamera(left, right, top, bottom, near, far), [left, right, top, bottom, near, far]);

  camera.position.set(...position);
  camera.lookAt(...lookAt);

  useEffect(() => {
    set({ camera });
  }, [set, camera]);

  return null;
}

Camera.propTypes = {
  left: PropTypes.number.isRequired,
  right: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  bottom: PropTypes.number.isRequired,
  near: PropTypes.number.isRequired,
  far: PropTypes.number.isRequired,
  position: PropTypes.array.isRequired,
  lookAt: PropTypes.array.isRequired,
};
