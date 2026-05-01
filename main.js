import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202025);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1.8, 5);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// LIGHTING 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(0, 3, 0);
pointLight.castShadow = true;
scene.add(pointLight);

// TEXTURES 
const textureLoader = new THREE.TextureLoader();

const wood = textureLoader.load('https://threejs.org/examples/textures/hardwood2_diffuse.jpg');
wood.wrapS = wood.wrapT = THREE.RepeatWrapping;
wood.repeat.set(4, 4);

const wallTex = textureLoader.load('https://threejs.org/examples/textures/brick_diffuse.jpg');

// FLOOR 
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({ map: wood })
);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// ================= WALL =================
const wall = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 5),
  new THREE.MeshStandardMaterial({ map: wallTex })
);
wall.position.set(0, 2.5, -5);
scene.add(wall);

// TABLE 
const table = new THREE.Mesh(
  new THREE.BoxGeometry(2, 0.2, 1),
  new THREE.MeshStandardMaterial({ color: 0x8b4513 })
);
table.position.set(0, 1, 0);
table.castShadow = true;
scene.add(table);

// LAMP
const lamp = new THREE.Mesh(
  new THREE.ConeGeometry(0.3, 0.7, 16),
  new THREE.MeshStandardMaterial({ color: 0xffff00 })
);
lamp.position.set(0, 1.6, 0);
lamp.castShadow = true;
scene.add(lamp);

// KEYBOARD CONTROLS 
const keys = {};
document.addEventListener('keydown', (e) => {
  keys[e.key.toLowerCase()] = true;
});
document.addEventListener('keyup', (e) => {
  keys[e.key.toLowerCase()] = false;
});

// rotation (keyboard fallback)
let yaw = 0;
let pitch = 0;

// MOUSE LOOK 
document.body.addEventListener('click', () => {
  document.body.requestPointerLock();
});

document.addEventListener('mousemove', (e) => {
  if (document.pointerLockElement === document.body) {
    yaw -= e.movementX * 0.002;
    pitch -= e.movementY * 0.002;
    pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
  }
});

// CLICK INTERACTION 
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(lamp);

  if (intersects.length > 0) {
    pointLight.visible = !pointLight.visible;
  }
});

// ANIMATION LOOP 
function animate() {
  requestAnimationFrame(animate);

  const speed = 0.05;

  const forward = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw));
  const right = new THREE.Vector3(forward.z, 0, -forward.x);

  // movement
  if (keys['w'] || keys['arrowup']) {
    camera.position.add(forward.clone().multiplyScalar(speed));
  }
  if (keys['s'] || keys['arrowdown']) {
    camera.position.add(forward.clone().multiplyScalar(-speed));
  }
  if (keys['a'] || keys['arrowleft']) {
    camera.position.add(right.clone().multiplyScalar(-speed));
  }
  if (keys['d'] || keys['arrowright']) {
    camera.position.add(right.clone().multiplyScalar(speed));
  }

  // keyboard rotation 
  if (keys['q']) yaw += 0.03;
  if (keys['e']) yaw -= 0.03;

  camera.rotation.order = 'YXZ';
  camera.rotation.y = yaw;
  camera.rotation.x = pitch;

  renderer.render(scene, camera);
}
animate();

// RESIZE 
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});