import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable } from 'rxjs';
import { RecruitmentSaveForm } from './recruitment.interface';

@Injectable({
    providedIn: 'root'
})
export class RecruitmentControllerService {

    constructor(
        private _http: HttpService
    ) { }

    public saveRecruitmentProposer(form: RecruitmentSaveForm) {
        return this._http.post("save-recruitment-proposer", form);
    }

    public findList(data): Observable<any> {

        return this._http.post("find-recruitment-proposer-list", data);
    }

    public exportRecruitmentProposer(data, fileTransfer?: any, dataDirectory?: any) {
        return this._http.download("export-recruitment-proposer", data, null,  fileTransfer, dataDirectory);
    }
}
