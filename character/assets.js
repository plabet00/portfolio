import * as THREE from "three";

const walkingFramesFiles = [
  "/assets/hero-walk-side/hero-walk-side-1.png",
  "/assets/hero-walk-side/hero-walk-side-2.png",
  "/assets/hero-walk-side/hero-walk-side-3.png",
  "/assets/hero-walk-side/hero-walk-side-4.png",
  "/assets/hero-walk-side/hero-walk-side-5.png",
  "/assets/hero-walk-side/hero-walk-side-6.png",
];

export const WALKING_LEFT_FRAMES = walkingFramesFiles.map((file) => {
  let texture = new THREE.TextureLoader().load(file);
  texture.center.set(0.5, 0.5);
  texture.repeat.set(-1, 1);
  return texture;
});

export const WALKING_RIGHT_FRAMES = walkingFramesFiles.map((file) =>
  new THREE.TextureLoader().load(file)
);

const idleFramesFiles = ["/assets/hero-idle-side/hero-idle-side.png"];

export const IDLE_FRAMES = idleFramesFiles.map((file) =>
  new THREE.TextureLoader().load(file)
);
