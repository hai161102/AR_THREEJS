import * as THREE from 'three';


export class TextureLoaderInstance {

    static instance;
    loader = null;
    constructor() {
        this.loader = new THREE.TextureLoader();
    }

    static getInstance() {
        if (TextureLoaderInstance.instance == null) {
            TextureLoaderInstance.instance = new TextureLoaderInstance();
        }
        return TextureLoaderInstance.instance;
    }

    load(filename, onLoaded, onProgress, onError) {
        if (this.loader == null) {
            return null;
        }
        return this.loader.load(filename, onLoaded, onProgress, onError);
    }


}