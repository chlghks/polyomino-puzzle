import { useEffect } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

import {
  TIMER_SOUND,
  BACKGROUND_SOUND,
  ADDING_BLOCK_SOUND,
  REMOVING_BLOCK_SOUND,
} from "../../constants/sounds";

export default function Audio() {
  const camera = useThree((state) => state.camera);
  const scene = useThree((state) => state.scene);

  const backgroundSoundFile = "sounds/backgroundSound1.mp3";
  const removingBlockFile = "sounds/removeBlock.mp3";
  const addingBlockFile = "sounds/addBlock.mp3";
  const timerSoundFile = "sounds/timer.mp3";
  const AUDIO = "audio";

  useEffect(() => {
    const soundListener = new THREE.AudioListener();

    camera.add(soundListener);

    const audio = new THREE.Group();

    audio.name = AUDIO;
    scene.add(audio);

    const backgroundSound = new THREE.Audio(soundListener);

    backgroundSound.name = BACKGROUND_SOUND;

    const loader = new THREE.AudioLoader();

    loader.load(
      backgroundSoundFile,
      (buffer) => {
        backgroundSound.setBuffer(buffer);
        backgroundSound.setLoop(true);

        audio.add(backgroundSound);
      }
    );

    const timerSound = new THREE.Audio(soundListener);

    timerSound.name = TIMER_SOUND;

    loader.load(
      timerSoundFile,
      (buffer) => {
        timerSound.setBuffer(buffer);
        timerSound.setLoop(true);

        audio.add(timerSound);
      }
    );

    const addingBlockSound = new THREE.Audio(soundListener);

    addingBlockSound.name = ADDING_BLOCK_SOUND;

    loader.load(
      addingBlockFile,
      (buffer) => {
        addingBlockSound.setBuffer(buffer);

        audio.add(addingBlockSound);
      }
    );

    const removingBlockSound = new THREE.Audio(soundListener);

    removingBlockSound.name = REMOVING_BLOCK_SOUND;

    loader.load(
      removingBlockFile,
      (buffer) => {
        removingBlockSound.setBuffer(buffer);

        audio.add(removingBlockSound);
      }
    );
  }, [camera, scene]);

  return null;
}
