import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./pages/inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./pages/message/message.module').then( m => m.MessagePageModule)
  },
  {
    path: 'categorie',
    loadChildren: () => import('./pages/categorie/categorie.module').then( m => m.CategoriePageModule)
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./pages/details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'produit',
    loadChildren: () => import('./pages/produit/produit.module').then( m => m.ProduitPageModule)
  },
  {

    path: 'panier',
    loadChildren: () => import('./pages/panier/panier.module').then( m => m.PanierPageModule)
  },
  {

    path: 'favoris',
    loadChildren: () => import('./pages/favoris/favoris.module').then( m => m.FavorisPageModule)
  },
  {
    path: 'mes-produits',
    loadChildren: () => import('./pages/mes-produits/mes-produits.module').then( m => m.MesProduitsPageModule)
  },
  {
    path: 'creer-produit',
    loadChildren: () => import('./pages/creer-produit/creer-produit.module').then( m => m.CreerProduitPageModule)
  },
  {
    path: 'categorie-choisie/:id',
    loadChildren: () => import('./pages/categorie-choisie/categorie-choisie.module').then( m => m.CategorieChoisiePageModule)
  },
  {
    path: 'profils/:idUser',
    loadChildren: () => import('./pages/profils/profils.module').then( m => m.ProfilsPageModule)
  },
  {
    path: 'modifierarticle',
    loadChildren: () => import('./pages/modifierarticle/modifierarticle.module').then( m => m.ModifierarticlePageModule)
  },
  {
    path: 'connect-page',
    loadChildren: () => import('./pages/connect-page/connect-page.module').then( m => m.ConnectPagePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
