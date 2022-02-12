import { Component, Input } from '@angular/core';
import { Categorie } from 'src/app/models/categorie.model';

@Component({
  selector: 'app-categorie-card',
  templateUrl: './categorie-card.component.html',
  styleUrls: ['./categorie-card.component.scss'],
})
export class CategorieCardComponent  {
@Input()  categorieCard:  Categorie;//declaration d'objet de type Categorie
}

