import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifierarticlePageRoutingModule } from './modifierarticle-routing.module';

import { ModifierarticlePage } from './modifierarticle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifierarticlePageRoutingModule
  ],
  declarations: [ModifierarticlePage]
})
export class ModifierarticlePageModule {}
