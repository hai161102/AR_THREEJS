import { BaseCamere } from "./BaseCamera.js";

export class MainCamera extends BaseCamere {

    constructor(width, height) {
        super(width, height);
        console.log(width, height);
    }
}