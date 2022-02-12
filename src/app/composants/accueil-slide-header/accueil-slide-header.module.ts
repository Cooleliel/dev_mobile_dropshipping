import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccueilSlideHeaderComponent } from "./accueil-slide-header.component";

import { IonicModule } from "@ionic/angular";
@NgModule({
 declarations: [ AccueilSlideHeaderComponent ],

 imports: [ CommonModule , IonicModule ],
 exports: [ AccueilSlideHeaderComponent ],
})
export class AccueilSlideHeaderModule{}