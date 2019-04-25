import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPermissionModule } from 'ngx-role-permissions';

import { ChildRoutingModule } from './child-routing.module';
import { ChildViewComponent } from './child-view/child-view.component';
import { DataModule } from '../../components/data-component/data.module';

@NgModule({
  imports: [
    CommonModule,
    ChildRoutingModule,
    DataModule,
    NgxPermissionModule.withElements({
      myChildElement: ['admin'],
      inversePermiter: ['admin'],
    })
  ],
  declarations: [ChildViewComponent],
})
export class ChildModule { }
