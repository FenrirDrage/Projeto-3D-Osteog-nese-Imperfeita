import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Configuração da cena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeeeeee);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#gl-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// Luzes
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Função para criar um osso (cilindro)
function createBone(length) {
  const geometry = new THREE.CylinderGeometry(0.1, 0.1, length, 16);
  const material = new THREE.MeshStandardMaterial({ color: 0xdddddd });
  const bone = new THREE.Mesh(geometry, material);
  bone.castShadow = true;
  return bone;
}

// Função para criar uma articulação (esfera)
function createJoint() {
  const geometry = new THREE.SphereGeometry(0.2, 16, 16);
  const material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
  const joint = new THREE.Mesh(geometry, material);
  joint.castShadow = true;
  return joint;
}

// Criação do esqueleto com hierarquia


// Espinha (corpo principal)
const spineGroup = new THREE.Object3D();
scene.add(spineGroup);

const spine = createBone(4);
spine.position.y = 2; // Centro da espinha
spineGroup.add(spine);

// Criar a cabeça maior
const headSize = 1; // Tamanho maior para a cabeça
const headGeometry = new THREE.SphereGeometry(headSize, 10, 10); // Tamanho ajustado
const headMaterial = new THREE.MeshBasicMaterial({ color: 0xffe0bd }); // Material para a cabeça
const head = new THREE.Mesh(headGeometry, headMaterial);

// Posicionar a cabeça no topo da espinha
head.position.set(0, 5.1, 0); // Posição acima da espinha
spineGroup.add(head);

// Ombros
const leftShoulder = createJoint();
const rightShoulder = createJoint();
leftShoulder.position.set(-0.5, 3.65, 0);
rightShoulder.position.set(0.5, 3.65, 0);
spineGroup.add(leftShoulder, rightShoulder);

// Braços
const leftUpperArm = createBone(2);
const rightUpperArm = createBone(2);
leftUpperArm.position.set(-1.6, 3, 0);
rightUpperArm.position.set(1.6, 3, 0);
leftUpperArm.rotation.z = -45; // Inclinação do braço
rightUpperArm.rotation.z = 45;
spineGroup.add(leftUpperArm, rightUpperArm);

// Cotovelos
const leftElbow = createJoint();
const rightElbow = createJoint();
leftElbow.position.set(-2.70, 2.30, 0);
rightElbow.position.set(2.70, 2.30, 0);
spineGroup.add(leftElbow, rightElbow);

// Antebraços
const leftForearm = createBone(2);
const rightForearm = createBone(2);
leftForearm.position.set(-2.4, 1.2, 0.5);
rightForearm.position.set(3.6, 1.2, 0);
leftForearm.rotation.z = 15; // Inclinação do antebraço
rightForearm.rotation.z = -15;
leftForearm.rotation.y = 90
rightForearm.rotation.y = -90
spineGroup.add(leftForearm, rightForearm);

// Mãos
const leftHand = createJoint();
const rightHand = createJoint();
leftHand.position.set(-4.7, 0, 0);
rightHand.position.set(4.7, 0, 0);
spineGroup.add(leftHand, rightHand);

// Bacia
const pelvis = createBone(1);
pelvis.position.y = 0;
spineGroup.add(pelvis);

// Quadris
const leftHip = createJoint();
const rightHip = createJoint();
leftHip.position.set(-0.5, -0.7, 0);
rightHip.position.set(0.5, -0.7, 0);
spineGroup.add(leftHip, rightHip);

// Coxas
const leftThigh = createBone(2);
const rightThigh = createBone(2);
leftThigh.position.set(-0.5, -2, 0);
rightThigh.position.set(0.5, -2, 0);
spineGroup.add(leftThigh, rightThigh);

// Joelhos
const leftKnee = createJoint();
const rightKnee = createJoint();
leftKnee.position.set(-0.5, -3.5, 0);
rightKnee.position.set(0.5, -3.5, 0);
spineGroup.add(leftKnee, rightKnee);

// Pernas inferiores
const leftLowerLeg = createBone(2);
const rightLowerLeg = createBone(2);
leftLowerLeg.position.set(-0.5, -4.8, 0);
rightLowerLeg.position.set(0.5, -4.8, 0);
spineGroup.add(leftLowerLeg, rightLowerLeg);

// Pés
const leftFoot = createJoint();
const rightFoot = createJoint();
leftFoot.position.set(-0.5, -6, 0.5);
rightFoot.position.set(0.5, -6, 0.5);
spineGroup.add(leftFoot, rightFoot);

// Controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Loop de animação
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
