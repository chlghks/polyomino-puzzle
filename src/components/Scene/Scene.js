import { useThree } from "@react-three/fiber";
import PropTypes from "prop-types";

export default function Scene({ backgroundColor }) {
  const scene = useThree((state) => state.scene);

  scene.background = backgroundColor;

  return null;
}

Scene.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
};
