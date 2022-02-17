import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProduitGridComponent } from "./produit-grid.component";
import { IonicModule } from "@ionic/angular";
import { ProduitCardModule } from "../produit-card/produit-card.module";
@NgModule({

 declarations: [ProduitGridComponent],
 imports: [ CommonModule , IonicModule , ProduitCardModule],
 exports: [ProduitGridComponent],
 
})
export class ProduitGridModule{}
