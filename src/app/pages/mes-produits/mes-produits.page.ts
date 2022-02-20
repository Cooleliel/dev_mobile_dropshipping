import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import { CreerProduitPage } from '../creer-produit/creer-produit.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mes-produits',
  templateUrl: './mes-produits.page.html',
  styleUrls: ['./mes-produits.page.scss'],
})
export class MesProduitsPage implements OnInit {

  constructor( public navCtrl: NavController , private router: Router) { }

  ngOnInit() {
  }

  showcreatepage()
  {
    this.router.navigateByUrl('/creer-produit');
  }
}
