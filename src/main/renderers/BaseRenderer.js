import * as THREE from 'three';

export class BaseRenderer extends THREE.WebGLRenderer {

    width = 0;
    height = 0;

    constructor(width, height) {
        super({antialias : true});
        this.width = width;
        this.height = height;
        this.setSize(width, height);
    }

    setSize(width, height) {
        super.setSize(width, height);
    }
}