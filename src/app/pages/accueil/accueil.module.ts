import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccueilPageRoutingModule } from './accueil-routing.module';

import { AccueilPage } from './accueil.page';
import { AccueilSlideHeaderModule } from 'src/app/composants/accueil-slide-header/accueil-slide-header.module';
import { CategorieCardModule } from 'src/app/composants/categorie-card/categorie-card.module';
import { ProduitSlideModule } from 'src/app/composants/produit-slide/produit-slide.module';

@NgModule({
  //importation ou appel des differentes Modules qui vont servis ou interagir avec  la vue de la page AccueilPage(html)
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccueilPageRoutingModule,
    AccueilSlideHeaderModule,
    CategorieCardModule,
    ProduitSlideModule
  ],

  declarations: [AccueilPage]//declaration ou appel de la vue AccueilPage qui va permettre d'utiliser les differents modules
})
export class AccueilPageModule {}
