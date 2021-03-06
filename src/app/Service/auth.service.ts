import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore,  AngularFirestoreCollection } from '@angular/fire/compat/firestore';
//import { of, Subject } from 'rxjs';
//import { collection, query, where } from "firebase/firestore";
import { Router } from "@angular/router";
import{ Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  public interdiction: boolean=false;
  collection: AngularFirestoreCollection<unknown>;
  id: any;
  myFlag: boolean=true;
  constructor(
    private angularFireAuth: AngularFireAuth, public firestore: AngularFirestore,private router: Router, public storage: Storage, public activatedRoute: ActivatedRoute
  ) 
  {}

  createUser(value) {
      return new Promise<any>((resolve, reject) => {
        this.angularFireAuth.createUtilisateur(value.nom, value.prenom, value.numero, value.email, value.password)
          .then(
            res => {
            console.log(value.password,value.email,value.nom,value.prenom,value.numero);

            this.firestore.collection('utilisateurs').add({
              nom: value.nom,
              prenom: value.prenom,
              email:  value.email,
              numero: value.numero,
              code: value.password
              });
              resolve(res)},

            err => reject(err))
      })
  }

  createArticle(value , url){

    this.angularFireAuth.createArticles(value.id_user, value.categorie, value.description, value.stock, value.prix, url)
          .then(
            res => {
            console.log(value.id_user, value.categorie, value.description, value.stock, value.prix, url);

             this.firestore.collection('articles').add({
                  user_id: value.id_user,
                  categorie: value.categorie,
                  description: value.description,
                  stock: value.stock,
                  prix: value.prix,
                  image: url
      });

    })
  }

  signinUser(value) {

    this.user= this.firestore.collection('utilisateurs').valueChanges();
console.log(value.password);
console.log(value.email);
    this.firestore.collection('utilisateurs', ref => ref.where('code', '==', value.password).where('email', '==', value.email)).snapshotChanges().subscribe(data =>{
      if(data.length >0)
      {
        this.firestore.collection('utilisateurs', ref => ref.where('code', '==', value.password).where('email', '==', value.email)).snapshotChanges().subscribe(data3 =>{
          data3.forEach(data4=> {

            this.storage.set('user_name', data4.payload.doc.data()['nom'])
            this.storage.set('user_id', data4.payload.doc.id)
            this.storage.set('user_second_name', data4.payload.doc.data()['prenom'])
            this.storage.set('user_email', data4.payload.doc.data()['email'])
            this.storage.set('user_number', data4.payload.doc.data()['numero'])

          }); 
        })
        this.router.navigate(['/tabs/accueil']);
      }
      else
      {
        console.log('rien');
        this.activatedRoute.params.subscribe((params) => {
          this.id = params['id'];
          this.myFlag = this.id == "null";
          console.log(this.myFlag);
      });
        this.router.navigate(['/login'],{queryParams: {errorMsg:1}});
       }
    })
  }


  signoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.angularFireAuth.currentUser) {
        this.angularFireAuth.signOut()
          .then(() => {
            console.log("Sign out");
            resolve();
          }).catch(() => {
            reject();
          });
      }
    })
  }

  userDetails() {
    return this.angularFireAuth.user
  }

  public getsession(){
      return this.storage.get('user_id').then((val) =>{
        console.log(val);
        return val;
      });
  }
/*
 utilisateurId(id: number) {
  return this.obtenirProduits().find((produit) => produit.id == id ) ;
 }
*/
}
