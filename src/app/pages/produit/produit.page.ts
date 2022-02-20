import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { Router } from '@angular/router';
import { Produit } from 'src/app/models/produit.model';
import { ProduitService } from 'src/app/services/produit.service';

>>>>>>> ce12485651548899a620756fac95e9c307f247c3
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
