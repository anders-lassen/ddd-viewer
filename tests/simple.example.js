import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { InteractionManager } from 'three.interactive';

const container = document.createElement('div');
container.setAttribute('id', 'container');
document.body.appendChild(container);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0.0, 0.0, 10.0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.12;
controls.minDistance = 0.1;
controls.maxDistance = 10000;
controls.target.set(0, 0, 0);
controls.update();

const loadingManager = new THREE.LoadingManager();
const progressBar = document.getElementById('progress-bar');
if (progressBar) {
  loadingManager.onProgress = function (item, loaded, total) {
    progressBar.style.width = (loaded / total) * 100 + '%';
  };

  loadingManager.onLoad = function () {
    progressBar.style.width = '100%';
    setTimeout(() => {
      progressBar.style.display = 'none';
    }, 500);
  };
}

const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();

const rgbeLoader = new RGBELoader();
rgbeLoader.load('textures/skybox_512px.hdr', (texture) => {
  let envMap = pmremGenerator.fromEquirectangular(texture).texture;
  scene.environment = envMap;
  texture.dispose();
});

rgbeLoader.manager = loadingManager;

const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial();

const cube = new THREE.Mesh(geometry, material);
cube.addEventListener('mouseover', (event) => {
  event.target.material.color.set(0xff0000);
  document.body.style.cursor = 'pointer';
});
cube.addEventListener('mouseout', (event) => {
  event.target.material.color.set(0xffffff);
  document.body.style.cursor = 'default';
});
cube.addEventListener('mousedown', (event) => {
  event.target.scale.set(1.1, 1.1, 1.1);
});
cube.addEventListener('click', (event) => {
  event.target.scale.set(1.0, 1.0, 1.0);
});
scene.add(cube);
interactionManager.add(cube);

const animate = (time) => {
  requestAnimationFrame(animate);

  interactionManager.update();

  renderer.render(scene, camera);
};

animate();