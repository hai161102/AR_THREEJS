import * as THREE from 'three';

export class BaseScene extends THREE.Scene {

    width = 0;
    height = 0;

    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    update(dt) {
        // Update the scene
    }
}

