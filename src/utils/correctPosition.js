const correctPosition = (position, direction) => {
  const correctedPosition = { ...position };
  const south = !direction;

  if (south) {
    return correctedPosition;
  }

  const { x, z } = correctedPosition;
  const north = (direction === 0.5) || (direction === -0.5);

  if (north) {
    correctedPosition.x = -x;
    correctedPosition.z = -z;
  }

  const east = (direction === 0.25) || (direction === -0.75);

  if (east) {
    if ((x > 0 && z > 0) || (x < 0 && z < 0)) {
      correctedPosition.x = -z;
      correctedPosition.z = x;
    }

    if ((x > 0 && z < 0) || (x < 0 && z > 0)) {
      correctedPosition.x = -z;
      correctedPosition.z = x;
    }
  }

  const west = (direction === 0.75) || (direction === -0.25);

  if (west) {
    if ((x > 0 && z > 0) || (x < 0 && z < 0)) {
      correctedPosition.x = z;
      correctedPosition.z = -x;
    }

    if ((x > 0 && z < 0) || (x < 0 && z > 0)) {
      correctedPosition.x = z;
      correctedPosition.z = -x;
    }
  }

  return correctedPosition;
};

export default correctPosition;
