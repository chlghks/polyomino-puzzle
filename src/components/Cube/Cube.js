import PropTypes from "prop-types";

export default function Cube({ edgeLength, name, height, position, color }) {
  const size = [edgeLength, height, edgeLength];

  return (
    <mesh
      name={name}
      position={position}
    >
      <boxGeometry args={size} />
      <meshLambertMaterial color={color} />
    </mesh>
  );
}

Cube.propTypes = {
  edgeLength: PropTypes.number.isRequired,
  name: PropTypes.string,
  height: PropTypes.number.isRequired,
  position: PropTypes.array.isRequired,
  color: PropTypes.objectOf(PropTypes.number).isRequired,
};

Cube.defaultType = {
  name: "",
};
