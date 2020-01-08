import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { CustomError } from '../../utils/custom-error/custom-error';
import { throwError, Observable } from 'rxjs';
import { timeout, catchError, map, filter, single } from 'rxjs/operators';
import { IHttpOptions, IHttpResponse } from './http.interface';

@Injectable()
export class HttpClientService {

    private _baseURL: string;
    private _defaultTimeout: number = 60000;

    constructor(
        public http: HttpClient
    ) { }

    public setAPIBaseURL(url: string) {
        this._baseURL = url;
    }

    public getAPIBaseURL() {
        if (!!this._baseURL) {
            return this._baseURL;
        } else {
            throw new CustomError("baseURL is undefined", -1001)
        }
    }

    public updateTimeout(timeout: number) {
        this._defaultTimeout = timeout;
    }

    private buildUrl(url: string, param?: string) {
        const baseUrl = this.getAPIBaseURL();
        if (!!param) {
            url = url + "?" + param;
        }
        if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            return url;
        } else if (url && url.charAt(0) !== '/') {
            return `${baseUrl}/${url}`;
        }
        return `${baseUrl}${url}`;
    }

    private buildOptions(reqOpts?: IHttpOptions): IHttpOptions {
        let headers = new HttpHeaders();
        let params = new HttpParams();
        if (reqOpts && reqOpts.headers) {
            const thisHeaders = reqOpts.headers;
            if (!(thisHeaders instanceof HttpHeaders)) {
                for (let key in reqOpts.headers) {
                    if (reqOpts.headers.hasOwnProperty(key)) {
                        headers = headers.set(key, reqOpts.headers[key]);
                    }
                }
            }else{
                headers = <HttpHeaders>reqOpts.headers;
            }
        }
        if (reqOpts && reqOpts.params) {
            const thisParams = reqOpts.params;
            if (!(thisParams instanceof HttpParams)) {
                for (let key in reqOpts.params) {
                    if (reqOpts.params.hasOwnProperty(key)) {
                        params = params.set(key, reqOpts.params[key]);
                    }
                }
            }else{
                params = <HttpParams>reqOpts.params;
            }
        }
        return {
            headers: headers,
            params: params,
        };
    }

    public handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.log(`${operation} failed: ${error.message}`); // log to console instead

            return throwError(error);
        };
    }

    public get(url: string, reqOpts?: any) {
        let _url: string;
        try {
            _url = this.buildUrl(url);
        } catch (error) {
            return throwError(error);
        }
        return this.http
            .get(_url)
            .pipe(
                single(),
                catchError(this.handleError(`get ${url}`))
            )
    }

    public download(url: string, data?: any, reqOpts?: IHttpOptions, fileTransfer?: any, dataDirectory?: any) {

        let _opts: IHttpOptions;
        let _url: string;

        try {
            _opts = this.buildOptions(reqOpts);
            _url = this.buildUrl(url);
        } catch (error) {
            return throwError(error);
        }

        if (fileTransfer) {
            _url = _url + '?recruitmentProposerIds=';
            data.map((item, index) =>  {
                if (index === data.length - 1) {
                    _url += item;
                } else {
                    _url += item + ',';
                }
            });
            console.log('fileTransfer_url', _url);
            return fileTransfer.download(_url, dataDirectory + new Date().getTime() + '.xlsx', true, {
                headers: _opts.headers,
            }).then((entry) => {
                console.log('download complete: ' + entry.toURL());
                return entry.toURL();
            }, (error) => {
                console.log('error download complete: ' + error);
                return error;
            });
        } else {
            return this.http
                .get(_url, {
                    headers: _opts.headers,
                    params: _opts.params,
                    responseType: 'blob',
                    observe: 'events',
                    reportProgress: true
                })
                .pipe(
                    map(event => {
                        switch (event.type) {
                            case HttpEventType.Sent:
                                return `Request download.`;
                            case HttpEventType.ResponseHeader:
                                return `Start download.`;
                            case HttpEventType.DownloadProgress:
                                const percentDone = Math.round(100 * event.loaded / event.total);
                                return percentDone;
                            case HttpEventType.Response:
                                return event.body;
                            default:
                                return `File surprising upload event: ${event.type}.`;
                        }
                    }),
                    catchError(this.handleError(`download ${url}`))
                );
        }
    }

    public post(url: string, data: any, reqOpts?: IHttpOptions) {

        let _opts: IHttpOptions;
        let _url: string;
        try {
            _opts = this.buildOptions(reqOpts);
            _url = this.buildUrl(url);
        } catch (error) {
            return throwError(error);
        }

        return this.http
            .post(_url, data, {
                headers: _opts.headers,
                params: _opts.params,
                responseType: 'json',
                observe: 'body'
            })
            .pipe(
                single(),
                timeout(this._defaultTimeout),
                filter((value: IHttpResponse) => {
                    console.log('value', value);
                    if (value.errCode == 0 || (value.errCode >= 200 && value.errCode < 300)) {
                        return true;
                    } else {
                        throw new HttpErrorResponse({
                            url: url,
                            status: value.errCode,
                            statusText: value.message
                        });
                    }
                }),
                map((value: IHttpResponse) => {
                    return value.data;
                }),
                catchError(this.handleError(`post ${url}`))
            );
    }
}
