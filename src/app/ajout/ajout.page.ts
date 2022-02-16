import { Component, OnInit } from '@angular/core';
import { SeviceService } from '../Service/sevice.service';

@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.page.html',
  styleUrls: ['./ajout.page.scss'],
})
export class AjoutPage implements OnInit {

  description: string;
  nom: string;
  prix: number;

  constructor(public dts:SeviceService) { }

  ngOnInit() {
  }


  add() {
    this.dts.ajouter({nom: this.nom, description: this.description, prix: this.prix});

  }
}
