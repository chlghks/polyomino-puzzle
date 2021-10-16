import { useFrame } from "@react-three/fiber";

import useStore from "../../Store/useStore";
import { GAME } from "../../constants/cameraPositions";

const positions = {
  main: { x: 680, y: 0, z: 0 },
  ranking: { x: 680, y: 0, z: 1000 },
  game: { x: 110, y: 75, z: 50 },
  gameOver: { x: 680, y: 0, z: -1000 },
};

export default function Camera() {
  const targetPosition = useStore((state) => state.cameraPosition);

  const { x: targetX, y: targetY, z: targetZ } = positions[targetPosition];

  const isGame = targetPosition === GAME;

  const lookingPoint = isGame ? [30, 0, -30] : [targetX - 100, targetY, targetZ];

  const frustumSize = 130;

  useFrame(({ camera }) => {
    const aspect = window.innerWidth / window.innerHeight;

    const left = frustumSize * aspect / - 2;
    const right = frustumSize * aspect / 2;
    const top = frustumSize / 2;
    const bottom = frustumSize / - 2;
    const zoom = aspect / 1.6 < 1 ? aspect / 1.6 : 1;

    camera.left = left;
    camera.right = right;
    camera.top = top;
    camera.bottom = bottom;
    camera.zoom = zoom;

    const SPEED = 0.08;
    const difference = Math.abs(camera.position.x - targetX);

    camera.position.lerp(positions[targetPosition], SPEED);
    camera.lookAt(...lookingPoint);

    if (difference > 400) {
      camera.position.x = targetX + 400;
      camera.position.z = targetZ + 400;
    }

    camera.updateProjectionMatrix();
  });

  return null;
}
