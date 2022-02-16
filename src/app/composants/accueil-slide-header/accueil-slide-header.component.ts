import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accueil-slide-header',
  templateUrl: './accueil-slide-header.component.html',
  styleUrls: ['./accueil-slide-header.component.scss'],
})
export class AccueilSlideHeaderComponent  {
  @Input()  titre:  string  ;
}
