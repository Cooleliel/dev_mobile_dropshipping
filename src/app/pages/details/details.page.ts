import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Articles } from 'src/app/models/Articles.model';
import { panier } from 'src/app/models/panier.model';
import{ Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { LoadingController, ToastController, AlertController, ModalController } from '@ionic/angular';
import { ConnectPagePage } from 'src/app/pages/connect-page/connect-page.page';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public user_id: string;
  public status: string;
  id: any;
  myFlag: boolean;
  articleD  = {}  as  Articles  ;//declaration d'un objet tableau de type Articles lie a la methode obtenirArticles //declaration d'un objet de type Articles lie a la methode obtenirIdProduit
  utilisateur: boolean;
  id2: any;
  
  constructor(private loadingCtrl:  LoadingController ,
    private toastCtrl:  ToastController ,  
    private activatedRoute: ActivatedRoute  ,
    private firestore: AngularFirestore  ,
    public storage: Storage,
    public router: Router, 
    public toast: ToastController,
    public alertCtrl: AlertController,
    public modalController: ModalController,
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
      this.articleD.user_id= data['user_id'];
      this.articleD.categorie = data['categorie'] ;
      this.articleD.description = data['description'] ;
      this.articleD.prix = data['prix'] ;
      this.articleD.image = data['image'] ;
    })  ;
    loader.dismiss()  ;

    this.storage.get('user_id').then((value)=> {
      if(value.length>0)
      {
     this.activatedRoute.params.subscribe((params) => {
        this.id = params['id'];
        this.myFlag = this.id == "false";
        console.log(this.myFlag);
        this.storage.get('user_id').then((value)=> {this.user_id=value; 
        console.log(value);
        console.log(this.articleD.user_id);

          if(value == this.articleD.user_id)
          {
        this.activatedRoute.params.subscribe((params) => {
        this.id2 = params['id2'];
        this.utilisateur = this.id2 == "false";
        console.log(this.utilisateur);});
          }

          else
          {
            this.activatedRoute.params.subscribe((params) => {
              this.id2 = params['id2'];
              this.utilisateur =true;
              console.log(this.utilisateur);
                     });
          }
        
        });
        console.log(this.user_id);
    });

  }
  else
  {
    console.log('ok')
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.myFlag = this.id == "null";
      console.log(this.myFlag);
  });
  }

})
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

 async supprimerarticle(id: string){

  const alert = await this.alertCtrl.create({
    header: 'Voulez vous vraiment supprimer cet article?',
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel'
      }, {
        text: 'Retirer',
        handler: res => {
          console.log('ok');
          this.firestore.doc('articles/' +id).delete()
          this.router.navigateByUrl('tabs/acceuil')
            .then((data) => {
              this.toast.create({
                message: "supprime",
                duration: 2000,
                position: 'top'
              });
              this.router.navigateByUrl('tabs/acceuil')
            })
            .catch((err) => {
              console.log("erreur", err);
            });
        },
      },
    ]
  });

  await alert.present();
}

doRefresh(event){

  window.location.reload();
 }

 async presentModal() {
  const modal = await this.modalController.create({
    component: ConnectPagePage,
    breakpoints: [0, 0.3, 0.5, 0.8],
    initialBreakpoint: 0.5
  });
  await modal.present();
}

}
