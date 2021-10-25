import * as THREE from "three";

const getRandomNumber = (num) => Math.floor(Math.random() * num);

const shuffleList = (list) => {
  const shuffledList = [...list];

  for (let i = 0; i < shuffledList.length; i++) {
    const randomNumber = getRandomNumber(shuffledList.length);

    [shuffledList[i], shuffledList[randomNumber]] = [shuffledList[randomNumber], shuffledList[i]];
  }

  return shuffledList;
};

const checkCube = (board, cube) => {
  const cubeList = [];

  const [x, z] = cube;

  if (board[x + 1]?.[z] === false) cubeList.push([x + 1, z]);
  if (board[x - 1]?.[z] === false) cubeList.push([x - 1, z]);
  if (board[x]?.[z + 1] === false) cubeList.push([x, z + 1]);
  if (board[x]?.[z - 1] === false) cubeList.push([x, z - 1]);

  return cubeList;
};

const getBlock = (board, block, count) => {
  if (count === 0) {
    return block;
  }

  const cubeList = [];

  block.forEach((cube) => cubeList.push(...checkCube(board, cube)));

  const priorityCube = cubeList.filter((cube) => checkCube(board, cube).length < 2);

  const hasPriority = priorityCube.length;

  const selectedCube = hasPriority
    ? priorityCube[0]
    : cubeList[getRandomNumber(cubeList.length)];

  const [x, z] = selectedCube;

  board[x][z] = true;

  block.push(selectedCube);

  return getBlock(board, block, count - 1);
};

const getBlockList = (length) => {
  const cubeCountList = [2, 3, 3, 4, 4];

  const shuffledList = shuffleList(cubeCountList);

  const board = Array(length)
    .fill(0)
    .map(() => Array(length).fill(false));

  const blocks = [];

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      const [x, z] = [i, j];

      if (board[x][z]) continue;

      board[x][z] = true;

      const cube = [x, z];
      const cubeCount = shuffledList.pop() - 1;

      const block = getBlock(board, [cube], cubeCount);

      const isInvalid = block.length === 1;

      if (isInvalid) {
        return getBlockList(length);
      }

      blocks.push(block);
    }
  }

  const blockOptionList = blocks.map((block, index) => {
    const x = { min: block[0][0], max: block[0][0] };
    const z = { min: block[0][1], max: block[0][1] };

    for (let i = 1; i < block.length; i++) {
      if (x.min > block[i][0]) x.min = block[i][0];
      if (x.max < block[i][0]) x.max = block[i][0];

      if (z.min > block[i][1]) z.min = block[i][1];
      if (z.max < block[i][1]) z.max = block[i][1];
    }

    const offset = {
      x: Math.floor((x.min + x.max) / 2),
      z: Math.floor((z.min + z.max) / 2),
    };

    const y = 0;

    const cubePositions = block.map((cube) => {
      const CUBE_LENGTH = 10;

      const x = (cube[0] - offset.x) * CUBE_LENGTH;
      const z = (cube[1] - offset.z) * CUBE_LENGTH;

      return [x, y, z];
    });

    const name = `block${index}`;
    const direction = getRandomNumber(4) * 0.25;
    const newRGB = `rgb(${getRandomNumber(255)}, ${getRandomNumber(255)}, ${getRandomNumber(255)})`;
    const color = new THREE.Color(newRGB);

    return { cubePositions, name, direction, color };
  });

  return blockOptionList;
};

export default getBlockList;
