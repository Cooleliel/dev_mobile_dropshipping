import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { Articles } from 'src/app/models/Articles.model';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { ProduitService } from 'src/app/services/produit.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage  implements  OnInit{
  articlesA: Articles[] = []  ;
  categorieSlides: Categorie[] ;//declaration de tableau d'objets de type categories
  caracteristiqueProduits: Articles[];//declaration de tableau d'objets de type caracteristiqueProduits


  //meilleurVenteProduits: Produit[];//declaration de tableau d'objets de type meilleurVenteProduits
  slideOpts = {
    initialSlide: 0, 

    spaceBetween:  0,
    slidesPerView: 2.8,
    slidesOffsetBefore: 6

  } ;
  constructor(private router: Router,private firestore: AngularFirestore  , private navCtrl:  NavController)  {
  }
  ngOnInit()  {
    this.obtenirArticles();
  }
  //declaration de la fonction qui recoit l'id du produit clique en parametre qui le redirige a la page details
  redirigerVersPageDetails(idItemProduit:  string)  {
    this.navCtrl.navigateForward('/details/'  + idItemProduit) ; 
  }

  //declaration de la fonction qui recoit l'id du produit clique en parametre qui le redirige a la page details
  redirigerVersPageProduit()  {
    this.router.navigate(['produit']);
  }

  //declaration de la fonction qui recoit l'id du produit clique en parametre qui le redirige a la page details
  redirigerVersPageCategorie()  {
    this.router.navigate(['categorie']);
  }

  redirigerVersPageCompte() {
    this.router.navigate(['compte'])  ;
  }

  obtenirArticles() : Articles[] {
    this.firestore
    .collection('articles')
    .snapshotChanges()
    .subscribe( data  =>  {

      this.articlesA  = data.map( e =>  {
        return  {
          id: e.payload.doc.id  ,

          user_id:  e.payload.doc.data()['user_id'] ,
          categorie:  e.payload.doc.data()['categorie'] ,
          description:  e.payload.doc.data()['description'],
          prix:  e.payload.doc.data()['prix'],
          stock:  e.payload.doc.data()['stock'],
          image:  e.payload.doc.data()['image']

        };
      });
    }) ; 

    return this.articlesA;
  }

}
