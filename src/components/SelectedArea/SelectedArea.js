import { forwardRef } from "react";
import PropTypes from "prop-types";

import { RIGHT_ANGLE } from "../../constants/angles";

const SelectedArea = forwardRef(({ edgeLength, count, color }, ref) => {
  return (
    <group
      ref={ref}
    >
      {Array(count).fill(null).map((_, index) => (
        <mesh
          key={index}
          rotation={[- RIGHT_ANGLE, 0, 0]}
          visible={false}
        >
          <planeGeometry args={[edgeLength, edgeLength]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
});

SelectedArea.propTypes = {
  edgeLength: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default SelectedArea;
