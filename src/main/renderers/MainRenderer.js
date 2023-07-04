import { MainCamera } from "../cameras/MainCamera.js";
import { MainScene } from "../scenes/MainScene.js";
import { BaseRenderer } from "./BaseRenderer.js";
import * as util from '../utils/Utils.js';
import * as THREE from 'three';

export class MainRenderer extends BaseRenderer {

    camera = null;
    scene = null;
    cameraControll = null;
    light = null; // soft white light

    constructor(width , height) {
        console.log(width, height);
        super(width, height);
        this.initCamera();
        this.initScene();
        this.light = new THREE.PointLight( 0xffffff, 0.1, 1000 );
        this.light.position.set(300, 0, 300);
        this.light.castShadow = true;
        this.light.power = 5;
        this.scene.add( this.light );
        this.xr.enabled = true;
    }

    initCamera() {
        if (this.camera == null) {
            console.log('renderSize', this.width, this.height);
            this.camera = new MainCamera(this.width, this.height);
            this.cameraControll = util.getOrbitControl(this);
            this.cameraControll.update();
        }
    }

    initScene() {
        if (this.scene == null) {
            this.scene = new MainScene(this.width, this.height);
        }
    }

    startLoop() {
        this.setAnimationLoop((time, frame) => {
            this.cameraControll.update();
            if (this.scene != null && this.camera != null) {
                this.render(this.scene, this.camera);
                this.scene.update(0.01);
            }

        })
    }

}