import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectPagePage } from './connect-page.page';

const routes: Routes = [
  {
    path: '',
    component: ConnectPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectPagePageRoutingModule {}
