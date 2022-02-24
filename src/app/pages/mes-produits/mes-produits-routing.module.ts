import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesProduitsPage } from './mes-produits.page';

const routes: Routes = [
  {
    path: '',
    component: MesProduitsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesProduitsPageRoutingModule {}
