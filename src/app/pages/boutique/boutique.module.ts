import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoutiquePageRoutingModule } from './boutique-routing.module';

import { BoutiquePage } from './boutique.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoutiquePageRoutingModule
  ],
  declarations: [BoutiquePage]
})
export class BoutiquePageModule {}
