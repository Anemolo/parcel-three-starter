import * as THREE from "three";

// TODO IN PROJECT: Make a single RAF for all things
export class GLCore {
  constructor(container, canvas) {
    this.container = container;
    this.canvas = canvas;
    this.vp = {
      width: container.offsetWidth,
      height: container.offsetHeight,
      dpr: Math.min(window.devicePixelRatio, 2),
    };

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas,
      stencil: false,
    });
    this.renderer.setSize(this.vp.width, this.vp.height, false);
    this.renderer.setPixelRatio(this.vp.dpr);

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
    this.viewSize = this.getViewSizeAtDepth();

    this.disposed = false;

    this.tick = this.tick.bind(this);
    this.init = this.init.bind(this);
    this.onResize = this.onResize.bind(this);

    this.addEvents(); 
  }
  addEvents() {
    window.addEventListener("resize", this.onResize);
  }
  dispose() {
    //
  }
  getViewSizeAtDepth(depth = 0) {
    const fovInRadians = (this.camera.fov * Math.PI) / 180;
    const height = Math.abs(
      (this.camera.position.z - depth) * Math.tan(fovInRadians / 2) * 2
    );
    return { width: height * this.camera.aspect, height };
  }
  init() {}
  // To be replaced
  update() {}
  render() {
    this.renderer.render(this.scene, this.camera);
  }
  onResize() {
    this.vp.width = container.offsetWidth;
    this.vp.height = container.offsetHeight;
    this.vp.dpr = Math.min(window.devicePixelRatio, 2);

    this.renderer.setSize(this.vp.width, this.vp.height, false);
    this.camera.aspect = this.vp.width / this.vp.height;
    this.camera.updateProjectionMatrix();

    this.viewSize = this.getViewSizeAtDepth();
  }
  tick() {
    if (this.disposed) return;

    this.update();
    this.render();

    requestAnimationFrame(this.tick);
  }
}
