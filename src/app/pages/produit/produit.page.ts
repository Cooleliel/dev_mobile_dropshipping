import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Articles } from 'src/app/models/Articles.model';
import { ProduitService } from 'src/app/services/produit.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.page.html',
  styleUrls: ['./produit.page.scss'],
})
export class ProduitPage implements OnInit {
  articlesP: Articles[] = []  ;

  constructor(private loadingCtrl:  LoadingController , private toastCtrl:  ToastController ,private firestore:  AngularFirestore,  private produitService: ProduitService  , private navCtrl:  NavController  ) { }

  ngOnInit() {
    this.obtenirArticles() ;
  }
  redirigerVersPageDetails(idItemProduit:  String)  {
    this.navCtrl.navigateForward('/details/'  + idItemProduit) ; 
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

        this.articlesP  = data.map( e =>  {
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
