import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Produit } from 'src/app/models/produit.model';

@Component({
  selector: 'app-produit-card',
  templateUrl: './produit-card.component.html',
  styleUrls: ['./produit-card.component.scss'],
})
export class ProduitCardComponent {
  @Input()  produitCard:  Produit;//declaration d'objet de type Produit en entree(recoit des donnees de son composant parent)
  @Output() clicProdC = new EventEmitter();//declaration de variable emettant un evenement en sortie(transmet des donnees a son composant parent) 

  //la fonction getProduitById() utilise la variable de soirte clicked pour declencher un evenement avec la valeur idProduit
  obtenirProduitParIdC(idProduit: number)  {
    this.clicProdC.emit(idProduit)  ;
  }
}


