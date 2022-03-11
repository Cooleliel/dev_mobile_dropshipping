import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorieChoisiePageRoutingModule } from './categorie-choisie-routing.module';

import { CategorieChoisiePage } from './categorie-choisie.page';
import { ProduitGridModule } from 'src/app/composants/produit-grid/produit-grid.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategorieChoisiePageRoutingModule,
    ProduitGridModule

  ],
  declarations: [CategorieChoisiePage]
})
export class CategorieChoisiePageModule {}
