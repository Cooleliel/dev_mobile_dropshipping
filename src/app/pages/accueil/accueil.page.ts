import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { Articles } from 'src/app/models/Articles.model';
import { Categorie } from 'src/app/models/categorie.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage  implements  OnInit{
  articlesA: Articles[] = []  ;
  categoriesSlides: Categorie[] =  [];//declaration de tableau d'objets de type categories
  caracteristiqueProduits: Articles[];//declaration de tableau d'objets de type caracteristiqueProduits


  //meilleurVenteProduits: Produit[];//declaration de tableau d'objets de type meilleurVenteProduits
  slideOpts = {
    initialSlide: 0, 

    spaceBetween:  0,
    slidesPerView: 2.2,
    slidesOffsetBefore: 6

  } ;
  constructor(private loadingCtrl:  LoadingController ,private toastCtrl:  ToastController ,private router: Router,private firestore: AngularFirestore  , private navCtrl:  NavController)  {
  }
  ngOnInit()  {
    this.obtenirCategories();
    this.obtenirArticles();
  }
  //declaration de la fonction qui recoit l'id du produit clique en parametre qui le redirige a la page details
  redirigerVersPageDetails(idItemProduit:  string)  {
    this.navCtrl.navigateForward('/details/'  + idItemProduit) ; 
  }

  redirigerVersPageCategorieChoisie(categorieItemProduit:  string)  {
    this.navCtrl.navigateForward('/categorie-choisie/'  + categorieItemProduit) ; 
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

  async obtenirCategories(){
    let loader  = await this.loadingCtrl.create({
      message:  'Patienter s\'il vous plait ....'
    })  ;

    loader.present()  ;
    try {
      this.firestore
      .collection('categorie')
      .snapshotChanges()
      .subscribe( data  =>  {

        this.categoriesSlides  = data.map( e =>  {
          return  {
            id: e.payload.doc.id  ,
            titre:  e.payload.doc.data()['titre'],
            image:  e.payload.doc.data()['image']

          };
        });
        loader.dismiss()  ;
      }) ;
    }catch(e) {
      this.messageAttente(e) ;
    } 
  }
  async obtenirArticles() {
    let loader  = await this.loadingCtrl.create({
      message:  'Patienter s\'il vous plait ....'
    })  ;

    loader.present()  ;
    try {
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
            image:  e.payload.doc.data()['image'],
            liked: e.payload.doc.data()['liked'], 
          };
        });
        loader.dismiss()  ;
      }) ;
    }catch(e) {
      this.messageAttente(e) ;
    }  
  }

  messageAttente(message:  string) {
    this.toastCtrl.create({
      message:  message ,

      duration: 2000
    }).then(toastData =>  toastData.present())  ;
  }

}
