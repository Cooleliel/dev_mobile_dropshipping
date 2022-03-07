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
  //tousCategories: Categorie[] = []  ;
  categories: Articles[] = []  ;

  constructor( private router: Router  , private firestore:  AngularFirestore , private navCtrl:  NavController) { }

  ngOnInit() {
    this.obtenirCategories() ;
  }



  redirigerVersPageDetails(idItemCategorie:  String)  {
    this.navCtrl.navigateForward('/details/'  + idItemCategorie) ; 
  }


  obtenirCategories(): Articles[] {
    this.firestore
    .collection('articles')
    .snapshotChanges()
    .subscribe( data  =>  {

      this.categories  = data.map( e =>  {
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

    return this.categories;

  }

}
