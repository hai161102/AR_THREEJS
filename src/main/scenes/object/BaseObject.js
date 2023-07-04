import * as THREE from 'three';

export let base = null;

export class BaseObject extends THREE.Object3D {
    mixer = null;
    timeScale = 1;

    constructor() {
        super();
        base = this;
    }


    setupAnimation() {
        if (this.children.length > 0) {
            this.children.forEach(function (child) {
                base.mixer = new THREE.AnimationMixer(child);
                if (base.mixer instanceof THREE.AnimationMixer) {
                    let animations = child.animations;
                    animations.forEach(function (animation) {
                        let action = base.mixer.clipAction(animation, child);
                        action.play();
                    });
                }

            });

        }

    }

    setAnimation(object) {
        this.clear();
        this.add(object);
        this.setupAnimation();
    }

    update(dt) {
        if (this.mixer != null) {
            this.mixer.timeScale = this.timeScale;
            this.mixer.update(dt);
        }
    }
}