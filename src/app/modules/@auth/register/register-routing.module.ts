import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormrGuard } from '@app/@core/guards/form.guard';
import {NotFoundComponent} from '@app/@shared/pages/not-found/not-found.component';
import { RegisterComponent } from './register.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    // canDeactivate: [FormrGuard],

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
export class RegisterRoutingModule
{
}
