import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormrGuard } from '@app/@core/guards/form.guard';
import {NotFoundComponent} from '@app/@shared/pages/not-found/not-found.component';
import { PaymentComponent } from './payment.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentComponent,
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
export class PaymentRoutingModule {
}
