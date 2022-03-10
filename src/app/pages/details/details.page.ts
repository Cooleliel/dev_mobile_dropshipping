import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Articles } from 'src/app/models/Articles.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id: any;  //Declaration de variable qui va recevoir l'id du Articles

  articleD  = {}  as  Articles  ;//declaration d'un objet tableau de type Articles lie a la methode obtenirArticles //declaration d'un objet de type Articles lie a la methode obtenirIdProduit
  constructor(  
    private activatedRoute: ActivatedRoute  ,
    private firestore: AngularFirestore  ,

    ) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('id');//recuperation de l'id
  }
  ngOnInit() {
    
    this.obtenirProduitParId(this.id);//appel de la fonction getProduitById qui prend en parametre l'id du produit et le retourne dans l'objet Produit
  }

  
  //Declarations de la fonction obtenirProduitId qui permet d'avoir les produits par leur id
  obtenirProduitParId(id: string){
   this.firestore
   .doc('articles/' + id)
   .valueChanges()
   .subscribe(data  =>  {
    this.articleD.id = data['id'] ;
     this.articleD.categorie = data['categorie'] ;
     this.articleD.description = data['description'] ;
     this.articleD.prix = data['prix'] ;
     this.articleD.image = data['image'] ;
   })  ;
  }
}
