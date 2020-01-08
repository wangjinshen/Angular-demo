import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { IHttpOptions } from '../../../core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {

    constructor(
    ) {

    }

    public buildHeader(reqOpts?: IHttpOptions): IHttpOptions {
        let headers = new HttpHeaders();
        if (reqOpts && reqOpts.headers) {
            for (let key in reqOpts.headers) {
                if (reqOpts.headers.hasOwnProperty(key)) {
                    headers = headers.set(key, reqOpts.headers[key]);
                }
            }
            reqOpts.headers = headers;
        }
        return {
            headers: headers
        };
    }

}
