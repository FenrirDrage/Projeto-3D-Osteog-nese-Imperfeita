import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // Corrigido para a importação correta

// Cena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Cor de fundo (céu azul claro)

// Câmara
const camera = new THREE.PerspectiveCamera(
  75, // Campo de visão
  window.innerWidth / window.innerHeight, // Proporção
  0.1, // Distância mínima
  1000 // Distância máxima
);
camera.position.set(0, 2, 5); // Posição inicial da câmara

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // Adiciona o canvas ao body

// Luz ambiente (suave)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Cor branca, intensidade 0.5
scene.add(ambientLight);

// Luz direcional (simulando sol)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5); // Posição da luz direcional
scene.add(directionalLight);

// Grid Helper (grade no chão)
const gridHelper = new THREE.GridHelper(10, 10); // Tamanho e divisões
scene.add(gridHelper);

// Eixos Helper (para orientação)
const axesHelper = new THREE.AxesHelper(5); // Tamanho dos eixos
scene.add(axesHelper);

// Cabeça (crânio)
const headGeometry = new THREE.SphereGeometry(0.4, 32, 32); // Tamanho e resolução
const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // Material branco
const head = new THREE.Mesh(headGeometry, headMaterial);

// Posicionar a cabeça um pouco acima da coluna
head.position.set(0, 2.5, 0); // (x: 0, y: 2.5, z: 0)
scene.add(head);

// Coluna Vertebral (Cilindro)
const spineGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 32); // Raio superior, raio inferior, altura, segmentos
const spineMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // Material branco
const spine = new THREE.Mesh(spineGeometry, spineMaterial);

// Posicionar a coluna na base da cabeça
spine.position.set(0, 1.5, 0);
scene.add(spine);

// Criar uma esfera para representar a articulação na ponta da clavícula
const jointGeometry = new THREE.SphereGeometry(0.1, 32, 32); // Esfera com raio de 0.1
const jointMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Cor vermelha para destacar
const joint = new THREE.Mesh(jointGeometry, jointMaterial);

// Posicionar a esfera de articulação na ponta da clavícula (na posição final das clavículas)
joint.position.set(0.3, 2.1, 0); // Posição final da clavícula direita
// Para a clavícula esquerda, alteramos a posição para o lado esquerdo
const jointLeft = joint.clone();
jointLeft.position.set(-0.3, 2.1, 0); // Posição final da clavícula esquerda

// Adicionar as esferas de articulação à cena
scene.add(joint);
scene.add(jointLeft);

// Clavícula esquerda (ligação entre a escápula esquerda e a coluna)
const clavicleLeftGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 32); // Cilindro fino
const clavicleLeftMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const clavicleLeft = new THREE.Mesh(clavicleLeftGeometry, clavicleLeftMaterial);

// Posicionar a clavícula esquerda
clavicleLeft.position.set(-0.3, 2.1, 0); // Posição à esquerda da escápula
clavicleLeft.rotation.z = Math.PI / 2; // Inclinação na direção Z
scene.add(clavicleLeft);

// Clavícula direita (ligação entre a escápula direita e a coluna)
const clavicleRightGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 32); // Cilindro fino
const clavicleRightMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const clavicleRight = new THREE.Mesh(clavicleRightGeometry, clavicleRightMaterial);

// Posicionar a clavícula direita
clavicleRight.position.set(0.3, 2.1, 0); // Posição à direita da escápula
clavicleRight.rotation.z = -Math.PI / 2; // Inclinação na direção Z (inverso da esquerda)
scene.add(clavicleRight);

// Criar a articulação para o úmero esquerdo (onde o úmero se conecta à clavícula esquerda)
const shoulderJointLeftGeometry = new THREE.SphereGeometry(0.1, 32, 32); // Esfera para a articulação
const shoulderJointLeftMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Cor vermelha para destacar a articulação
const shoulderJointLeft = new THREE.Mesh(shoulderJointLeftGeometry, shoulderJointLeftMaterial);

// Posicionar a articulação na ponta do úmero esquerdo (onde se conecta à clavícula)
shoulderJointLeft.position.set(-0.8, 2.1, 0); // Posição na ponta do úmero esquerdo, na articulação com a clavícula esquerda

// Adicionar a articulação à cena
scene.add(shoulderJointLeft);

// Criar a articulação para o úmero direito (onde o úmero se conecta à clavícula direita)
const shoulderJointRightGeometry = new THREE.SphereGeometry(0.1, 32, 32); // Esfera para a articulação
const shoulderJointRightMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Cor vermelha para destacar a articulação
const shoulderJointRight = new THREE.Mesh(shoulderJointRightGeometry, shoulderJointRightMaterial);

// Posicionar a articulação na ponta do úmero direito (onde se conecta à clavícula)
shoulderJointRight.position.set(0.8, 2.1, 0); // Posição na ponta do úmero direito, na articulação com a clavícula direita

// Adicionar a articulação à cena
scene.add(shoulderJointRight);

// Criar o úmero esquerdo (ligação da articulação da clavícula esquerda até o cotovelo)
const humerusLeftGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32); // Cilindro para o úmero
const humerusLeftMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const humerusLeft = new THREE.Mesh(humerusLeftGeometry, humerusLeftMaterial);

// Posicionar o úmero esquerdo
humerusLeft.position.set(-0.8, 1.5, 0); // Posição da clavícula esquerda
humerusLeft.rotation.z = Math.PI; // Ajuste de rotação para inclinar o úmero para baixo

scene.add(humerusLeft);

// Criar o úmero direito (ligação da articulação da clavícula direita até o cotovelo)
const humerusRightGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32); // Cilindro para o úmero
const humerusRightMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const humerusRight = new THREE.Mesh(humerusRightGeometry, humerusRightMaterial);

// Posicionar o úmero direito
humerusRight.position.set(0.8, 1.5, 0); // Posição da clavícula direita
humerusRight.rotation.z = -Math.PI; // Ajuste de rotação para inclinar o úmero para baixo

scene.add(humerusRight);

// Criar a articulação do cotovelo esquerdo (onde o úmero se conecta ao antebraço)
const elbowJointLeftGeometry = new THREE.SphereGeometry(0.1, 32, 32); // Esfera para a articulação do cotovelo
const elbowJointLeftMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Cor vermelha para destacar a articulação
const elbowJointLeft = new THREE.Mesh(elbowJointLeftGeometry, elbowJointLeftMaterial);

// Posicionar a articulação do cotovelo esquerdo na extremidade do úmero esquerdo
elbowJointLeft.position.set(-0.8, 0.9, 0); // Ajuste para ficar logo abaixo do ombro, onde o cotovelo deve estar

// Adicionar a articulação à cena
scene.add(elbowJointLeft);

// Criar a articulação do cotovelo direito (onde o úmero se conecta ao antebraço)
const elbowJointRightGeometry = new THREE.SphereGeometry(0.1, 32, 32); // Esfera para a articulação do cotovelo
const elbowJointRightMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Cor vermelha para destacar a articulação
const elbowJointRight = new THREE.Mesh(elbowJointRightGeometry, elbowJointRightMaterial);

// Posicionar a articulação do cotovelo direito na extremidade do úmero direito
elbowJointRight.position.set(0.8, 0.9, 0); // Ajuste para ficar logo abaixo do ombro, onde o cotovelo deve estar

// Adicionar a articulação à cena
scene.add(elbowJointRight);

// Criar o rádio esquerdo (osso do antebraço, do cotovelo até a mão)
const radiusLeftGeometry = new THREE.CylinderGeometry(0.1, 0.05, 1, 32); // Cilindro para o rádio
const radiusLeftMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // Cor marrom para o osso
const radiusLeft = new THREE.Mesh(radiusLeftGeometry, radiusLeftMaterial);

// Posicionar o rádio esquerdo na extremidade do cotovelo esquerdo
radiusLeft.position.set(-.8, 0.3, 0); // Posição abaixo do cotovelo esquerdo

// Adicionar o rádio esquerdo à cena
scene.add(radiusLeft);

// Criar o rádio direito (osso do antebraço, do cotovelo até a mão)
const radiusRightGeometry = new THREE.CylinderGeometry(0.1, 0.05, 1, 32); // Cilindro para o rádio
const radiusRightMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // Cor marrom para o osso
const radiusRight = new THREE.Mesh(radiusRightGeometry, radiusRightMaterial);

// Posicionar o rádio direito na extremidade do cotovelo direito
radiusRight.position.set(0.8, 0.3, 0); // Posição abaixo do cotovelo direito

// Adicionar o rádio direito à cena
scene.add(radiusRight);

// Criar a junta do pulso esquerdo
const wristLeftGeometry = new THREE.SphereGeometry(0.06, 32, 32); // Esfera para o pulso
const wristLeftMaterial = new THREE.MeshStandardMaterial({ color: 0xffc0cb }); // Cor rosa claro para destaque
const wristLeft = new THREE.Mesh(wristLeftGeometry, wristLeftMaterial);

// Posicionar a junta do pulso esquerdo
wristLeft.position.set(-0.8, -0.25, 0); // Alinhado com o final do antebraço esquerdo

// Adicionar à cena
scene.add(wristLeft);

// Criar a junta do pulso direito
const wristRightGeometry = new THREE.SphereGeometry(0.06, 32, 32); // Esfera para o pulso
const wristRightMaterial = new THREE.MeshStandardMaterial({ color: 0xffc0cb }); // Cor rosa claro para destaque
const wristRight = new THREE.Mesh(wristRightGeometry, wristRightMaterial);

// Posicionar a junta do pulso direito
wristRight.position.set(0.8, -0.25, 0); // Alinhado com o final do antebraço direito

// Adicionar à cena
scene.add(wristRight);

// Arrays para armazenar as falange joints das mãos
const palmLeftJoints = [];
const palmRightJoints = [];

// Função para criar uma falange joint (articulação da falange) representada por uma esfera
function createFalangeJoint(position) {
  const jointGeometry = new THREE.SphereGeometry(0.015, 16, 16); // Geometria de esfera para a joint
  const jointMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Cor vermelha para a joint
  const joint = new THREE.Mesh(jointGeometry, jointMaterial); // Criar a mesh da joint

  // Definir a posição da falange joint
  joint.position.set(position.x, position.y, position.z);

  // Adicionar à cena
  scene.add(joint);

  return joint; // Retornar a joint criada
}

// Criar o metacarpo esquerdo (parte superior da mão esquerda)
const metacarpalLeftGeometry = new THREE.BoxGeometry(0.2, 0.05, 0.2); // Cubo para o metacarpo
const metacarpalLeftMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const metacarpalLeft = new THREE.Mesh(metacarpalLeftGeometry, metacarpalLeftMaterial);

// Posicionar o metacarpo esquerdo
metacarpalLeft.position.set(-0.8, -0.4, 0); // Um pouco abaixo da palma esquerda

// Rotacionar o metacarpo para apontar em direção ao solo
metacarpalLeft.rotation.x = Math.PI / 2; // 90º no eixo X para ficar perpendicular ao solo

// Adicionar à cena
scene.add(metacarpalLeft);

// Criar joints para o metacarpo esquerdo (5 joints para os dedos)
const jointPositionsLeft = [
    { x: -0.72, y: -0.505, z: 0 }, // Base do dedo indicador
    { x: -0.77, y: -0.505, z: 0 }, // Base do dedo médio
    { x: -0.82, y: -0.505, z: 0 }, // Base do dedo anelar
    { x: -0.87, y: -0.505, z: 0 }, // Base do dedo mínimo
    { x: -0.69, y: -0.35, z: 0 }   // Dedo polegar
];

// Criar falange joints para a mão esquerda
jointPositionsLeft.forEach(position => {
  const falangeJoint = createFalangeJoint(position); // Criar falange joint para cada posição
  palmLeftJoints.push(falangeJoint); // Adicionar à lista de joints
});

// Definir posições das falanges para a mão esquerda
const leftFingersPositions = {
  thumb: [
      { x: -0.69, y: -0.35, z: 0 },  // Base do polegar
      { x: -0.65, y: -0.50, z: 0 },  // Falange distal do polegar
  ],
  index: [
      { x: -0.72, y: -0.505, z: 0 },  // Base do dedo indicador
      { x: -0.72, y: -0.65, z: 0 },  // Falange distal do indicador
      { x: -0.72, y: -0.80, z: 0 },  // Falange distal do indicador
  ],
  middle: [
      { x: -0.77, y: -0.505, z: 0 },  // Base do dedo médio
      { x: -0.77, y: -0.65, z: 0 },  // Falange distal do médio
      { x: -0.77, y: -0.80, z: 0 },  // Falange distal do médio
  ],
  ring: [
      { x: -0.82, y: -0.505, z: 0 },  // Base do dedo anelar
      { x: -0.82, y: -0.65, z: 0 },  // Falange distal do anelar
      { x: -0.82, y: -0.80, z: 0 },  // Falange distal do anelar
  ],
  pinky: [
      { x: -0.87, y: -0.505, z: 0 },  // Base do dedo mínimo
      { x: -0.87, y: -0.65, z: 0 },  // Falange distal do mínimo
      { x: -0.87, y: -0.80, z: 0 },  // Falange distal do mínimo
  ]
};

// Criar o metacarpo direito (parte superior da mão direita)
const metacarpalRightGeometry = new THREE.BoxGeometry(0.2, 0.05, 0.2); // Cubo para o metacarpo
const metacarpalRightMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const metacarpalRight = new THREE.Mesh(metacarpalRightGeometry, metacarpalRightMaterial);

// Posicionar o metacarpo direito
metacarpalRight.position.set(0.8, -0.4, 0); // Um pouco abaixo da palma direita

// Rotacionar o metacarpo para apontar em direção ao solo
metacarpalRight.rotation.x = Math.PI / 2; // 90º no eixo X para ficar perpendicular ao solo

// Adicionar à cena
scene.add(metacarpalRight);

// Criar joints para o metacarpo direito (5 joints para os dedos)
const jointPositionsRight = [
    { x: 0.72, y: -0.505, z: 0 },  // Base do dedo indicador
    { x: 0.77, y: -0.505, z: 0 },  // Base do dedo médio
    { x: 0.82, y: -0.505, z: 0 },  // Base do dedo anelar
    { x: 0.87, y: -0.505, z: 0 },  // Base do dedo mínimo
    { x: 0.69, y: -0.35, z: 0 }   // Dedo polegar
];

// Criar falange joints para a mão direita
jointPositionsRight.forEach(position => {
  const falangeJoint = createFalangeJoint(position); // Criar falange joint para cada posição
  palmRightJoints.push(falangeJoint); // Adicionar à lista de joints
});

//Parte de baixo

// Criar a pélvis (toróide)
const pelvisGeometry = new THREE.TorusGeometry(0.3, 0.1, 3, 20); // Toróide para a pélvis
const pelvisMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Cor marrom para o osso
const pelvis = new THREE.Mesh(pelvisGeometry, pelvisMaterial);

// Posicionar a pélvis no centro do corpo
pelvis.position.set(0, 0.3, 0); // Posicionar um pouco abaixo da coluna vertebral
pelvis.rotation.x = Math.PI / -6; // Rotacionar a pélvis para ficar na horizontal

// Adicionar a pélvis à cena
scene.add(pelvis);

// Criar a articulação da pélvis esquerda (onde a pélvis se conecta ao fêmur esquerdo)
const pelvisJointLeftGeometry = new THREE.SphereGeometry(0.15, 32, 32); // Esfera para a articulação
const pelvisJointLeftMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Cor vermelha para destacar a articulação
const pelvisJointLeft = new THREE.Mesh(pelvisJointLeftGeometry, pelvisJointLeftMaterial);

// Posicionar a articulação da pélvis esquerda nas extremidades da pélvis
pelvisJointLeft.position.set(-0.35, 0.08, -0.05); // Ajuste para a posição da pélvis esquerda

// Adicionar a articulação à cena
scene.add(pelvisJointLeft);

// Criar a articulação da pélvis direita (onde a pélvis se conecta ao fêmur direito)
const pelvisJointRightGeometry = new THREE.SphereGeometry(0.15, 32, 32); // Esfera para a articulação
const pelvisJointRightMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 }); // Cor vermelha para destacar a articulação
const pelvisJointRight = new THREE.Mesh(pelvisJointRightGeometry, pelvisJointRightMaterial);

// Posicionar a articulação da pélvis direita nas extremidades da pélvis
pelvisJointRight.position.set(0.35, 0.08, -0.05); // Ajuste para a posição da pélvis direita

// Adicionar a articulação à cena
scene.add(pelvisJointRight);

// Criar o fêmur esquerdo (da articulação da pélvis até o joelho)
const femurLeftGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.8, 32); // Cilindro reto para o fêmur
const femurLeftMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // Cor branca para o osso
const femurLeft = new THREE.Mesh(femurLeftGeometry, femurLeftMaterial);

// Posicionar o fêmur esquerdo
femurLeft.position.set(-0.35, -0.95, 0); // Ajustar a posição inicial do fêmur esquerdo

// Adicionar o fêmur esquerdo à cena
scene.add(femurLeft);


// Criar o fêmur direito (da articulação da pélvis até o joelho)
const femurRightGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.8, 32); // Cilindro reto para o fêmur
const femurRightMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // Cor branca para o osso
const femurRight = new THREE.Mesh(femurRightGeometry, femurRightMaterial);

// Posicionar o fêmur direito
femurRight.position.set(0.35, -0.95, 0); // Ajustar a posição inicial do fêmur direito

// Adicionar o fêmur direito à cena
scene.add(femurRight);

// Criar a junta do joelho esquerdo
const kneeLeftGeometry = new THREE.SphereGeometry(0.15, 32, 32); // Esfera pequena para a articulação
const kneeLeftMaterial = new THREE.MeshStandardMaterial({ color: 0xffc0cb }); // Cor rosa claro para destaque
const kneeLeft = new THREE.Mesh(kneeLeftGeometry, kneeLeftMaterial);

// Posicionar a junta do joelho esquerdo
kneeLeft.position.set(-0.35, -1.95, 0); // Alinhado com o final do fêmur esquerdo

// Adicionar à cena
scene.add(kneeLeft);


// Criar a junta do joelho direito
const kneeRightGeometry = new THREE.SphereGeometry(0.15, 32, 32); // Esfera pequena para a articulação
const kneeRightMaterial = new THREE.MeshStandardMaterial({ color: 0xffc0cb }); // Cor rosa claro para destaque
const kneeRight = new THREE.Mesh(kneeRightGeometry, kneeRightMaterial);

// Posicionar a junta do joelho direito
kneeRight.position.set(0.35, -1.95, 0); // Alinhado com o final do fêmur direito

// Adicionar à cena
scene.add(kneeRight);

// Criar a tíbia esquerda (da junta do joelho esquerdo até o tornozelo)
const tibiaLeftGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32); // Cilindro reto para a tíbia
const tibiaLeftMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // Cor branca para o osso
const tibiaLeft = new THREE.Mesh(tibiaLeftGeometry, tibiaLeftMaterial);

// Posicionar a tíbia esquerda
tibiaLeft.position.set(-0.35, -2.5, 0); // Abaixo do joelho esquerdo

// Adicionar à cena
scene.add(tibiaLeft);


// Criar a tíbia direita (da junta do joelho direito até o tornozelo)
const tibiaRightGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32); // Cilindro reto para a tíbia
const tibiaRightMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // Cor branca para o osso
const tibiaRight = new THREE.Mesh(tibiaRightGeometry, tibiaRightMaterial);

// Posicionar a tíbia direita
tibiaRight.position.set(0.35, -2.5, 0); // Abaixo do joelho direito

// Adicionar à cena
scene.add(tibiaRight);

// Criar a junta do tornozelo esquerdo
const ankleLeftGeometry = new THREE.SphereGeometry(0.1, 32, 32); // Esfera para o tornozelo
const ankleLeftMaterial = new THREE.MeshStandardMaterial({ color: 0xffc0cb }); // Cor rosa claro para destaque
const ankleLeft = new THREE.Mesh(ankleLeftGeometry, ankleLeftMaterial);

// Posicionar a junta do tornozelo esquerdo
ankleLeft.position.set(-0.35, -3.05, 0); // Alinhado com o final da tíbia esquerda

// Adicionar à cena
scene.add(ankleLeft);


// Criar a junta do tornozelo direito
const ankleRightGeometry = new THREE.SphereGeometry(0.1, 32, 32); // Esfera para o tornozelo
const ankleRightMaterial = new THREE.MeshStandardMaterial({ color: 0xffc0cb }); // Cor rosa claro para destaque
const ankleRight = new THREE.Mesh(ankleRightGeometry, ankleRightMaterial);

// Posicionar a junta do tornozelo direito
ankleRight.position.set(0.35, -3.05, 0); // Alinhado com o final da tíbia direita

// Adicionar à cena
scene.add(ankleRight);

// Criar o pé esquerdo
const footLeftGeometry = new THREE.BoxGeometry(0.35, 0.02, 0.7); // Retângulo para o pé
const footLeftMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // Cor branca para o osso
const footLeft = new THREE.Mesh(footLeftGeometry, footLeftMaterial);

// Posicionar o pé esquerdo
footLeft.position.set(-0.35, -3.15, 0.3); // Abaixo da junta do tornozelo esquerdo e ligeiramente à frente

// Adicionar à cena
scene.add(footLeft);


// Criar o pé direito
const footRightGeometry = new THREE.BoxGeometry(0.35, 0.02, 0.7); // Retângulo para o pé
const footRightMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // Cor branca para o osso
const footRight = new THREE.Mesh(footRightGeometry, footRightMaterial);

// Posicionar o pé direito
footRight.position.set(0.35, -3.15, 0.3); // Abaixo da junta do tornozelo direito e ligeiramente à frente

// Adicionar à cena
scene.add(footRight);


// Criar os controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);

// Função de animação
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Atualizar os controles
  renderer.render(scene, camera);
}

animate();

// Responsividade
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//Raycaster
const raycaster = new THREE.Raycaster();

document.addEventListener('mousedown', onMouseDown);

function onMouseDown(event) {
  //mouse coords
  const coords = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -((event.clientY / window.innerHeight) * 2 - 1),
  );
  raycaster.setFromCamera(coords, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    const selectedObject = intersects[0].object;
    const color = new THREE.Color(0xff0000); // Cor vermelha
    selectedObject.material.color = color;
    console.log(`Objeto selecionado: ${selectedObject.name}`);
  }
}