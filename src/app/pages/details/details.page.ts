import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Articles } from 'src/app/models/Articles.model';
import { panier } from 'src/app/models/panier.model';
import{ Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id: any;  //Declaration de variable qui va recevoir l'id du Articles

  articleD  = {}  as  Articles  ;//declaration d'un objet tableau de type Articles lie a la methode obtenirArticles //declaration d'un objet de type Articles lie a la methode obtenirIdProduit
  constructor(private loadingCtrl:  LoadingController ,
    private toastCtrl:  ToastController ,  
    private activatedRoute: ActivatedRoute  ,
    private firestore: AngularFirestore  ,
    public storage: Storage,
    public router: Router
    ) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('id');//recuperation de l'id
  }
  ngOnInit() {
    
    this.obtenirProduitParId(this.id);//appel de la fonction getProduitById qui prend en parametre l'id du produit et le retourne dans l'objet Produit
  }

  
  //Declarations de la fonction obtenirProduitId qui permet d'avoir les produits par leur id
  async obtenirProduitParId(id: string){
    let loader  = await this.loadingCtrl.create({
      message:  'Patienter s\'il vous plait ....'
    })  ;
  
    loader.present()  ;
    this.firestore
    .doc('articles/' + id)
    .valueChanges()
    .subscribe(data  =>  {
      this.articleD.id= id;
      this.articleD.categorie = data['categorie'] ;
      this.articleD.description = data['description'] ;
      this.articleD.prix = data['prix'] ;
      this.articleD.image = data['image'] ;
    })  ;
    loader.dismiss()  ;
  }


  ajouterArticleAuPanier( articledetails: Articles) {

    let ajout: boolean =false;
    //si le pânier est vide

    this.storage.get("panier").then((data: panier[]) => {
      if(data===null || data.length===0)
      {
        data=[];
        data.push({
          produit: articledetails,
          prix: articledetails.prix,
          nombre: 1,
          categorie: articledetails.categorie,
        })
      }

      else{
       
        for (let i=0; i<data.length; i++)
        {
            //le panier n'est pas vide et contient deja notre element
          const element: panier= data[i];

          
          console.log(element.produit.id)

          if(articledetails.id === element.produit.id)
          {
            console.log('deja present')
            element.nombre+= 1;
            element.prix+= articledetails.prix;
            ajout= true;
          }
        }
            //le panier n'est pas vide et ne contient pas notre element

            if(!ajout)
            {
              data.push({
                produit: articledetails,
                prix: articledetails.prix,
                nombre: 1,
                categorie: articledetails.categorie,
              })
            }

          }

          this.storage.set("panier", data);
          this.router.navigateByUrl('/panier');
    })
    
  }
}
