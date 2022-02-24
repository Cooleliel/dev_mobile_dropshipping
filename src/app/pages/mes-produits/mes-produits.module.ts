import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesProduitsPageRoutingModule } from './mes-produits-routing.module';

import { MesProduitsPage } from './mes-produits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesProduitsPageRoutingModule
  ],
  declarations: [MesProduitsPage]
})
export class MesProduitsPageModule {}
