import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProduitCardComponent } from "./produit-card.component";
import { IonicModule } from "@ionic/angular";
@NgModule({

 declarations: [ProduitCardComponent],
 imports: [ CommonModule , IonicModule],
 exports: [ProduitCardComponent],
 
})
export class ProduitCardModule{}
