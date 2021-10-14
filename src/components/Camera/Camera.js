import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import PropTypes from "prop-types";

import useStore from "../../Store/useStore";
import { GAME } from "../../constants/cameraPositions";

const positions = {
  main: { x: 680, y: 0, z: 0 },
  ranking: { x: 680, y: 0, z: -400 },
  game: { x: 80, y: 60, z: 80 },
  gameOver: { x: 680, y: 0, z: 400 },
};

export default function Camera({ left, right, top, bottom, near, far }) {
  const set = useThree((state) => state.set);
  const targetPosition = useStore((state) => state.cameraPosition);
  const camera = useMemo(() => new THREE.OrthographicCamera(left, right, top, bottom, near, far), [left, right, top, bottom, near, far]);

  useEffect(() => {
    set({ camera });
  }, [set, camera]);

  const { x: targetX, y: targetY, z: targetZ } = positions[targetPosition];

  const isGame = targetPosition === GAME;

  const lookingPoint = isGame ? [0, 0, 0] : [targetX - 100, targetY, targetZ];

  useFrame(() => {
    const SPEED = 0.08;
    const difference = Math.abs(camera.position.x - targetX);

    camera.position.lerp(positions[targetPosition], SPEED);
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
};
