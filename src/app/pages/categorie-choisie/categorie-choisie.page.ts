import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Articles } from 'src/app/models/Articles.model';
import { Categorie } from 'src/app/models/categorie.model';

@Component({
  selector: 'app-categorie-choisie',
  templateUrl: './categorie-choisie.page.html',
  styleUrls: ['./categorie-choisie.page.scss'],
})
export class CategorieChoisiePage implements OnInit {
  categoriesChoisie: Articles[] = [] ;
  articleD  = {}  as  Categorie  ;
  id: any;
  categories: Articles[] = []  ;
  tab1: Articles[]  = []  ;
  chaine1:  string;

  constructor(private loadingCtrl:  LoadingController ,private toastCtrl:  ToastController ,private activatedRoute: ActivatedRoute  ,private firestore:  AngularFirestore , private navCtrl:  NavController) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');//recuperation de l'id

  }

  ngOnInit() {
    this.obtenirCategorieProduitParId(this.id);
  }

  //Declarations de la fonction obtenirProduitId qui permet d'avoir les produits par leur id
  async obtenirCategorieProduitParId(id: string){
    let loader  = await this.loadingCtrl.create({
      message:  'Patienter s\'il vous plait ....'
    })  ;

    loader.present()  ;
    try {
      this.firestore
      .doc('categorie/' + id)
      .valueChanges()
      .subscribe(data  =>  {
        //console.log( data['categorie']);
        this.articleD.titre = data['titre'] ;
        this.chaine1  = this.articleD.titre;


        this.firestore
        .collection('articles', ref => ref.where('categorie', '==', this.articleD.titre))
        .snapshotChanges().subscribe(data3 =>{
          data3.forEach(data4=> {
      
            console.log('categorie' + data4.payload.doc.data()['categorie']);
            console.log('description' + data4.payload.doc.data()['description']);
            console.log('prix' + data4.payload.doc.data()['prix']);
            console.log('stock' + data4.payload.doc.data()['stock']);

          }); 

          this.categoriesChoisie  = data3.map( e =>  {
            return  {
              id: e.payload.doc.id  ,

              user_id:  e.payload.doc.data()['user_id'] ,
              categorie:  e.payload.doc.data()['categorie'] ,
              description:  e.payload.doc.data()['description'],
              prix:  e.payload.doc.data()['prix'],
              stock:  e.payload.doc.data()['stock'],
              image:  e.payload.doc.data()['image'],
              liked: e.payload.doc.data()['liked']
            };
          });
        });
        loader.dismiss()  ;
      })  ;
    }catch(e) {
      this.messageAttente(e) ;
    }
  }

  async obtenirCategories(){
    let loader  = await this.loadingCtrl.create({
      message:  'Patienter s\'il vous plait ....'
    })  ;

    loader.present()  ;
    try {
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
            image:  e.payload.doc.data()['image'],
            liked: e.payload.doc.data()['liked']
          };
        });
        loader.dismiss()  ;
      }) ; 
    }catch(e) {
      this.messageAttente(e) ;
    }
  }

  redirigerVersPageDetails(idItemProduit:  String)  {
    this.navCtrl.navigateForward('/details/'  + idItemProduit) ; 
  }

  messageAttente(message:  string) {
    this.toastCtrl.create({
      message:  message ,

      duration: 2000
    }).then(toastData =>  toastData.present())  ;
  }

}
