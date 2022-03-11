import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { AngularFirestore,  AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Articles } from 'src/app/models/Articles.model';
import  { LoadingController, Platform, ToastController  , NavController}  from  '@ionic/angular'  ;

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})
export class CategoriePage implements OnInit {
  categories: Categorie[] = []  ;
  constructor(  private firestore:  AngularFirestore , private navCtrl:  NavController) { }

  ngOnInit() {
    this.obtenirCategories() ;
  }



  redirigerVersPageCategorieChoisie(idItemCategorie:  String)  {
    this.navCtrl.navigateForward('/categorie-choisie/'  + idItemCategorie) ; 
  }


  obtenirCategories() {
    this.firestore
    .collection('categorie')
    .snapshotChanges()
    .subscribe( data  =>  {

      this.categories  = data.map( e =>  {
        return  {
          id: e.payload.doc.id  ,
          titre:  e.payload.doc.data()['titre'],
          image:  e.payload.doc.data()['image']

        };
      });
    }) ;
  }

  /*obtenirCategorie() {
    this.firestore
    .collection('categorie')
    .snapshotChanges()
    .subscribe( data  =>  {

      this.categorie  = data.map( e =>  {
        return  {
          id: e.payload.doc.id  ,
          titre:  e.payload.doc.data()['titre'] ,
          image:  e.payload.doc.data()['image']

        };
      });
    }) ;
  }*/

}
