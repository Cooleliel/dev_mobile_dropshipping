import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { Categorie } from 'src/app/models/categorie.model';

@Component({
  selector: 'app-categorie-grid',
  templateUrl: './categorie-grid.component.html',
  styleUrls: ['./categorie-grid.component.scss'],
})
export class CategorieGridComponent{
  @Input()  categorieGrids:  Categorie[]  = [];//declaration de tableau d'objets de type Produit
  @Output() envIdCatG = new EventEmitter();//declaration de variable emettant un evenement en sortie(transmet des donnees a son composant parent) 

  envoyerCategorieIdG(idCategorie: number)  {
    this.envIdCatG.emit(idCategorie)  ;
  }
}
