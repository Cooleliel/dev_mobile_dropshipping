import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    //declaration des differentes routes constituants le composant tab-bar
    children: [
      {
        path: 'accueil',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/accueil/accueil.module').then( m => m.AccueilPageModule)
          }
        ]
      },
      {
        path: 'favoris',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/favoris/favoris.module').then( m => m.FavorisPageModule)
          }
        ]
      },
      {
        path: 'boutique',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/boutique/boutique.module').then( m => m.BoutiquePageModule)
          }
        ]
      },
      {
        path: 'message',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/message/message.module').then( m => m.MessagePageModule)
          }
        ]
      },
      //redirection par defaut du composant tab-bar sur la page d'accueil
      {
        path: '',
        redirectTo: '/tabs/accueil',
        pathMatch: 'full'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
