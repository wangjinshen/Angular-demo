import { NgModule } from '@angular/core';
import { NgZorroAntdModule, NzInputNumberModule, NzPaginationModule, NzFormModule } from 'ng-zorro-antd';
import { ListComponent } from './list.component';
import { ListRoutingModule } from './list.routing.module';
import { CommonModule } from '@angular/common';
import { ListService } from './list.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ListRoutingModule,
        NgZorroAntdModule,
        NzPaginationModule,
        NzInputNumberModule,
        ReactiveFormsModule,
        NzFormModule,
        FormsModule
    ],
    declarations: [ListComponent],
    exports: [ListComponent],
    providers:[ListService]
})
export class ListModule { }
