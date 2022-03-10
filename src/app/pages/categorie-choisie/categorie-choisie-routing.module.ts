import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategorieChoisiePage } from './categorie-choisie.page';

const routes: Routes = [
  {
    path: '',
    component: CategorieChoisiePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategorieChoisiePageRoutingModule {}
