import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(  private router: Router) {}

  allerPageAccueil() {
    this.router.navigate(['tabs/accueil']);

  }

  allerPageFavori() {
    this.router.navigate(['tabs/favoris']);

  }

  allerPageMesProduit() {
    this.router.navigate(['mes-produits']);

  }

  allerPageMessage() {
    this.router.navigate(['message']);

  }

  allerPagePanier() {
    this.router.navigate(['panier']);

  }

  allerPageBoutique() {
    this.router.navigate(['tabs/boutique']);

  }

  allerPageCategorie() {
    this.router.navigate(['categorie']);

  }

  allerPageCompte() {
    this.router.navigate(['tabs/compte']);

  }
}
