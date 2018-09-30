import { ModuleWithProviders, NgModule } from '@angular/core';

import { CanPermitDirective } from './directives/can-permit.directive';
import { PERMISSION_CONFIG_TOKEN } from './tokens/permission-config.token';
import { PermissionConfigInterface } from './interface/permissionConfig.interface';
import { resolveFeatureConfig } from './helpers/resolve-feature-config';

import { PermissionGuard } from './guards/permission.guard';
import { PermissionService } from './services/permission.service';

@NgModule({
  imports: [],
  declarations: [
    CanPermitDirective,
  ],
  providers: [
    PermissionGuard,
    PermissionService,
  ],
  exports: [
    CanPermitDirective,
  ]
})
export class NgxPermissionModule {
  public static forRoot(config: PermissionConfigInterface): ModuleWithProviders {
    return {
      ngModule: NgxPermissionModule,
      providers: [
        {
          provide: PERMISSION_CONFIG_TOKEN,
          useValue: config,
          multi: true,
        }
      ],
    };
  }

  public static forChild(featureName: string, config: PermissionConfigInterface): ModuleWithProviders {
    return {
      ngModule: NgxPermissionModule,
      providers: [
        {
          provide: PERMISSION_CONFIG_TOKEN,
          useFactory: resolveFeatureConfig,
          deps: [featureName, config],
          multi: true,
        }
      ],
    };
  }
}
