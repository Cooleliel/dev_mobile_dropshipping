import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifierarticlePage } from './modifierarticle.page';

const routes: Routes = [
  {
    path: '',
    component: ModifierarticlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifierarticlePageRoutingModule {}
