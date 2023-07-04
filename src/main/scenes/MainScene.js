import { BaseScene } from "./BaseScene.js";
import * as THREE from 'three';
import { Girl } from "./object/Girl.js";
import { FBXLoaderInstance } from "../utils/FBXLoaderInstance.js";
import * as util from '../utils/Utils.js';

let scene = null;

export class MainScene extends BaseScene {

    girl = null;
    loadModelCallback = {
        onLoad: function () { },
        onDone: function () { }
    };
    constructor(width, height) {
        super(width, height);
        this.initGirl();
        this.background = new THREE.Color(0x383838);
        scene = this;
    }

    initGirl() {
        let modelData = util.loadAllModelData();
        let girlPaths = util.getFileByExtension(util.listGirlsPath, 'fbx');
        console.log(girlPaths);
        girlPaths.forEach(function (path, index) {
            FBXLoaderInstance.instance.load(path, (object) => {
                console.log(object);
                util.loadModel(object, modelData, () => {
                    object.scale.set(0.01, 0.01, 0.01);
                    if (index == 1) {
                        scene.girl = new Girl(object);
                        scene.add(scene.girl);
                        scene.loadModelCallback.onDone();
                    }
                }, () => {
                    scene.loadModelCallback.onLoad();
                });

            });
        })

    }

    update(dt) {
        // update the scene
        if (this.girl != null) {
            this.girl.update(dt);

        }
    }
}