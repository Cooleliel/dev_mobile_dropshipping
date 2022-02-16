import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CartItem } from 'src/app/models/cart.model';
import { Produit } from 'src/app/models/produit.model';
import { CartService } from 'src/app/services/cart.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id: number;  //Declaration de variable qui va recevoir l'id du produit

  produit:  Produit;//declaration d'objet de type Produit
  constructor(  
    private activatedRoute: ActivatedRoute  ,
    private produitService: ProduitService  ,
    private cartService:  CartService,
    private toastCtrl:  ToastController

    ) { 
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');//recuperation de l'id 
  }
  ngOnInit() {
    this.produit  = this.produitService.obtenirProduitParId(this.id);//appel de la fonction getProduitById qui prend en parametre l'id du produit et le retourne dans l'objet Produit
  }

  ajouterArticleAuPanier() {
    const panierArticle: CartItem  = {//declaration d'une variable constante 
      id: this.produit.id,
      prix: this.produit.prix,
      nom: this.produit.nom,
      image: this.produit.imageUrl,
      quantite: 1,
    }
    this.cartService.ajouterAuPanier(panierArticle);
    this.presentToast();
  }

  async presentToast()  {
    const toast = await this.toastCtrl.create({
      message:  'Article ajoute au panier',
      mode: 'ios',
      duration: 1000,
      position: 'top'
    }) ;
    toast.present() ;
  }
}
