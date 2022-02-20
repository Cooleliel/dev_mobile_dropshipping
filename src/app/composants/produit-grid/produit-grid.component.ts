import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Produit } from 'src/app/models/produit.model';

@Component({
  selector: 'app-produit-grid',
  templateUrl: './produit-grid.component.html',
  styleUrls: ['./produit-grid.component.scss'],
})
export class ProduitGridComponent {
  @Input()  produitGrids:  Produit[]  = [];//declaration de tableau d'objets de type Produit
  @Output() envIdProdG = new EventEmitter();//declaration de variable emettant un evenement en sortie(transmet des donnees a son composant parent) 

  envoyerProduitIdG(idProduit: number)  {
    this.envIdProdG.emit(idProduit)  ;
  }
}
