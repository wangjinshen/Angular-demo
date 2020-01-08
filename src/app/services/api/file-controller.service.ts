import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { UploadFileResponse } from './file.interface'

@Injectable({
    providedIn: 'root'
})
export class FileControllerService {

    constructor(
        private _http: HttpService
    ) { }

    public uploadVideoIntroduction(formData: FormData): Observable<UploadFileResponse> {
        return this._http.post("server/uploadVideoIntroduction", formData);
    }

    public uploadIdentityPhoto(imageData: string): Observable<UploadFileResponse> {
        return this._http.post("server/uploadIdentityPhoto", imageData);
    }
}
