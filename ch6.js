import * as THREE from "three";
import { OrbitControls } from "./module/OrbitControls.js"; // 引入滑鼠控制鏡頭

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 15);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 帶入鏡頭及實例化的物件
new OrbitControls(camera, renderer.domElement);

function createSphere() {
  const geometry = new THREE.SphereGeometry(100, 50, 50); // 建立一個 圓形幾何體(半徑/水平面數/垂直面數)
  // MeshNormalMaterial，顯示物體的法線顏色，不會考慮光照效果
  // MeshStandardMaterial，需要有真實光源才會有顏色的物理材質
  const texture = new THREE.TextureLoader().load('img/ch6/starmap_4k.jpeg');
  // const material = new THREE.MeshStandardMaterial({ color: 0xffffff }); // 設定材質為白色
  const material = new THREE.MeshStandardMaterial({ map:texture, side: THREE.DoubleSide});

  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
  return sphere;
}

const sphere = createSphere();

// 設定光源
const light = new THREE.AmbientLight(0xffffff, 1); // 提供均勻的光照，這種光照不會產生陰影。它通常用於模擬環境光，確保場景中的物體不會完全黑暗。 (顏色/亮度(0~1))
scene.add(light);

// 參數
const dir = new THREE.Vector3(-2.49, 4.74, -3.01).normalize(); // 方向，normalize變成向量長度為1
const orgin = new THREE.Vector3(0 , 0 , 0); // 起始位置
const length = 10; // 長度
const hex = 0xffff00; // 顏色

// 創建方向指標
const createArrowHelper = () => {
    const arrowHelper = new THREE.ArrowHelper(dir, orgin, length, hex);
    scene.add(arrowHelper);
}
createArrowHelper();


let quaternion = new THREE.Quaternion();
let rotation = 0;

// 旋轉
function rotate() {
    rotation += 0.001;
    // 根據給個旋轉軸和旋轉角度 設定四元數
    quaternion.setFromAxisAngle(dir, rotation); // dir 方向。 rotation，表示弧度，可用Math.PI 來表示
    // setFromQuaternion，把上面設定好的四元數轉換成歐拉角，並將其設定在物體的 rotation 上
    sphere.rotation.setFromQuaternion(quaternion);
    // console.log(sphere.rotation);
}



function animate() {
  rotate();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
// 函式起始點
animate();

function testEuler() {
  const euler = new THREE.Euler();
  const vector = new THREE.Vector3(17, 8, 9);
  // 把向量，轉換成歐拉角
  euler.setFromVector3(vector);
  console.log(euler);

  // 直接設置歐拉角 
  euler.set(7, 8, 9);
  console.log(euler);

  // 把矩陣轉換成 歐拉角
  const matrix = new THREE.Matrix4();
  matrix.makeRotationY(Math.PI / 4); // 創建一個以Y軸旋轉的矩陣
  euler.setFromRotationMatrix(matrix);
  console.log(euler);

  // 歐拉角轉四元數，參考 rotate() 內的 setFromQuaternion()
}

function testQuaternion() {
  // setFromAxisAngle，設定四元數的方法， 給一個軸心及旋轉角度，參考 rotate() 內的 setFromAxisAngle

  // 歐拉角轉換成四元數
  const quaternion = new THREE.Quaternion();
  const euler = new THREE.Euler(Math.PI / 4, Math.PI / 4, 0); // 45度, 45度, 0度
  quaternion.setFromEuler(euler);
  console.log(quaternion);

  // 從矩陣中，提取旋轉信息，放置到四元數
  const rotationMatrix = new THREE.Matrix4();
  rotationMatrix.makeRotationY(Math.PI / 4); // 繞 Y 軸旋轉 45 度
  quaternion.setFromRotationMatrix(rotationMatrix);
  console.log(quaternion);

  // 直接設置四元數
  quaternion.set(0, 0, Math.sin(Math.PI / 4), Math.cos(Math.PI / 4)); // 設置四元數
  console.log(quaternion);

  // 計算兩個四元數之間的夾角 angleTo 類屬於Vector3，只要是Vector3之間都能計算
  const quaternion2 = new THREE.Quaternion();
  quaternion.setFromEuler(new THREE.Euler(0, Math.PI / 4, 0)); // 45度
  quaternion2.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0)); // 90度
  const angle = quaternion.angleTo(quaternion2);
  console.log('Angle between quaternions:', angle); // 輸出兩個四元數之間的角度

  // dot 類屬於Vector3，只要是Vector3之間都能計算
  const vector1 = new THREE.Vector3(1, 2, 3);
  const vector2 = new THREE.Vector3(4, 5, 6);
  const dotProduct = vector1.dot(vector2);
  console.log('Dot Product:', dotProduct); 
  // 常見點積數值
  // 正數，向量之間夾角<90
  // 0，向量之間夾角=90，表示正交
  // 負數，向量之間夾角>90
  // 1，相同方向的單位向量，夾角為0
  // -1，相反方向的單位向量，夾角為0
}

testEuler();
testQuaternion();
