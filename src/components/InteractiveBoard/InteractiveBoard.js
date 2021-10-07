import { useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

import SelectedArea from "../SelectedArea/SelectedArea";
import { RED } from "../../constants/colors";
import { RIGHT_ANGLE } from "../../constants/angles";

const geometry = new THREE.PlaneGeometry(575, 1050);

geometry.rotateX(- RIGHT_ANGLE);
geometry.rotateY(RIGHT_ANGLE / 2);

const material = new THREE.MeshBasicMaterial();

const object = new THREE.Mesh(geometry, material);

const objects = [object];

export default function InteractiveBoard({ offsetHeight, edgeLength }) {
  const { width: canvasWidth, height: canvasHeight } = useThree(state => state.size);
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  const selectArea = useRef();

  const showSelectedArea = ({ offsetX, offsetY, camera }) => {
    const [mouseX, mouseY] = [(offsetX / canvasWidth) * 2 - 1, - (offsetY / canvasHeight) * 2 + 1];

    mouse.set(mouseX, mouseY);
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(objects, false);

    if (intersects.length > 0) {
      const intersect = intersects[0];
      const copyPosition = intersect.point;
      const addPosition = intersect.face.normal;

      selectArea.current.position
        .copy(copyPosition)
        .add(addPosition)
        .divideScalar(10)
        .floor()
        .multiplyScalar(10)
        .addScalar(5);

      selectArea.current.position.y = offsetHeight + 1.1;
    }
  };
  return (
    <>
      <mesh
        ref={selectArea}
        position={[0, offsetHeight, 0]}
        onPointerMove={showSelectedArea}
        rotation={[-RIGHT_ANGLE, 0, 0]}
      >
        <planeGeometry args={[10 * edgeLength, 10 * edgeLength]} />
        <meshBasicMaterial visible={true} />
      </mesh>
      <SelectedArea
        ref={selectArea}
        rotation={[0, RIGHT_ANGLE, 0]}
        color={RED}
      />
    </>
  );
}
