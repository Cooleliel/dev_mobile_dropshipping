import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/categorie.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import  { LoadingController, Platform, ToastController  , NavController}  from  '@ionic/angular'  ;

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})
export class CategoriePage implements OnInit {
  categories: Categorie[] = []  ;
  constructor(private loadingCtrl:  LoadingController ,private toastCtrl:  ToastController ,  private firestore:  AngularFirestore , private navCtrl:  NavController) { }

  ngOnInit() {
    this.obtenirCategories() ;
  }

  redirigerVersPageCategorieChoisie(idItemCategorie:  String)  {
    this.navCtrl.navigateForward('/categorie-choisie/'  + idItemCategorie) ; 
  }


  async obtenirCategories() {
    let loader  = await this.loadingCtrl.create({
      message:  'Patienter s\'il vous plait ....'
    })  ;

    loader.present()  ;
    try {
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

  doRefresh(event){

    window.location.reload();
   }

}
