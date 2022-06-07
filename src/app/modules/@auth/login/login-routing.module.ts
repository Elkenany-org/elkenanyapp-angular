import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormrGuard } from '@app/@core/guards/form.guard';
import {NotFoundComponent} from '@app/@shared/pages/not-found/not-found.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    // canDeactivate: [FormrGuard]
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
export class LoginRoutingModule {
}
