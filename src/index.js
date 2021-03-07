import "normalize.css";
import "./index.css";
import * as THREE from "three";
import { evt } from "./plugins";
import { GLCore } from "./GLCore";

let canvas = document.getElementById("app-canvas");
let wrapper = document.getElementById("app-wrapper");

class GLApp extends GLCore {
  constructor(container, canvas) {
    super(container, canvas);
    this.init();
  }
  init() {
    let cubeGeo = new THREE.BoxBufferGeometry();
    let cubeMat = new THREE.MeshNormalMaterial();
    let cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
    this.cube = cubeMesh;
    this.scene.add(cubeMesh);
    this.tick();
  }
  update() {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
  }
}

new GLApp(wrapper, canvas);
