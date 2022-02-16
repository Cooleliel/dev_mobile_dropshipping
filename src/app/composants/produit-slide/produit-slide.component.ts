import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from 'src/app/models/produit.model';

@Component({
  selector: 'app-produit-slide',
  templateUrl: './produit-slide.component.html',
  styleUrls: ['./produit-slide.component.scss'],
})
export class ProduitSlideComponent {
  @Input()  produitSlides:  Produit[];//declaration de tableau d'objets de type Produit
  @Output() shared = new EventEmitter();//declaration de variable emettant un evenement en sortie(transmet des donnees a son composant parent) 

  //la fonction sharedProduitById() utilise la variable de soirte shared pour declencher un evenement avec la valeur idProduit
  sharedProduitId(idProduit: any)  {
    this.shared.emit(idProduit)  ;
  }
  produitsSlideOpts = {
    initialSlide: 0, 
    spaceBetween:  0,

    slidesPerView: 2.2,
    slidesOffsetBefore: 5
  } ;
}

