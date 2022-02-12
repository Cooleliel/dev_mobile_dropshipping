import { Component, Input } from '@angular/core';
import { Produit } from 'src/app/models/produit.model';

@Component({
  selector: 'app-produit-slide',
  templateUrl: './produit-slide.component.html',
  styleUrls: ['./produit-slide.component.scss'],
})
export class ProduitSlideComponent {
  @Input()  produitSlides:  Produit[];//declaration de tableau d'objets de type Produit
  produitsSlideOpts = {

    initialSlide: 0, 
    spaceBetween:  0,
    slidesPerView: 2.2,

    slidesOffsetBefore: 5

  } ;

}

