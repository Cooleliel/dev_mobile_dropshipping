import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Articles } from '../models/Articles.model';
import { Produit } from '../models/produit.model';


@Injectable({
  providedIn: 'root'
})
export class SeviceService {


Article:Observable<any>;
  constructor(public firestore: AngularFirestore) { }


  lire() {
    return this.Article = this.firestore.collection('Article').valueChanges({idField:'id'});
  }

  ajouter(article:Articles) {
    return this.firestore.collection('Article').add(article);
  }

  supprimer(id: string){
    return this.firestore.collection('Article').doc(id).delete();
  }
  
  lireun(id: string): Observable<any>{
    return this.firestore.collection('Article').doc(id).snapshotChanges();
  }

  update(id: string,produit: Produit){
    return this.firestore.collection('Article').doc(id).set(produit);
  }



}
