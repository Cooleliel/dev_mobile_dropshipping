import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriePageRoutingModule } from './categorie-routing.module';

import { CategoriePage } from './categorie.page';
import { CategorieGridModule } from 'src/app/composants/categorie-grid/categorie-grid.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriePageRoutingModule,
    CategorieGridModule
  ],
  declarations: [CategoriePage]
})
export class CategoriePageModule {}
