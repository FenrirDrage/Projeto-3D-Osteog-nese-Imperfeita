import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // Certifique-se que este caminho está correto

// Cena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Céu azul claro

// Câmara
const camera = new THREE.PerspectiveCamera(
  75, // Campo de visão
  window.innerWidth / window.innerHeight, // Proporção
  0.1, // Distância mínima
  1000 // Distância máxima
);
camera.position.set(0, 2, 15); // Posição inicial da câmera

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // Adiciona o canvas ao body

// Controles Orbit
const controls = new OrbitControls(camera, renderer.domElement);

// Luz ambiente (suave)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Cor branca, intensidade 0.5
scene.add(ambientLight);

// Luz direcional (simulando o sol)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5); // Posição da luz direcional
scene.add(directionalLight);

// Grid Helper (grade no chão)
const gridHelper = new THREE.GridHelper(10, 10); // Tamanho e divisões
scene.add(gridHelper);

// Eixos Helper (para orientação)
const axesHelper = new THREE.AxesHelper(5); // Tamanho dos eixos
scene.add(axesHelper);

// Carregar Textura
const textureLoader = new THREE.TextureLoader();
const skullTexture = textureLoader.load('/assets/skull.jpg'); // Carregar a textura do crânio
const skullMaterial = new THREE.MeshStandardMaterial({ map: skullTexture }); // Material com textura

// Cabeça (crânio)
const headGeometry = new THREE.SphereGeometry(0.4, 32, 32); // Tamanho e resolução
//const headMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff }); // Material branco
const headMaterial = skullMaterial; // Usar o material com textura
const head = new THREE.Mesh(headGeometry, headMaterial);
head.position.y = 8; // Eleva a cabeça para não ficar no nível do chão
scene.add(head); // Adiciona a cabeça à cena

// Criação da espinha dorsal com juntas
const vertebraGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.5, 32); // Cilindro para as vértebras
const vertebraMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Material cinza

const jointGeometry = new THREE.SphereGeometry(0.15, 16, 16); // Esfera para as juntas
const jointMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 }); // Material laranja (juntas)

const spine = new THREE.Group(); // Grupo para conter as vértebras e juntas

// Criar vértebras e juntas
const numVertebrae = 5; // Número de vértebras
for (let i = 0; i < numVertebrae; i++) {
  // Criação da vértebra
  const vertebra = new THREE.Mesh(vertebraGeometry, vertebraMaterial);
  vertebra.position.y = 8 - i * 0.7; // Posicionar as vértebras verticalmente
  spine.add(vertebra);

  // Criação da junta (exceto na última vértebra)
  if (i < numVertebrae) {
    const joint = new THREE.Mesh(jointGeometry, jointMaterial);
    joint.position.y = 8 - i * 0.7 - 0.35; // Posicionar a junta entre vértebras
    spine.add(joint);
  }
}

// Adicionar a espinha dorsal à cena
scene.add(spine);

// Criação do braço
const armRight = new THREE.Group(); // Grupo para conter todas as partes do braço

// Ombro (esfera)
const shoulderRightGeometry = new THREE.SphereGeometry(0.2, 16, 16); // Tamanho do ombro
const shoulderRightMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 }); // Cinza
const shoulderRight = new THREE.Mesh(shoulderRightGeometry, shoulderRightMaterial);
shoulderRight.position.y = 7.8; // Posição inicial do ombro
shoulderRight.position.x = -0.7; // Ajustar 위치 para alinhar melhor
armRight.add(shoulderRight);

// Braço superior (cilindro)
const upperArmRightGeometry = new THREE.CylinderGeometry(0.2, 0.17, 1, 32); // Braço superior
const upperArmRightMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Cinza
const upperArmRight = new THREE.Mesh(upperArmRightGeometry, upperArmRightMaterial);
upperArmRight.position.y = 7.33; // Posicionar o braço abaixo do ombro
upperArmRight.rotation.z = Math.PI / 4; // Inclinação de 45 graus para conectar ao ombro/espinha
upperArmRight.position.x = -0.23 // Ajustar posição para alinhar melhor
armRight.add(upperArmRight);

// Junta do cotovelo (esfera)
const elbowJointRightGeometry = new THREE.SphereGeometry(0.15, 16, 16); // Cotovelo
const elbowJointRightMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 }); // Laranja
const elbowJointRight = new THREE.Mesh(elbowJointRightGeometry, elbowJointRightMaterial);
elbowJointRight.position.y = 6.88; // Posicionar no final do braço superior
elbowJointRight.position.x = 0.22 // Ajustar posição para alinhar melhor
armRight.add(elbowJointRight);

// Antebraço (cilindro)
const forearmRightGeometry = new THREE.CylinderGeometry(0.15, 0.1, 1, 32); // Antebraço
const forearmRightMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Cinza
const forearmRight = new THREE.Mesh(forearmRightGeometry, forearmRightMaterial);
forearmRight.position.y = 6.25; // Posicionar o antebraço abaixo do cotovelo
forearmRight.position.x = 0.25; // Ajustar 위치 para alinhar melhor
armRight.add(forearmRight);

// Junta do pulso (esfera)
const wristJointRightGeometry = new THREE.SphereGeometry(0.15, 16, 16); // Pulso
const wristJointRightMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 }); // Laranja
const wristJointRight = new THREE.Mesh(wristJointRightGeometry, wristJointRightMaterial);
wristJointRight.position.y = 5.6; // Posicionar no final do antebraço
wristJointRight.position.x = 0.25; // Ajustar 위치 para alinhar melhor
armRight.add(wristJointRight);

// Mão (caixa ou cubo)
const handGeometryRight = new THREE.BoxGeometry(0.4, 0.6, 0.4); // Mão
const handMaterialRight = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Cinza
const handRight = new THREE.Mesh(handGeometryRight, handMaterialRight);
handRight.position.y = 5.2; // Posicionar a mão abaixo do pulso
handRight.position.x = 0.25; // Ajustar 위치 para alinhar melhor
armRight.add(handRight);

// Ajustar a posição do braço na cena
armRight.position.set(1, -0.5, 0); // Posição ajustada no eixo X e Y (lado direito da espinha)

// Adicionar o braço à cena
scene.add(armRight);

// Criação do braço esquerdo
const armLeft = new THREE.Group(); // Grupo para conter todas as partes do braço esquerdo

// Ombro (esfera)
const shoulderLeftGeometry = new THREE.SphereGeometry(0.2, 16, 16); // Tamanho do ombro
const shoulderLeftMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 }); // Cinza
const shoulderLeft = new THREE.Mesh(shoulderLeftGeometry, shoulderLeftMaterial);
shoulderLeft.position.y = 7.8; // Posição inicial do ombro
shoulderLeft.position.x = 0.7; // Ajustar posição para alinhar melhor
armLeft.add(shoulderLeft);

// Braço superior (cilindro)
const upperArmLeftGeometry = new THREE.CylinderGeometry(0.2, 0.17, 1, 32); // Braço superior
const upperArmLeftMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Cinza
const upperArmLeft = new THREE.Mesh(upperArmLeftGeometry, upperArmLeftMaterial);
upperArmLeft.position.y = 7.33; // Posicionar o braço abaixo do ombro
upperArmLeft.rotation.z = -Math.PI / 4; // Inclinação de -45 graus para conectar ao ombro/espinha
upperArmLeft.position.x = 0.23; // Ajustar posição para alinhar melhor
armLeft.add(upperArmLeft);

// Junta do cotovelo (esfera)
const elbowJointLeftGeometry = new THREE.SphereGeometry(0.15, 16, 16); // Cotovelo
const elbowJointLeftMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 }); // Laranja
const elbowJointLeft = new THREE.Mesh(elbowJointLeftGeometry, elbowJointLeftMaterial);
elbowJointLeft.position.y = 6.88; // Posicionar no final do braço superior
elbowJointLeft.position.x = -0.22; // Ajustar posição para alinhar melhor
armLeft.add(elbowJointLeft);

// Antebraço (cilindro)
const forearmLeftGeometry = new THREE.CylinderGeometry(0.15, 0.1, 1, 32); // Antebraço
const forearmLeftMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Cinza
const forearmLeft = new THREE.Mesh(forearmLeftGeometry, forearmLeftMaterial);
forearmLeft.position.y = 6.25; // Posicionar o antebraço abaixo do cotovelo
forearmLeft.position.x = -0.25; // Ajustar posição para alinhar melhor
armLeft.add(forearmLeft);

// Junta do pulso (esfera)
const wristJointLeftGeometry = new THREE.SphereGeometry(0.15, 16, 16); // Pulso
const wristJointLeftMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 }); // Laranja
const wristJointLeft = new THREE.Mesh(wristJointLeftGeometry, wristJointLeftMaterial);
wristJointLeft.position.y = 5.6; // Posicionar no final do antebraço
wristJointLeft.position.x = -0.25; // Ajustar posição para alinhar melhor
armLeft.add(wristJointLeft);

// Mão (caixa ou cubo)
const handLeftGeometry = new THREE.BoxGeometry(0.4, 0.6, 0.4); // Mão
const handLeftMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Cinza
const handLeft = new THREE.Mesh(handLeftGeometry, handLeftMaterial);
handLeft.position.y = 5.2; // Posicionar a mão abaixo do pulso
handLeft.position.x = -0.25; // Ajustar posição para alinhar melhor
armLeft.add(handLeft);

// Ajustar a posição do braço esquerdo na cena
armLeft.position.set(-1, -0.5, 0); // Posição ajustada no eixo X e Y (lado esquerdo da espinha)

// Adicionar o braço esquerdo à cena
scene.add(armLeft);

// Pélvis
const pelvisGeometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100); // Torus (anel)
const pelvisMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Material cinza
const pelvis = new THREE.Mesh(pelvisGeometry, pelvisMaterial);

// Ajustar posição e orientação da pélvis
pelvis.position.y = 4.6; // Posição no eixo Y (abaixo da espinha)
pelvis.rotation.x = Math.PI / 2; // Girar para alinhar horizontalmente

// Adicionar a pélvis à cena
scene.add(pelvis);

// Criação da perna
const legLeft = new THREE.Group(); // Grupo para conter todas as partes da perna

// Junta da anca (esfera)
const hipJointLeftGeometry = new THREE.SphereGeometry(0.2, 16, 16); // Tamanho da anca
const hipJointLeftMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 }); // Laranja
const hipJointLeft = new THREE.Mesh(hipJointLeftGeometry, hipJointLeftMaterial);
hipJointLeft.position.y = 4.3; // Posição inicial da junta da anca
hipJointLeft.position.x = -0.6; // Ajustar para o lado esquerdo (perna esquerda)
legLeft.add(hipJointLeft);

// Fêmur (cilindro)
const femurLeftGeometry = new THREE.CylinderGeometry(0.15, 0.12, 1.5, 32); // Fêmur
const femurLeftMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Cinza
const femurLeft = new THREE.Mesh(femurLeftGeometry, femurLeftMaterial);
femurLeft.position.y = 3.4; // Posicionar o fêmur abaixo da junta da anca
femurLeft.position.x = -0.6; // Manter alinhado com a junta
legLeft.add(femurLeft);

// Junta do joelho (esfera)
const kneeJointLeftGeometry = new THREE.SphereGeometry(0.2, 16, 16); // Tamanho do joelho
const kneeJointLeftMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 }); // Laranja
const kneeLeftJoint = new THREE.Mesh(kneeJointLeftGeometry, kneeJointLeftMaterial);
kneeLeftJoint.position.y = 2.65; // Posição do joelho abaixo do fêmur
kneeLeftJoint.position.x = -0.6; // Alinhar com o fêmur
legLeft.add(kneeLeftJoint);

// Tíbia (canela - cilindro)
const tibiaLeftGeometry = new THREE.CylinderGeometry(0.12, 0.1, 1.5, 32); // Tíbia
const tibiaLeftMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Cinza
const tibiaLeft = new THREE.Mesh(tibiaLeftGeometry, tibiaLeftMaterial);
tibiaLeft.position.y = 1.85; // Posicionar a tíbia abaixo do joelho
tibiaLeft.position.x = -0.6; // Alinhar com o joelho
legLeft.add(tibiaLeft);

// Junta do tornozelo (esfera)
const ankleJointLeftGeometry = new THREE.SphereGeometry(0.15, 16, 16); // Tamanho do tornozelo
const ankleJointLeftMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 }); // Laranja
const ankleLeftJoint = new THREE.Mesh(ankleJointLeftGeometry, ankleJointLeftMaterial);
ankleLeftJoint.position.y = 1.1; // Posição do tornozelo abaixo da tíbia
ankleLeftJoint.position.x = -0.6; // Alinhar com a tíbia
legLeft.add(ankleLeftJoint);

// Pé (caixa)
const footLeftGeometry = new THREE.BoxGeometry(0.6, 0.2, 0.3); // Tamanho do pé
const footLeftMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Cinza
const footLeft = new THREE.Mesh(footLeftGeometry, footLeftMaterial);
footLeft.position.y = 0.9; // Posição do pé abaixo do tornozelo
footLeft.position.x = -0.6; // Alinhar com o tornozelo
footLeft.position.z = 0.2; // Leve deslocamento para frente (natural para o pé)
legLeft.add(footLeft);

// Adicionar a perna à cena
scene.add(legLeft);

// Criação da perna direita
const legRight = new THREE.Group(); // Grupo para conter todas as partes da perna direita

// Junta da anca (esfera)
const hipJointRightGeometry = new THREE.SphereGeometry(0.2, 16, 16); // Tamanho da anca
const hipJointRightMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 }); // Laranja
const hipJointRight = new THREE.Mesh(hipJointRightGeometry, hipJointRightMaterial);
hipJointRight.position.y = 4.3; // Posição inicial da junta da anca
hipJointRight.position.x = 0.6; // Ajustar para o lado direito
legRight.add(hipJointRight);

// Fêmur (cilindro)
const femurRightGeometry = new THREE.CylinderGeometry(0.15, 0.12, 1.5, 32); // Fêmur
const femurRightMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Cinza
const femurRight = new THREE.Mesh(femurRightGeometry, femurRightMaterial);
femurRight.position.y = 3.4; // Posicionar o fêmur abaixo da junta da anca
femurRight.position.x = 0.6; // Manter alinhado com a junta
legRight.add(femurRight);

// Junta do joelho (esfera)
const kneeJointRightGeometry = new THREE.SphereGeometry(0.2, 16, 16); // Tamanho do joelho
const kneeJointRightMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 }); // Laranja
const kneeJointRight = new THREE.Mesh(kneeJointRightGeometry, kneeJointRightMaterial);
kneeJointRight.position.y = 2.65; // Posição do joelho abaixo do fêmur
kneeJointRight.position.x = 0.6; // Alinhar com o fêmur
legRight.add(kneeJointRight);

// Tíbia (canela - cilindro)
const tibiaRightGeometry = new THREE.CylinderGeometry(0.12, 0.1, 1.5, 32); // Tíbia
const tibiaRightMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Cinza
const tibiaRight = new THREE.Mesh(tibiaRightGeometry, tibiaRightMaterial);
tibiaRight.position.y = 1.85; // Posicionar a tíbia abaixo do joelho
tibiaRight.position.x = 0.6; // Alinhar com o joelho
legRight.add(tibiaRight);

// Junta do tornozelo (esfera)
const ankleJointRightGeometry = new THREE.SphereGeometry(0.15, 16, 16); // Tamanho do tornozelo
const ankleJointRightMaterial = new THREE.MeshStandardMaterial({ color: 0xffa500 }); // Laranja
const ankleJointRight = new THREE.Mesh(ankleJointRightGeometry, ankleJointRightMaterial);
ankleJointRight.position.y = 1.1; // Posição do tornozelo abaixo da tíbia
ankleJointRight.position.x = 0.6; // Alinhar com a tíbia
legRight.add(ankleJointRight);

// Pé (caixa)
const footRightGeometry = new THREE.BoxGeometry(0.6, 0.2, 0.3); // Tamanho do pé
const footRightMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Cinza
const footRight = new THREE.Mesh(footRightGeometry, footRightMaterial);
footRight.position.y = 0.9; // Posição do pé abaixo do tornozelo
footRight.position.x = 0.6; // Alinhar com o tornozelo
footRight.position.z = 0.2; // Leve deslocamento para frente (natural para o pé)
legRight.add(footRight);

// Adicionar a perna direita à cena
scene.add(legRight);

// Função de animação
function animate() {
  requestAnimationFrame(animate);

  // Atualizar a escala do osso pulsante
  if (pulsingBone) {
    pulseScale += pulseSpeed * pulseDirection;
    if (pulseScale > maxPulseScale || pulseScale < minPulseScale) {
      pulseDirection *= -1; // Invert the direction
    }
    pulsingBone.scale.set(pulseScale, pulseScale, pulseScale);
  }

  controls.update(); // Atualiza os controles Orbit
  renderer.render(scene, camera);
}

// Raycaster e vetor do mouse
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Array com todas as partes do esqueleto (ossos)
const bones = [head, upperArmLeft, forearmLeft, handLeft, 
               upperArmRight, forearmRight, handRight, pelvis,
               femurLeft, tibiaLeft, footLeft,
               femurRight, tibiaRight, footRight,
              ];           

// Evento de movimento do mouse
window.addEventListener('mousemove', (event) => {
  // Normalizar as coordenadas do mouse
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Atualizar o raycaster com a posição do mouse
  raycaster.setFromCamera(mouse, camera);

  // Calcular interseções com os objetos
  const intersects = raycaster.intersectObjects(bones);

  // Restaurar a cor original de todos os ossos
  bones.forEach((bone) => {
    if (bone.material) {
    bone.material.color.set(0x808080); // Cinza (cor padrão)
    } else { 
      console.warn('Bone is undefined', bone)// Se o material não existir, é um grupo
       }
  });

  // Alterar a cor do osso destacado
  if (intersects.length > 0) {
    const highlightedBone = intersects[0].object;
    highlightedBone.material.color.set(0xff0000); // Vermelho
  }
});

let pulsingBone = null;
let pulseDirection = 1;
let pulseScale = 1;
const pulseSpeed = 0.01;
const maxPulseScale = 1.2;
const minPulseScale = 0.8;
let originalColor = new THREE.Color();
let orignalScale = new THREE.Vector3();

// Evento de clique do mouse
window.addEventListener('click', (event) => {
  // Normalizar as coordenadas do mouse
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Atualizar o raycaster com a posição do mouse
  raycaster.setFromCamera(mouse, camera);

  // Calcular interseções com os objetos
  const intersects = raycaster.intersectObjects(bones, true); // Enable recursive checking

  // Definir o osso pulsante
  if (intersects.length > 0) {
    pulsingBone = intersects[0].object;
    pulseScale = 1; // Reset the scale
    originalColor.copy(pulsingBone.material.color); // Save the original color
    orignalScale.copy(pulsingBone.scale); // Save the original scale
  }
});

// Função de animação
function animatePulsing() {
  requestAnimationFrame(animatePulsing);

  // Atualizar a escala do osso pulsante
  if (pulsingBone) {
    pulseScale += pulseSpeed * pulseDirection;
    if (pulseScale > maxPulseScale || pulseScale < minPulseScale) {
      pulseDirection *= -1; // Invert the direction
    }
    pulsingBone.scale.set(pulseScale, pulseScale, pulseScale);

    // Interpolate the color from original to red
    const t = (pulseScale - minPulseScale) / (maxPulseScale - minPulseScale);
    pulsingBone.material.color.lerpColors(originalColor, new THREE.Color(0xff0000), t);
  }

  // Rotação para visualização
  head.rotation.y += 0.01;

  controls.update(); // Atualiza os controles Orbit
  renderer.render(scene, camera);
}

// Variável para alternar o estado de movimento
let isWalking = false;
let walkingSpeed = 0.05; // Velocidade de animação
let legAngle = 0; // Ângulo inicial

// Função para animar o movimento de andar
function animateWalking() {
  function walk() {
    if (!isWalking) return; // Interrompe a animação se não estiver no estado "andar"

    // Movimento cíclico baseado em seno para criar um movimento natural
    legAngle += walkingSpeed;

    // Simular movimento da anca (subida e descida leve)
    //legRight.position.y = 0.1 * Math.sin(legAngle * 2) + 4; // Subida/descida da perna

    // Movimento do fémur (rotações)
    femurRight.rotation.x = Math.sin(legAngle) * 0.5; // Movimento da coxa
    tibiaRight.rotation.x = Math.max(-Math.sin(legAngle) * 0.5, 0); // Movimento do joelho

    // Perna esquerda (movimento oposto)
    femurLeft.rotation.x = -Math.sin(legAngle) * 0.5; // Movimento da coxa
    tibiaLeft.rotation.x = Math.max(Math.sin(legAngle) * 0.5, 0); // Movimento do joelho

    // Movimento do pé (levantar/descer ao andar)
    footRight.rotation.x = -Math.sin(legAngle) * 0.3;
    footLeft.rotation.x = Math.sin(legAngle) * 0.3;

    // Chamar continuamente a próxima frame
    requestAnimationFrame(walk);
  }

  walk(); // Inicia o ciclo de animação
}

// Função para parar o movimento
function stopWalking() {
  // Aqui podes resetar posições, parar animações ou adicionar lógica necessária
  hipJointRight.rotation.z = 0; // Reset do movimento
}

// Ajusta o tamanho do renderer ao redimensionar a janela
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Evento de pressionar tecla
window.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    pulsingBone.scale.copy(orignalScale); // Restaurar a escala original
    pulsingBone.material.color.copy(originalColor); // Restaurar a cor original
    pulsingBone = null; // Parar o pulso do osso
  }
});

// Função para iniciar/parar a animação de andar
document.addEventListener('keydown', (event) => {
  if (event.key === 'w' || event.key === 'W') {
    // Alternar o estado entre "andar" e "parar"
    isWalking = !isWalking;

    if (isWalking) {
      console.log('Começou a andar');
      animateWalking(); // Inicia a animação de andar
    } else {
      console.log('Parou de andar');
      stopWalking(); // Para a animação
    }
  }
});

// Inicia a animação
animate();
animatePulsing();
