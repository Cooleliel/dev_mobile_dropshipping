import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Articles } from 'src/app/models/Articles.model';
import { ProduitService } from 'src/app/services/produit.service';
import { AngularFirestore,  AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.page.html',
  styleUrls: ['./produit.page.scss'],
})
export class ProduitPage implements OnInit {
  articlesP: Articles[] = []  ;

  constructor(private firestore:  AngularFirestore,  private produitService: ProduitService  , private router: Router  ) { }

  ngOnInit() {
    this.obtenirArticles() ;
  }
  redirigerVersPageDetails(idItemProduit:  string)  {
    this.router.navigateByUrl('details?id='+idItemProduit);
  }

  obtenirArticles() : Articles[] {
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
    }) ; 

    return this.articlesP;
   }

}
