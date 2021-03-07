import * as THREE from "three";

/**
 *
 * TODO:
 * - Support multiple textures
 * - Supprot aspect ratio
 */
let vertexShader = `
attribute vec3 position;
attribute vec2 uv;
varying vec2 vUv;
	void main() {
		vec3 transformed = position;
		transformed.xy += vec2(0.75, -0.75);
		gl_Position = vec4(transformed,1.);
		vUv = uv;
	}
`;
let fragmentShader = `
	precision highp float;
	varying vec2 vUv;
	uniform sampler2D uMap;
	void main() {
		vec3 color = vec3(0.5);
		color = texture2D(uMap, vUv).rgb;
		gl_FragColor = vec4(color,1.0);
	}
`;

export class TextureDebugger extends THREE.Mesh {
  constructor(texture) {
    let tGeo = new THREE.PlaneBufferGeometry(0.5, 0.5);
    let tMat = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      depthWrite: false,
      depthTest: false,
      uniforms: {
        uMap: new THREE.Uniform(texture),
      },
    });
    super(tGeo, tMat);
    this.renderOrder = 10000;
    this.scale.set(10, 10, 1);
  }
}
