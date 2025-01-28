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

child.position.x = 5;
function leson5(yuanli = false){
    if(yuanli) {
        // 原理
        const matrix = new THREE.Matrix4();
        // const matrixArray = [
        //     sx,0,0,tx,
        //     0,sy,0,ty,
        //     0,0,sz,tz,
        //     0,0,0,1 // 預設值，不變
        // ]; // sx表示 scaleX  / tx表示translateX
        const matrixArray = [
            1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0,1
        ];
        matrix.set(...matrixArray);
        parent.applyMatrix4(matrix);
    } else {
        // 回傳"全新"的矩陣，新的會覆蓋舊的
        const rotateMatrix = new THREE.Matrix4().makeRotationY(Math.PI / 180); 
        const scaleMatrix = new THREE.Matrix4().makeScale(1.005,1.01,1);
        const translationMatrix = new THREE.Matrix4().makeTranslation(0.2,0,0);

        // // const rotateMatrix = new THREE.Matrix4().makeRotation(1,1,1); // 沒這東西
        // console.log(rotateMatrix.toArray()); // 矩陣轉換成array
        const combineMatrix = rotateMatrix.clone().multiply(scaleMatrix).multiply(translationMatrix);// 用colne()，因為multiply會汙染原本的參數
        // parent.applyMatrix4(combineMatrix);

        // matrix4.extractRotation(要被抽出旋轉參數的matrix參數)，從括弧內-抽出旋轉參數，塞入matrix
        const matrixRotation = new THREE.Matrix4();        
        matrixRotation.extractRotation(combineMatrix);
        // console.log(matrixRotation.toArray());

        // Vector3.setFromMatrixPosition(要被抽出位移參數的matrix參數); 把位移的部分，從括弧內的matrix抽出，放至Vector3
        const verctor3Pos = new THREE.Vector3();
        verctor3Pos.setFromMatrixPosition(combineMatrix);        
        // console.log(verctor3Pos);

        // Vector3.setFromMatrixScale(要被抽出放大參數的matrix參數); 把放大的部分，從括弧內的matrix抽出，放至Vector3
        const matrixScale = new THREE.Vector3();
        matrixScale.setFromMatrixScale(combineMatrix);
        // console.log(matrixScale);

        // 把 矩陣，拆出位置/四元數/放大/
        const extractedPosition = new THREE.Vector3();
        const extractedQuaternion = new THREE.Quaternion();
        const extractedScale = new THREE.Vector3();
        combineMatrix.decompose(extractedPosition, extractedQuaternion, extractedScale);
        // console.log(extractedPosition);

        // 把 位置/四元數/放大，合併成矩陣
        const newMatrix = new THREE.Matrix4();
        newMatrix.compose(extractedPosition, extractedQuaternion, extractedScale);
        // parent.applyMatrix4(newMatrix);

        // set Matrix4.set(...Array); // 把陣列匯入到矩陣，可能會因為轉換而有誤差
        const textMatrix = new THREE.Matrix4();
        textMatrix.set(...newMatrix.toArray());
        // parent.applyMatrix4(textMatrix);
    }

}

leson5();

function animate() {
  // 先停止自轉自轉
  leson5();
   // 很像setInterval的函式。每一幀都會執行這個函式
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
// 函式起始點
animate();
