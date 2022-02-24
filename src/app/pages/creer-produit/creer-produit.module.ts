import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreerProduitPageRoutingModule } from './creer-produit-routing.module';

import { CreerProduitPage } from './creer-produit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreerProduitPageRoutingModule
  ],
  declarations: [CreerProduitPage]
})
export class CreerProduitPageModule {}
