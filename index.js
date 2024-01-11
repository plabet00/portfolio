import * as THREE from "three";
import Character from "./character";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

let currentInput = null;

const onDocumentKeyDown = (event) => {
  currentInput = event.key;
};

const onDocumentKeyUp = (event) => {
  if (currentInput === event.key) {
    currentInput = null;
  }
};

const character = new Character();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
document.addEventListener("keydown", onDocumentKeyDown, false);
document.addEventListener("keyup", onDocumentKeyUp, false);

scene.add(character.sprite);

function animate() {
  requestAnimationFrame(animate);
  character.animate(currentInput);

  renderer.render(scene, camera);
}

animate();
