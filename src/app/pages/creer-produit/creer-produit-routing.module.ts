import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreerProduitPage } from './creer-produit.page';

const routes: Routes = [
  {
    path: '',
    component: CreerProduitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreerProduitPageRoutingModule {}
