import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjoutPage } from './ajout.page';

const routes: Routes = [
  {
    path: '',
    component: AjoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjoutPageRoutingModule {}
