import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjoutPageRoutingModule } from './ajout-routing.module';

import { AjoutPage } from './ajout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjoutPageRoutingModule
  ],
  declarations: [AjoutPage]
})
export class AjoutPageModule {}
