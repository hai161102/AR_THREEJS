import * as THREE from 'three';

export class BaseCamere extends THREE.PerspectiveCamera {

    constructor(width, height) {
        super(100, width / height, 0.01, 1000);
        this.position.set(10, 10, 10);
        this.lookAt(10, 10, 10);
    }

}