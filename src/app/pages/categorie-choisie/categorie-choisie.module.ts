import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategorieChoisiePageRoutingModule } from './categorie-choisie-routing.module';

import { CategorieChoisiePage } from './categorie-choisie.page';
import { CategorieGridModule } from 'src/app/composants/categorie-grid/categorie-grid.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategorieChoisiePageRoutingModule,
    CategorieGridModule
  ],
  declarations: [CategorieChoisiePage]
})
export class CategorieChoisiePageModule {}
