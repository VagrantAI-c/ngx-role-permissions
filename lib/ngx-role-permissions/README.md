# ngx-role-permissions
[![npm version](https://badge.fury.io/js/ngx-role-permissions.svg)](https://badge.fury.io/js/ngx-role-permissions)
[![Build Status](https://travis-ci.com/grachpower/ngx-role-permissions.svg?branch=master)](https://travis-ci.com/grachpower/ngx-role-permissions)

Permission and roles based access control for your angular(angular 6,7+) applications


## Documentation and examples

v2.0.0 have critical changes

see CHANGELOG.MD


## Demo
[Demo ngx-role-permissions] (https://stackblitz.com/edit/ngx-role-permissions)

## Installation

To install this library, run:

```bash
$ npm install ngx-role-permissions --save
```

## Consuming library

You can import library in any Angular application by running:

```bash
$ npm install ngx-role-permissions  --save
```

and then from your Angular `AppModule`:

use `NgxPermissionModule` with `withElements` in any of your modules

`doorlock` generates permission element which can be defined in constants or enums etc.
`unlockWith(...)` provide roles for which elements will be available 
`lockWith(...)` tells if current element will be block with specified roles 

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { NgxPermissionModule, doorlock } from 'ngx-role-permissions';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
     NgxPermissionModule.withElements([
       doorlock('yourElement1').unlockWith(['admin', 'user']),
       doorlock('yourElement2').lockWith(['user']),
     ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Providing initial roles:
`INITIAL_ROLES` is multitoken that can provide initial roles
```typescript
@NgModule({
  ...
  imports: [
    // Specify your library as an import
     NgxPermissionModule.withElements([
       ...
     ]),
  ],
  providers: [
      provide: INITIAL_ROLES,
      multi: true,
      useValue: ['user'], //your roles
  ]
})
export class AppModule { }
```


SharedModule

If you use a SharedModule that you import in multiple other feature modules, you can export the NgxPermissionModule to make sure you don't have to import it in every module.
NgxPermissionModule with or without `withElements`notations provides `canPermit` and `canNotPermit` directive so you should import it in every module you use permission directives.  
```typescript
@NgModule({
    exports: [
        CommonModule,
        NgxPermissionModule,
    ]
})
export class SharedModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

Import service to the main application and load permissions

```typescript
import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'ngx-role-permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngx-role-permissions';

  constructor(
    private permissionService: PermissionService,
  ) {}

  public ngOnInit(): void {
    this.permissionService.setRoles([
      'user',
    ]);

    // append role
    this.permissionService.addRole('admin');

    // remove role
    this.permissionService.removeRole('admin');
  }
}

```

Usage in templates 

`*canPermit` check if element roles includes current user role
```html
<div class="element-two" *canPermit="'yourFeatureElement1'">
    Feature element one directive example
</div>
```

`*canNotPermit` check if element roles excludes current user role
```html
<div class="element-two" *canNotPermit="'yourFeatureElement1'">
    Feature element one directive example
</div>
```
### Managing permissions


Usage in routing guards:
`permissionConfig` placed in data declare route configuration.
`permission element` - name of element which defined in module with `doorlock`.
`redirectRoute` - router path to redirect page if current route is blocked.
If `redirectRoute` was not defined no redirect will be done

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'ngx-role-permissions';

const routes: Routes = [
  {
    path: 'one',
    component: ChildComponent1,
    canActivate: [PermissionGuard],
    data: {
      permissionConfig: {
        permissionElement: 'yourFeatureElement2',
      }
    }
  },
  {
    path: 'two',
    component: ChildComponent2,
    canActivate: [PermissionGuard],
    data: {
      permissionConfig: {
        permissionElement: 'yourFeatureElement2',
        redirectRoute: '/dashboard',
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildTwoRoutingModule { }
```

Usage in custom directives/guards/components etc.
```typescript
@Directive({
  selector: '[canAccess]',
})
export class CanPermitDirective implements OnChanges, OnDestroy {
  private permissionSubscription: SubscriptionLike;

  constructor(
    private permissionService: PermissionService,
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
  ) {}

  @Input() canAccess: string;

  public ngOnChanges(changes: SimpleChanges): void {
    this.initPermissionCheck(changes.canPermit.currentValue);
  }

  public ngOnDestroy(): void {
    this.permissionSubscription.unsubscribe();
    this.permissionSubscription = null;
  }

  private initPermissionCheck(elementName: string): void {
    if (!!this.permissionSubscription) {
      this.permissionSubscription.unsubscribe();
      this.permissionSubscription = null;
    }

    this.permissionSubscription = this.permissionService.canAccess(elementName)
      .subscribe((res: boolean) => {
        if (!!res && !!this.templateRef) {
          this.viewContainer.clear();
          this.viewContainer.createEmbeddedView(this.templateRef, {});
        } else {
          this.viewContainer.clear();
        }
      });
  }
}
```


## For google
angular permissions, angular 6 permissions, angular permissions, angular 6 permissions ng2 permissions ng permissions
ng-permissions ng2-permissions angular2 permissions  angular4 permissions angular 5 permissions

