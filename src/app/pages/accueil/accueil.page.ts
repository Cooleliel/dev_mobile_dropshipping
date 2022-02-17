import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/models/categorie.model';
import { Produit } from 'src/app/models/produit.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage  implements  OnInit{
  categorieSlides: Categorie[] =  [];//declaration de tableau d'objets de type categories
  caracteristiqueProduits: Produit[]  = [];//declaration de tableau d'objets de type caracteristiqueProduits

  meilleurVenteProduits: Produit[];//declaration de tableau d'objets de type meilleurVenteProduits
  slideOpts = {
    initialSlide: 0, 

    spaceBetween:  0,
    slidesPerView: 2.8,
    slidesOffsetBefore: 6

  } ;
  constructor(  private categorieService: CategorieService, private produitService: ProduitService  , private router: Router)  {
  }
  ngOnInit()  {
    this.categorieSlides = this.categorieService.obtenirCategories();//attributs les donnees de la fonction getCategories qui returne un tableau d'objets de type categories
    this.caracteristiqueProduits = this.produitService.obtenirCaracterisques();//attributs les donnees de la fonction getCaracterisques qui returne un tableau d'objets de type caracteristiqueProduits

    this.meilleurVenteProduits = this.produitService.obtenirMeilleuresVentes();//attributs les donnees de la fonction getMeilleuresVentes qui returne un tableau d'objets de type meilleurVenteProduits
  }
  //declaration de la fonction qui recoit l'id du produit clique en parametre qui le redirige a la page details
  redirigerVersPageDetails(idItemProduit:  number)  {
    this.router.navigate(['details' , idItemProduit])
  }

  //declaration de la fonction qui recoit l'id du produit clique en parametre qui le redirige a la page details
  redirigerVersPageProduit()  {
    this.router.navigate(['produit'])
  }

  //declaration de la fonction qui recoit l'id du produit clique en parametre qui le redirige a la page details
  redirigerVersPageCategorie()  {
    this.router.navigate(['categorie'])
  }

  redirigerVersPageCompte() {
    this.router.navigate(['compte'])  ;
  }
}
