import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { HttpClientService, IHttpOptions } from '../../../core';
import { GolbalVariable } from '../constants/constants.service';
import { AuthGuardService } from '../auth/auth-guard.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService extends HttpClientService {

    constructor(
        public http: HttpClient,
        private authGuardService: AuthGuardService,
    ) {
        super(http);
        this.updateTimeout(GolbalVariable.timeout());
        this.setAPIBaseURL(GolbalVariable.server());
    }

    public get(url: string, reqOpts?: IHttpOptions) {
        return super.get(url, reqOpts);
    }

    public download(url: string, form?, reqOpts?: IHttpOptions, fileTransfer?: any, dataDirectory?: any) {
        let _opts: IHttpOptions;
        try {
            _opts = this.authGuardService.buildHeader(reqOpts);
        } catch (error) {
            return throwError(error);
        }
        return super.download(url, form, _opts, fileTransfer, dataDirectory);
    }

    public post(url: string, data: any = null, reqOpts?: IHttpOptions) {
        let _opts: IHttpOptions;
        try {
            _opts = this.authGuardService.buildHeader(reqOpts);
        } catch (error) {
            return throwError(error);
        }
        return super.post(url, data, _opts);
    }

    public handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            let errMsg: string;
            if (!!error.statusText) {
                errMsg = error.statusText;
            } else {
                errMsg = error.message;
            }
            setTimeout(() => {
                // this.toastService.present(ToastType.Error, errMsg);
            }, 0);
            return throwError(error);
        };
    }
}
