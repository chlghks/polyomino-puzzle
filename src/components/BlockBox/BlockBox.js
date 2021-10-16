import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import useStore from "../../Store/useStore";
import Block from "../Block/Block";

export default function BlockBox({ blockOption, cubePositions, blockPosition, rotation, edgeLength, height, color }) {
  const selectBlock = useStore((state) => state.selectBlock);
  const [hasSelected, setHasSelected] = useState(false);
  const block = useRef();

  useEffect(() => (
    useStore.subscribe(() => {
      if (!hasSelected) {
        return;
      }

      block.current.visible = true;

      setHasSelected(false);
    }, (state) => state.selectedBlock)
  ), [hasSelected]);

  const handleSelectBlock = (event) => {
    event.stopPropagation();

    block.current.visible = false;

    setHasSelected(true);
    selectBlock(blockOption);
  };

  return (
    <group
      ref={block}
      userData={blockOption}
      onPointerDown={handleSelectBlock}
    >
      <Block
        cubePositions={cubePositions}
        blockPosition={blockPosition}
        rotation={rotation}
        edgeLength={edgeLength}
        height={height}
        color={color}
      />
    </group>
  );
}

BlockBox.propTypes = {
  blockOption: PropTypes.shape({
    color: PropTypes.PropTypes.objectOf(PropTypes.number).isRequired,
    direction: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  cubePositions: PropTypes.array.isRequired,
  blockPosition: PropTypes.array.isRequired,
  rotation: PropTypes.array.isRequired,
  edgeLength: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.objectOf(PropTypes.number).isRequired,
};
