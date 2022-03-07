//Declaration des services lies a la  class Produit dans le dossier models

import { Injectable } from "@angular/core";
import { AngularFirestore,  AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Articles } from "../models/Articles.model";
@Injectable({
 providedIn: 'root'
})

export class ProduitService {
 //Declarations de la fonction getProduits qui permet d'avoir les produits  sous forme de tableau
 articles: Articles[] = []  ;
 constructor(public firestore: AngularFirestore){}

 ngOnInit() {
  this.obtenirArticles() ;
}

 obtenirArticles() : Articles[] {
  this.firestore
  .collection('articles')
  .snapshotChanges()
  .subscribe( data  =>  {

    this.articles  = data.map( e =>  {
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

  return this.articles;
 }

 

  /*Declarations de la fonction getCaracteristique qui permet d'avoir les caracterisques des produits
  obtenirCaracterisques(): Produit[] {
  return this.obtenirProduits().slice(1 , 3) ;
 }

 //Declarations de la fonction getMeilleursVentes qui permet d'avoir les produits les plus et meiux vendus
 obtenirMeilleuresVentes(): Produit[] {
  return this.obtenirProduits().slice(2 , 5) ;
 }
 */
 //Declarations de la fonction obtenirProduitId qui permet d'avoir les produits par leur id
 obtenirProduitId(id: string): Articles{
  return this.obtenirArticles().find((produit) => produit.id === id ) ;
 }
}