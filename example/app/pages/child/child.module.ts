import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { doorlock, NgxPermissionModule } from 'ngx-role-permissions';

import { ChildRoutingModule } from './child-routing.module';
import { ChildViewComponent } from './child-view/child-view.component';
import { DataModule } from '../../components/data-component/data.module';
import { PermElementTypes } from '../../elements.enum';

@NgModule({
  imports: [
    CommonModule,
    ChildRoutingModule,
    DataModule,
    NgxPermissionModule.withElements([
      doorlock(PermElementTypes.MY_CHILD_ELEMENT).unlockWith(['admin']),
      doorlock(PermElementTypes.INVERSE_PERMITTER).lockWith(['admin']),
    ])
  ],
  declarations: [ChildViewComponent],
})
export class ChildModule { }
