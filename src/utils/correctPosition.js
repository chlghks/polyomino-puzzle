const correctPosition = (position, direction) => {
  const correctedPosition = { ...position };
  const north = (direction === 0.5) || (direction === -0.5);
  const east = (direction === 0.25) || (direction === -0.75);
  const west = (direction === 0.75) || (direction === -0.25);
  const { x, z } = correctedPosition;

  switch (true) {
    case east:
      correctedPosition.x = -z;
      correctedPosition.z = x;
      return correctedPosition;
    case west:
      correctedPosition.x = z;
      correctedPosition.z = -x;
      return correctedPosition;
    case north:
      correctedPosition.x = -x;
      correctedPosition.z = -z;
      return correctedPosition;
    default:
      return correctedPosition;
  }
};

export default correctPosition;
