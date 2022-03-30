import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnectPagePageRoutingModule } from './connect-page-routing.module';

import { ConnectPagePage } from './connect-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnectPagePageRoutingModule
  ],
  declarations: [ConnectPagePage]
})
export class ConnectPagePageModule {}
