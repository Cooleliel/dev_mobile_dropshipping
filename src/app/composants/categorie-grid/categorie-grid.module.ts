import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategorieGridComponent } from "./categorie-grid.component";
import { IonicModule } from "@ionic/angular";
import { CategorieCardModule } from "../categorie-card/categorie-card.module";
@NgModule({

 declarations: [CategorieGridComponent],
 imports: [ CommonModule , IonicModule , CategorieCardModule],
 exports: [CategorieGridComponent],
 
})
export class CategorieGridModule{}
