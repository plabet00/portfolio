import * as THREE from "three";
import { createMachine, createActor, assign } from "xstate";

import {
  WALKING_RIGHT_FRAMES,
  WALKING_LEFT_FRAMES,
  IDLE_FRAMES,
} from "./assets";

const animationMachine = createMachine({
  context: { animationFrames: IDLE_FRAMES, currentFrame: 0 },
  initial: "idle",
  states: {
    idle: {
      on: {
        "moving.start": {
          target: "walking",
          actions: assign({
            animationFrames: ({ event }) =>
              event.isLeft ? WALKING_LEFT_FRAMES : WALKING_RIGHT_FRAMES,
          }),
        },
      },
    },
    walking: {
      on: {
        "moving.stop": {
          target: "idle",
          actions: assign({
            animationFrames: IDLE_FRAMES,
          }),
        },
        "moving.direction_change": {
          actions: assign({
            animationFrames: ({ event }) =>
              event.isLeft ? WALKING_LEFT_FRAMES : WALKING_RIGHT_FRAMES,
          }),
        },
      },
    },
  },
});

const animationActor = createActor(animationMachine).start();
class Character extends THREE.Object3D {
  constructor() {
    super();
    this.clock = new THREE.Clock();
    this.interval = 1 / 10;
    this.elapsedTime = 0;
    this.currentFrame = 0;
    this.material = new THREE.SpriteMaterial({
      map: animationActor.getSnapshot().context.animationFrames[0],
    });
    this.sprite = new THREE.Sprite(this.material);
  }

  move(x) {
    this.sprite.position.x += x;
  }

  animate(currentInput) {
    const stateContext = animationActor.getSnapshot().context;

    if (currentInput === "ArrowRight") {
      animationActor.send({ type: "moving.start" });
      animationActor.send({ type: "moving.direction_change" });
      this.move(0.02);
    } else if (currentInput === "ArrowLeft") {
      animationActor.send({ type: "moving.start", isLeft: true });
      animationActor.send({ type: "moving.direction_change", isLeft: true });
      this.move(-0.02);
    } else {
      animationActor.send({ type: "moving.stop" });
    }

    this.elapsedTime += this.clock.getDelta();

    if (this.elapsedTime > this.interval) {
      this.elapsedTime = 0;
      if (this.currentFrame + 1 < stateContext.animationFrames.length) {
        this.currentFrame = this.currentFrame + 1;
      } else {
        this.currentFrame = 0;
      }
      this.sprite.material.map =
        stateContext.animationFrames[this.currentFrame];
    }
  }
}

export default Character;
