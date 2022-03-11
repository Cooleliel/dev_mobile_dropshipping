import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Articles } from 'src/app/models/Articles.model';
import { Categorie } from 'src/app/models/categorie.model';

@Component({
  selector: 'app-categorie-card',
  templateUrl: './categorie-card.component.html',
  styleUrls: ['./categorie-card.component.scss'],
})
export class CategorieCardComponent  {
  @Input()  categorieCard:  Categorie;//declaration d'objet de type Categorie
  @Output() clicCatC= new EventEmitter();//declaration de variable emettant un evenement en sortie(transmet des donnees a son composant parent) 

  //la fonction getProduitById() utilise la variable de soirte clicked pour declencher un evenement avec la valeur idProduit
  obtenirIdCategorieC(idCategorie: string)  {
    this.clicCatC.emit(idCategorie)  ;
  }
}

