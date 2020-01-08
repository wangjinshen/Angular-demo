"use strict";

import { localVariables } from './local';
import { devVariables } from './dev';
import { preVariables } from './pre';
import { prodVariables } from './prod';

declare const process: any;

export function environmentFactory() {

    switch (process.env.NODE_ENV) {
        case 'dev':
            return devVariables;
        case 'local':
            return localVariables;
        case 'pre':
            return preVariables;
        case 'prod':
            return prodVariables;
        default:
            return preVariables;
    }
}
