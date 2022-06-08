import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SearchResolver } from "@app/@core/resolver/search/search-resolver.service";
import { LayoutComponent } from "@app/@shared/components/layout/layout.component";
import { SearchComponent } from "./search.component";

const children: Routes = [
    {
      path: ':word',
      component: SearchComponent,
      resolve: {
        resolve: SearchResolver
      },
    }
    
  ];
  
  const routes: Routes = [
    {
      path: '',
      component: LayoutComponent,
      children
    },
  ];
  
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
  })
  export class SearchRoutingModule {
  }
  