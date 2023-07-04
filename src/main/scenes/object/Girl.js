import { BaseObject } from "./BaseObject.js";

export class Girl extends BaseObject {
    
    constructor(object) {
        super();
        this.setAnimation(object);
    }
}