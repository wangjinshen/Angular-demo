import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { environmentFactory } from 'src/app/config/environment/environment-variables';
import { ListService } from './list.service';

var url = environmentFactory()
console.log(url)
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  // providers: [SocialService],
})
export class ListComponent implements OnInit {
  public value: any = '';
  public signType: any = 0;
  public data: any = { recruitmentProposerList: [] };
  public checked: any = false;
  public time: any;
  public type: any = true;
  public list: any = [];
  public dataList: any = [];
  public exported: any = 0;
  public notExported: any = 0;
  public totalPage: any = 0;
  public isSpinning: Boolean = false
  public total: any = 0;
  public pageNo: any = 0;


  public tplModalButtonLoading = false;
  public validateForm: FormGroup;
  public showAdd: Boolean = false;
  public alertTitle: String = "";
  public showInit: Boolean = false;
  public valueName: String = "";
  public EmailName: String = "";
  public roleSeleValue: String = "";
  public demoValue: Number = 1;
  public tplModal: NzModalRef;
  public isVisible = false;
  constructor(
    // private ListService: ListService,
    private router: Router,
    private fb: FormBuilder,
    private modalService: NzModalService,
    public ListService: ListService,
  ) {

  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      nickname: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      Role: [null, [Validators.required]]
    });
    const data = {
      pageNo: 1,
      pageSize: 10,
      // proposerName: this.value,
      proposerName: '',
      // status: this.signType == 0 ? null : this.signType
      status: null
    };
    this.getProposerList(data)
  }
  PageIndexChange(sum) {
    const data = {
      pageNo: this.pageNo,
      pageSize: 10,
      // proposerName: this.value,
      proposerName: '',
      // status: this.signType == 0 ? null : this.signType
      status: null
    };
    this.getProposerList(data)

  }
  GoToChange() {
    console.log(this.demoValue)
    const data = {
      pageNo: this.demoValue,
      pageSize: 10,
      // proposerName: this.value,
      proposerName: '',
      // status: this.signType == 0 ? null : this.signType
      status: null
    };
    this.getProposerList(data)
  }
  async getProposerList(data) {
    // await this.ListService.show();
    // const url = environmentFactory();
    this.value = '';
    this.signType = '0';
    this.checked = false;
    this.type = true;
    this.isSpinning = true
    this.ListService.findList(data)
      .then(
        (res) => {
          console.log('res', res);
          // this.ListService.hide();
          this.data = res || { recruitmentProposerList: [] };
          this.pageNo = res.pageNo
          this.totalPage = res.totalPage
          this.total = res.total
          this.demoValue = res.pageNo
          let exported = 0;
          let notExported = 0;
          this.dataList = (this.data.recruitmentProposerList || []).map(item => {
            if (item.status == 2) {
              exported++;
            } else {
              notExported++;
            }
            // item.proposerIdentityPhoto = (url.server + "/" + item.proposerIdentityPhoto);
            // item.proposerVideoIntroduction = (url.server + "/" + item.proposerVideoIntroduction);
            item.checked = false;
            return item;
          });
          this.list = JSON.parse(JSON.stringify(this.dataList));
          this.exported = exported;
          this.notExported = notExported;
          this.isSpinning = false
        },
        (err) => {
          console.log('err', err);
          // this.ListService.hide();
          this.isSpinning = false
        })
      .catch((err) => {
        console.log('err', err);
        // this.ListService.hide();
        this.isSpinning = false
      });

  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  showModal(text, item): void {
    console.log(item)
    this.isVisible = true;
    this.alertTitle = text
    if (text !== "New") {
      this.validateForm.get('nickname')!.setValue(item.proposerName);
      this.validateForm.get('email')!.setValue(item.proposerEmail);
    } else {
      this.validateForm.get('nickname')!.setValue(null);
      this.validateForm.get('email')!.setValue(null);

    }
  }

  handleOk(): void {
    let flog = true
    console.log('Button ok clicked!');
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls[i].status !== 'VALID') {
        flog = false
      }
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (flog) {
      this.isVisible = false;
    }
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


  showSetInit() {
    this.showInit = true
  }
  hideSetInit() {
    this.showInit = false
  }
  createTplModal(tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.tplModal = this.modalService.create({
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => console.log('Click ok')
    });
  }
  destroyTplModal(): void {
    this.tplModalButtonLoading = true;
    setTimeout(() => {
      this.tplModalButtonLoading = false;
      this.tplModal.destroy();
    }, 1000);
  }
  hideModal() {
    this.tplModal.destroy();
  }
}
