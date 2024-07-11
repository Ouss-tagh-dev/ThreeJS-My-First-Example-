import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 20;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load 3D model in GLB format
const loader = new GLTFLoader();
let model;
loader.load("building.glb", function (gltf) {
  model = gltf.scene;
  model.scale.set(5, 5, 5);
  model.position.x = 5;
  scene.add(model);
});

const cubeSize = 10;
const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
const cubeTexture = new THREE.TextureLoader().load("avatar4.png");
const cubeMaterial = new THREE.MeshBasicMaterial({ map: cubeTexture });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, 0, -cubeSize / 2);
scene.add(cube);

let cubeRotationX = 0.02;
let cubeRotationY = 0.02;

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += cubeRotationX;
  cube.rotation.y += cubeRotationY;
  if (model) {
    model.rotation.x += 0.005;
    model.rotation.y += 0.005;
  }
  renderer.render(scene, camera);
}

animate();
