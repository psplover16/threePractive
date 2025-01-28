import * as THREE from "three";
import { OrbitControls } from "https://unpkg.com/three@latest/examples/jsm/controls/OrbitControls.js";

// 固定添加
const scene = new THREE.Scene();
// PerspectiveCamera，可透視的攝影機 需設定四個參數，下面接著介紹
const camera = new THREE.PerspectiveCamera(
  75, // fov(視角)
  window.innerWidth / window.innerHeight, // Aspect(寬高比)
  0.1, // Near(最近可捕捉範圍)
  1000 // Far(最遠可捕捉範圍)
);
// 修改鏡頭位置
camera.position.set(0, 0, 15);
// 實例化渲染器
const renderer = new THREE.WebGLRenderer();
// 渲染器負責投影畫面在螢幕上，會需要寬高
renderer.setSize(window.innerWidth, window.innerHeight);
// 渲染器會產生canvas物件，我們在html的body放置它
document.body.appendChild(renderer.domElement);
// ------------------------------------------------------------------------------



// 建立一個形狀，用來定義物體的形狀為長寬高為1的正方體
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 由原本的 MeshBasicMaterial 換成 MeshNormalMaterial
const material = new THREE.MeshNormalMaterial({ color: 0x0000ff });
// Mesh，網格物件，可被鏡頭渲染的物件，需要有幾何模型+材質
const parent = new THREE.Mesh(geometry, material);
const child = new THREE.Mesh(geometry, material);
// 接著，把parent加到世界裡，把child加到parent裡
scene.add(parent);
parent.add(child);

function leson4(){
    return child.position.x = 5;
// parent.position.x = 10;
// parent.position.set(10, 0, 0);
// parent.translateX(10);
// parent.geometry.translate(10,0,0);

// parent.scale.x = 1.5;
// parent.scale.set(1.5, 1, 1);
// parent.geometry.scale(1.5,1,1);
// parent.geometry.scale.x = 1.5;

// parent.rotation.x = Math.PI / 20;
// parent.rotation.set(Math.PI / 20, 0, 0);
// parent.rotateX(Math.PI / 180);
// parent.geometry.rotateX(Math.PI / 180);

// // parent.translate(10, 10 ,0); // 沒有這用法
// // parent.geometry.translateX(10); // 沒有這用法
// // parent.geometry.position.x = 10; // 沒有這用法
// // parent.geometry.scale.set(1.5,1,1) // 沒有這用法
// // parent.scale(1.5,1,1); // 沒有這用法
// // parent.geometry.rotate(Math.PI / 180,0,0); // 沒有這用法
// // parent.geometry.rotation.x = Math.PI / 180; // 沒有這用法    
}

leson4();

function animate() {
  // 先停止自轉自轉
  parent.rotation.y += 0.01;
   // 很像setInterval的函式。每一幀都會執行這個函式
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
// 函式起始點
animate();
