import { Injectable } from "@angular/core";
import { environmentFactory } from '../../config/environment/environment-variables';

@Injectable({
    providedIn: 'root'
})
export class GolbalVariable {
    /**
     * 
     */
    static server = () => GolbalVariable.renderVariables("server");

    /**
     * Request timeout
     */
    static timeout = () => 600000;

    static cacheVariables: any;

    static renderVariables(key: string) {
        const cacheVariables = GolbalVariable.cacheVariables;
        if (cacheVariables && cacheVariables[key]) {
            return cacheVariables[key];
        } else {
            GolbalVariable.cacheVariables = environmentFactory();
            return GolbalVariable[key]();
        }
    }

    constructor() { }

}

