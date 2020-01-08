import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface IHttpOptions {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: string;
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: string;
    withCredentials?: boolean;
}

export interface IHttpResponse {
    data: any;
    errCode: number;
    message: string;
    success: boolean;
}
