import * as THREE from 'three';
import ModelData, { ModelDataType, TextureData } from './ModelData.js';
import { OrbitControls } from '../../../node_modules/three/examples/jsm/controls/OrbitControls.js';
export const modelPath = './src/assets/model/fbx/';
export const girlModelPath = modelPath + 'girl/';
export const progressBarElement = 'progressElement';

export function getOrbitControl(renderer) {
    return new OrbitControls(renderer.camera, renderer.domElement);
}

export const MATERIAL_TYPES = {
    MeshPhongMaterial: 'MeshPhongMaterial',
    MeshBasicMaterial: 'MeshBasicMaterial',
    MeshDepthMaterial: 'MeshDepthMaterial',
    MeshDistanceMaterial: 'MeshDistanceMaterial',
    MeshLambertMaterial: 'MeshLambertMaterial',
    MeshMatcapMaterial: 'MeshMatcapMaterial',
    MeshNormalMaterial: 'MeshNormalMaterial',
    MeshPhysicalMaterial: 'MeshPhysicalMaterial',
    MeshStandardMaterial: 'MeshStandardMaterial',
    MeshToonMaterial: 'MeshToonMaterial',
}

export const listGirlsPath = [
    girlModelPath + 'arm_d.png',
    girlModelPath + 'arm_n.png',
    girlModelPath + 'arm_r.png',
    girlModelPath + 'bikini_n.png',
    girlModelPath + 'bikini_r.png',
    girlModelPath + 'body_d.png',
    girlModelPath + 'body_n.png',
    girlModelPath + 'body_r.png',
    girlModelPath + 'dress_Base_Color_black.png',
    girlModelPath + 'dress_Base_Color_line.png',
    girlModelPath + 'dress_Base_Color_red.png',
    girlModelPath + 'dress_Base_Color_white.png',
    girlModelPath + 'dress_Normal.png',
    girlModelPath + 'dress_Roughness.png',
    girlModelPath + 'eye_d.png',
    girlModelPath + 'eye_n.png',
    girlModelPath + 'eye_r.png',
    girlModelPath + 'eyelash.png',
    girlModelPath + 'gen_d.png',
    girlModelPath + 'gen_n.png',
    girlModelPath + 'gen_r.png',
    girlModelPath + 'hair_d.png',
    girlModelPath + 'hair_n.png',
    girlModelPath + 'head_d.png',
    girlModelPath + 'head_n.png',
    girlModelPath + 'head_r.png',
    girlModelPath + 'joy_v1.42_base_packed.fbx',
    girlModelPath + 'joy_v1.42_dress_packed.fbx',
    girlModelPath + 'leg_d.png',
    girlModelPath + 'leg_n.png',
    girlModelPath + 'leg_r.png',
    girlModelPath + 'mouth_d.png',
    girlModelPath + 'mouth_m.png',
    girlModelPath + 'mouth_n.png',
    girlModelPath + 'skirt_Base_Color_black.png',
    girlModelPath + 'skirt_Base_Color_red.png',
    girlModelPath + 'skirt_Normal.png',
    girlModelPath + 'skirt_Roughness.png'
];



export function getLoadingView() {
    let loadingScene = document.createElement('div');
    let loadingLogo = document.createElement('img');
    loadingLogo.src = './src/assets/Logo.png';
    loadingLogo.style.width = '15%';
    loadingLogo.style.margin = '24px';
    loadingScene.style.width = '100%';
    loadingScene.style.height = '100%';
    loadingScene.style.position = 'absolute';
    loadingScene.style.display = 'flex';
    loadingScene.style.flexDirection = 'column';
    loadingScene.style.justifyContent = 'center';
    loadingScene.style.alignItems = 'center';
    loadingScene.style.zIndex = '1000';
    loadingScene.appendChild(loadingLogo);

    let loadingText = document.createElement('label');
    loadingText.innerText = 'Loading...';
    loadingText.style.fontSize = '64px';
    loadingText.style.margin = '36px';
    loadingText.style.color = 'antiquewhite';
    loadingText.style.fontFamily = '\'Bebas Neue\', sans-serif';
    loadingScene.appendChild(loadingText);
    let progressBar = document.createElement('div');
    progressBar.id = 'progressBar';
    progressBar.style.width = '300px';
    progressBar.style.height = '10px';
    progressBar.style.backgroundColor = '#252525';
    progressBar.style.borderRadius = '10px';
    progressBar.style.overflow = 'hidden';

    let progressElement = document.createElement('div');
    progressElement.id = progressBarElement;
    progressElement.style.height = '100%';
    progressElement.style.backgroundColor = '#e28743';
    progressElement.style.width = '0';
    progressElement.style.transition = 'width 0.3s ease-in-out';

    progressBar.appendChild(progressElement);
    loadingScene.appendChild(progressBar);
    return loadingScene;
}

export function loadModel(object, modelMapping, onDone, onProgress) {
    //do something

    object.traverse(function (child) {

        if (child.isMesh && child.hasOwnProperty('material')) {
            traverseArrayMaterial(child.material, modelMapping, onProgress);
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    onDone();
    object.castShadow = true;
    object.receiveShadow = true;
};

export function traverseArrayMaterial(data, modelMapping, onProgress) {

    if (data instanceof Array) {
        data.forEach((d) => {
            traverseArrayMaterial(d, modelMapping, onProgress);
        })
    }
    else {
        if (data.name !== undefined) {
            for (const element of modelMapping) {
                const modelData = element;
                if (data.name == modelData.name) {
                    data = setModelPhongMaterial(data, modelData);
                    onProgress();
                    break;
                }
            }
        }

    }
}

export function setModelStandardMaterial(material, modelData) {
    let data = new THREE.MeshStandardMaterial();
    if (modelData.textureDatas.length > 0) {
        data.map = modelData.textureDatas[0].texture;
        data.emissive = new THREE.Color(material.color);
        data.emissiveMap = data.map;
    }
    return data;
}

export function setModelPhongMaterial(data, modelData) {


    if (modelData.textureDatas.length > 0) {

        let color = new THREE.Color(data.color);
        data.emissive = color;
        data.specular = color.lerp(color, 0.1);
        if (data.name == 'dress_black' || data.name == 'skirt_black') {
            color = new THREE.Color(0xffffff);
            data.emissive = color;
            data.specular = color.lerp(color, 0.1);
        }
        data.emissiveMap = modelData.textureDatas[0].texture;
        data.specularMap = modelData.textureDatas[0].texture;
        if (modelData.textureDatas.length == 2) {
            data.normalMap = modelData.textureDatas[1].texture;

        }
        data.alphaMap = null;
        if (modelData.name == 'eyelash') {
            data.transparent = false;
            data.alphaTest = 0.1;
        }
    }
    data.needsUpdate = true;
    return data;
}

/*
0: "cornea"
1: "pupil"
2: "head"
3: "body"
4: "arm"
5: "leg"
6: "genital"
7: "lips"
8: "nail"
9: "eyelash"
10: "lacrimal"
11: "teeth"
12: "gum_tongue"
13: "hair_front"
14: "hair_back"
15: "bikini"
16: "dress_black"
17: "button"
18: "shoes"
19: "skirt_black"
*/

export function loadAllModelData() {
    let modelDatas = [];
    modelDatas.push(new ModelData(ModelDataType.CHARACTOR, 'cornea', []));
    modelDatas.push(
        new ModelData(
            ModelDataType.CHARACTOR, 'pupil',
            [new TextureData('d', girlModelPath + 'eye_d.png'),
            new TextureData('n', girlModelPath + 'eye_n.png'),
            new TextureData('r', girlModelPath + 'eye_r.png')
            ]
        )
    );
    modelDatas.push(
        new ModelData(
            ModelDataType.CHARACTOR, 'head',
            [
                new TextureData('d', girlModelPath + 'head_d.png'),
                new TextureData('n', girlModelPath + 'head_n.png'),
                new TextureData('r', girlModelPath + 'head_r.png')
            ]));
    modelDatas.push(
        new ModelData(ModelDataType.CHARACTOR, 'body', [
            new TextureData('d', girlModelPath + 'body_d.png'),
            new TextureData('n', girlModelPath + 'body_n.png'),
            new TextureData('r', girlModelPath + 'body_r.png')
        ]));
    modelDatas.push(
        new ModelData(ModelDataType.CHARACTOR, 'arm', [
            new TextureData('d', girlModelPath + 'arm_d.png'),
            new TextureData('n', girlModelPath + 'arm_n.png'),
            new TextureData('r', girlModelPath + 'arm_r.png'),
        ]));
    modelDatas.push(new ModelData(ModelDataType.CHARACTOR, 'leg', [
        new TextureData('d', girlModelPath + 'leg_d.png'),
        new TextureData('n', girlModelPath + 'leg_n.png'),
        new TextureData('r', girlModelPath + 'leg_r.png'),
    ]));
    modelDatas.push(new ModelData(ModelDataType.CHARACTOR, 'genital', [
        new TextureData('d', girlModelPath + 'gen_d.png'),
        new TextureData('n', girlModelPath + 'gen_n.png'),
        new TextureData('r', girlModelPath + 'gen_r.png'),
    ]));
    modelDatas.push(new ModelData(ModelDataType.CHARACTOR, 'lips', [
        new TextureData('d', girlModelPath + 'mouth_d.png'),
        new TextureData('n', girlModelPath + 'mouth_n.png'),
        new TextureData('m', girlModelPath + 'mouth_m.png'),
    ]));
    modelDatas.push(new ModelData(ModelDataType.CHARACTOR, 'nail', []));
    modelDatas.push(new ModelData(ModelDataType.CHARACTOR, 'eyelash', [
        new TextureData('d', girlModelPath + 'eyelash.png'),
    ]));
    modelDatas.push(new ModelData(ModelDataType.CHARACTOR, 'lacrimal', []));
    modelDatas.push(new ModelData(ModelDataType.CHARACTOR, 'teeth', [
        new TextureData('d', girlModelPath + 'mouth_d.png'),
        new TextureData('n', girlModelPath + 'mouth_n.png'),
        new TextureData('m', girlModelPath + 'mouth_m.png'),
    ]));
    modelDatas.push(new ModelData(ModelDataType.CHARACTOR, 'gum_tongue', [
        new TextureData('d', girlModelPath + 'mouth_d.png'),
        new TextureData('n', girlModelPath + 'mouth_n.png'),
        new TextureData('m', girlModelPath + 'mouth_m.png'),
    ]));
    modelDatas.push(new ModelData(ModelDataType.CHARACTOR, 'hair_front', [
        new TextureData('d', girlModelPath + 'hair_d.png'),
        new TextureData('n', girlModelPath + 'hair_n.png'),
    ]));
    modelDatas.push(new ModelData(ModelDataType.CHARACTOR, 'hair_back', [
        new TextureData('d', girlModelPath + 'hair_d.png'),
        new TextureData('n', girlModelPath + 'hair_n.png'),
    ]));
    modelDatas.push(new ModelData(ModelDataType.CHARACTOR, 'bikini', [
        new TextureData('r', girlModelPath + 'bikini_r.png'),
        new TextureData('n', girlModelPath + 'bikini_n.png'),
    ]));
    modelDatas.push(new ModelData(ModelDataType.CHARACTOR, 'dress_black', [
        new TextureData('d', girlModelPath + 'dress_Base_Color_black.png'),
        new TextureData('n', girlModelPath + 'dress_Normal.png'),
        new TextureData('r', girlModelPath + 'dress_Roughness.png'),
    ]));
    modelDatas.push(new ModelData(ModelDataType.CHARACTOR, 'button', []));
    modelDatas.push(new ModelData(ModelDataType.CHARACTOR, 'shoes', []));
    modelDatas.push(new ModelData(ModelDataType.CHARACTOR, 'skirt_black', [
        new TextureData('d', girlModelPath + 'skirt_Base_Color_black.png'),
        new TextureData('n', girlModelPath + 'skirt_Normal.png'),
        new TextureData('r', girlModelPath + 'skirt_Roughness.png'),
    ]));


    return modelDatas;
}



export function getFileByExtension(listPath, ext) {
    if (ext.includes('.')) {
        ext = ext.split('.')[1];
    }
    let data = []
    listPath.forEach(function (file) {

        if (getExtension(file) == ext) {
            data.push(file);
        }
    })

    return data;
}

export function getExtension(fileName) {
    return fileName.split('.')[3];
}


/*
0: "cornea"
1: "pupil"
2: "head"
3: "body"
4: "arm"
5: "leg"
6: "genital"
7: "lips"
8: "nail"
9: "eyelash"
10: "lacrimal"
11: "teeth"
12: "gum_tongue"
13: "hair_front"
14: "hair_back"
15: "bikini"
16: "dress_black"
17: "button"
18: "shoes"
19: "skirt_black"
*/