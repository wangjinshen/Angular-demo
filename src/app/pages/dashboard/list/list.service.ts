import { Injectable } from '@angular/core';
import { RecruitmentControllerService } from 'src/app/services/api/recruitment-controller.service';
// RecruitmentControllerService
@Injectable()
export class ListService {
    constructor(
        private recruitmentControllerService: RecruitmentControllerService
    ) { }

    public findList(data: any) {
        
        return this.recruitmentControllerService.findList(data).toPromise();
    }

    public exportRecruitmentProposer(data: any, fileTransfer?: any, dataDirectory?: any) {
        // return this.recruitmentControllerService.exportRecruitmentProposer(data).toPromise();
        return this.recruitmentControllerService.exportRecruitmentProposer(data, fileTransfer, dataDirectory);
    }
}
