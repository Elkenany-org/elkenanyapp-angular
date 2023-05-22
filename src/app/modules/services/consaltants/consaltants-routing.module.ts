import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsaltantsHomeComponent } from './consaltants-home/consaltants-home.component';
import { ConsaltantsResolver } from '@app/@core/resolver/consaltants/consaltants.resolver.service';

const routes:Routes = [
  {
    path: '',
    component: ConsaltantsHomeComponent,
    resolve: {
      resolve: ConsaltantsResolver
    }
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsaltantsRoutingModule { }
