import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/@shared/shared.module';
import { SettingComponent } from './setting.component';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@app/@shared/components/layout/layout.component';

const children: Routes = [
  {
    path: '',
    component: SettingComponent,
    // canDeactivate: [FormrGuard],

  },

];

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children
  },
]

@NgModule({
  declarations: [
    SettingComponent
    ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SettingModule { }
