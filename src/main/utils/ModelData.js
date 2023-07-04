import { TextureLoaderInstance } from "./TextureLoaderInstance.js";
import * as THREE from 'three';
export default class ModelData {
    type = ModelDataType.DEFAULT;
    name = null;
    textureDatas = null;
    constructor(type, name, textureDatas) {
        this.type = type;
        this.name = name;
        this.textureDatas = textureDatas;
    }


}

export const ModelDataType = {
    //Custom types here
    DEFAULT: -1,
    MAP: 0,
    CHARACTOR: 1,
}

export class TextureData {
    _name = '';
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    path = '';
    _texture = null;
    get texture() {
        return this._texture;
    }
    set texture(value) {
        this._texture = value;
    }

    constructor(name, path) {
        this.name = name;
        this.path = path;
        this.loadTexture();
    }

    loadTexture() {
        if (this.path == null || this.path.length == 0) {
            return;
        }
        this._texture = TextureLoaderInstance.getInstance().load(this.path);
    }
}