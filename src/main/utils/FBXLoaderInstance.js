import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

export class FBXLoaderInstance {
    static _instance;

    _loader = null;
    get loader() {
        return this._loader;
    }

    constructor() {
        this._loader = new FBXLoader();
    }


    static get instance() {
        if (FBXLoaderInstance._instance == null) {
            FBXLoaderInstance._instance = new FBXLoaderInstance();
        }
        return FBXLoaderInstance._instance;
    }

    load(path, callback) {
        this._loader.load(path, callback);
    }
    
}