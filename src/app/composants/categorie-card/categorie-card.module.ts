import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategorieCardComponent } from "./categorie-card.component";
import { IonicModule } from "@ionic/angular";
@NgModule({

 declarations: [CategorieCardComponent],//declaration ou appel du composant  CategorieCardComponent qui va permettre d'utiliser les differents modules
 imports: [ CommonModule , IonicModule],  //importation ou appel des differentes Modules qui vont servis ou interagir avec  la vue du composant CategorieCardComponent(html)
 exports: [CategorieCardComponent],
 
})
export class CategorieCardModule{}
