import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProduitSlideComponent } from "./produit-slide.component";
import { IonicModule } from "@ionic/angular";
import { ProduitCardModule } from "../produit-card/produit-card.module";
@NgModule({

 declarations: [ProduitSlideComponent],//declaration ou appel du composant ProduitSlide qui va permettre d'utiliser les differents modules
 imports: [ CommonModule , IonicModule , ProduitCardModule],  //importation ou appel des differentes Modules qui vont servis ou interagir avec  la vue du composant ProduitSlide(html)

 exports: [ProduitSlideComponent],
 
})
export class ProduitSlideModule{}
