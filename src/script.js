import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

// Loading
const textureLoader = new THREE.TextureLoader();
const normalMapTexture = textureLoader.load('/texture/666.jpg');
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(0.2, 30, 30);

// Materials
const material = new THREE.MeshBasicMaterial({
  map: normalMapTexture,
  overdraw: 10,
});
material.metalness = 0.7;
material.roughness = 0.2;

// material.color = new THREE.Color(0x292929);

// Mesh
const sphere = new THREE.Mesh(geometry, material);

scene.add(sphere);

// Lights

const pointLight = new THREE.PointLight(0xca74ff, 20);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
pointLight.position.set(3, -1.32, -0.59);
pointLight.intensity = 10;
scene.add(pointLight);
const light1 = gui.addFolder('Light1');

light1.add(pointLight.position, 'x').min(-3).max(3).step(0.01);
light1.add(pointLight.position, 'y').min(-3).max(3).step(0.01);
light1.add(pointLight.position, 'z').min(-3).max(3).step(0.01);
light1.add(pointLight, 'intensity').min(-3).max(30).step(0.01);

const light1Color = {
  color: 0xff0000,
};

light1.addColor(light1Color, 'color').onChange(() => {
  pointLight.color.set(light1Color.color);
});

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
// scene.add(pointLightHelper);

const pointLight2 = new THREE.PointLight(0x32b979, 2);
pointLight2.position.set(1, 1, 1);
pointLight2.intensity = 10;
scene.add(pointLight2);

const light2 = gui.addFolder('Light2');

light2.add(pointLight2.position, 'x').min(-3).max(3).step(0.01);
light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01);
light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01);
light2.add(pointLight2, 'intensity').min(-3).max(30).step(0.01);

const light2Color = {
  color: 0xff0000,
};

light2.addColor(light2Color, 'color').onChange(() => {
  pointLight2.color.set(light2Color.color);
});

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1);
// scene.add(pointLightHelper2);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  20,
  sizes.width / sizes.height,
  1,
  1000
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const updateSphere = (e) => {
  sphere.position.y = window.scrollY * 0.001;
};

window.addEventListener('scroll', updateSphere);

document.addEventListener('mousemove', onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(e) {
  mouseX = e.clientX - windowX;
  mouseY = e.clientY - windowY;
}

const clock = new THREE.Clock();

const tick = () => {
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  const elapsedTime = clock.getElapsedTime();
  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
  sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x);
  sphere.rotation.z += -0.05 * (targetY - sphere.rotation.x);

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
