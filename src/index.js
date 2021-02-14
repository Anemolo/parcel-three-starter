import "normalize.css";
import "./index.css";
import * as THREE from "three";

let canvas = document.getElementById("app-canvas");
let wrapper = document.getElementById("app-wrapper");

class BasicThreeCore {
	constructor(container, canvas) {
		this.container = container;
		this.canvas = canvas;
		this.vp = {
			width: container.offsetWidth,
			height: container.offsetHeight,
			dpr: Math.min(window.devicePixelRatio),
		};

		this.renderer = new THREE.WebGLRenderer({
			antialias: false,
			canvas,
		});
		this.renderer.setSize(this.vp.width, this.vp.height, false);
		this.renderer.setPixelRatio(this.vp.dpr);

		container.append(this.renderer.domElement);

		this.camera = new THREE.PerspectiveCamera(
			45,
			this.vp.width / this.vp.height,
			0.1,
			10000
		);
		this.camera.position.z = 50;
		this.scene = new THREE.Scene();

		this.clock = new THREE.Clock();
		this.assets = {};
		this.disposed = false;
		this.tick = this.tick.bind(this);
		this.init = this.init.bind(this);
	}
	dispose() {
		//
	}
	init() {}
	// To be replaced
	update() {}
	render() {
		this.renderer.render(this.scene, this.camera);
	}
	tick() {
		if (this.disposed) return;

		this.update();
		this.render();

		requestAnimationFrame(this.tick);
	}
}

class Core extends BasicThreeCore {
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

new Core(wrapper, canvas);
