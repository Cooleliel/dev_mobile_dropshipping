import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from 'src/app/models/produit.model';
import { ProduitService } from 'src/app/services/produit.service';
@Component({
  selector: 'app-produit',
  templateUrl: './produit.page.html',
  styleUrls: ['./produit.page.scss'],
})
export class ProduitPage implements OnInit {
  tousProduits: Produit[] = []  ;

  constructor(  private produitService: ProduitService  , private router: Router  ) { }

  ngOnInit() {
    this.tousProduits = this.produitService.obtenirProduits() ;
  }
  redirigerVersPageDetails(idItemProduit:  number)  {
    this.router.navigate(['details' , idItemProduit])
  }
}
