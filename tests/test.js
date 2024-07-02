import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from './js/GLTFLoader.js';
import { RGBELoader } from './js/RGBELoader.js';
import { InteractionManager } from 'three.interactive';
import { gsap } from "gsap";

let selected_element = {}


// const mesh = new THREE.Mesh(
//     new THREE.SphereGeometry(),
//     new THREE.MeshBasicMaterial()
// );
// mesh.geometry.computeBoundingBox();

const stats = new Stats();
stats.dom.style.left = 'auto';
stats.dom.style.right = '0';
stats.dom.style.top = 'auto';
stats.dom.style.bottom = '0';
document.body.appendChild(stats.dom);


const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1; // changed from 1.2
renderer.outputEncoding = THREE.sRGBEncoding;
document.getElementById('container').appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  25,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// camera.position.set(11.011675925552135, 12.01484409108719, -16.173583451058594);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.12;
controls.minDistance = 0.1;
controls.maxDistance = 10000;
// controls.target.set(0, 0, 0);

controls.update();

const loadingManager = new THREE.LoadingManager();
const progressBar = document.getElementById('progress-bar');
if (progressBar) {
  loadingManager.onProgress = function (item, loaded, total) {
    progressBar.style.width = (loaded / total) * 100 + '%';
    progressBar.textContent = (loaded / total) * 100 + '%'
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

const logDiv = document.querySelector('#title .log');
const coordsDiv = document.querySelector('#coords');


var geometry = new THREE.SphereGeometry(5, 12, 8);
// material
var material = new THREE.MeshPhongMaterial({
  color: 0x00ffff,
  flatShading: true,
  transparent: true,
  opacity: 0.7,
});

// mesh
let mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);