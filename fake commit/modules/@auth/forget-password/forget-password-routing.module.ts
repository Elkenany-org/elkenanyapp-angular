import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from '@app/@shared/pages/not-found/not-found.component';
import { ForgetPasswordComponent } from './forget-password.component';

const routes: Routes = [
  {
    path: '',
    component: ForgetPasswordComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgetPasswordRoutingModule {
}
