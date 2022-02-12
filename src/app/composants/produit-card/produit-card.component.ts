import { Component, Input } from '@angular/core';
import { Produit } from 'src/app/models/produit.model';

@Component({
  selector: 'app-produit-card',
  templateUrl: './produit-card.component.html',
  styleUrls: ['./produit-card.component.scss'],
})
export class ProduitCardComponent {
  @Input()  produitCard:  Produit;
}

