import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavorisPageRoutingModule } from './favoris-routing.module';

import { FavorisPage } from './favoris.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavorisPageRoutingModule
  ],
  declarations: [FavorisPage]
})
export class FavorisPageModule {}
