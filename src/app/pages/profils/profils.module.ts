import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilsPageRoutingModule } from './profils-routing.module';

import { ProfilsPage } from './profils.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilsPageRoutingModule
  ],
  declarations: [ProfilsPage]
})
export class ProfilsPageModule {}
