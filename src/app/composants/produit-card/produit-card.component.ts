import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Articles } from 'src/app/models/Articles.model';
import { Utilisateurs } from 'src/app/models/Utilisateurs.model';
import { ProduitService } from 'src/app/services/produit.service';
import { ActivatedRoute } from '@angular/router';
import{ Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../Service/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { LoadingController, AlertController, ToastController, NavController, ModalController } from '@ionic/angular';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { doc, documentId } from 'firebase/firestore';
import { panier } from 'src/app/models/panier.model';
import { favoris } from 'src/app/models/favoris.model';
import { Router } from '@angular/router';
import { ConnectPagePage } from 'src/app/pages/connect-page/connect-page.page';

@Component({
  selector: 'app-produit-card',
  templateUrl: './produit-card.component.html',
  styleUrls: ['./produit-card.component.scss'],
})
export class ProduitCardComponent {
  @Input()  produitCard:  Articles;//declaration d'objet de type Produit en entree(recoit des donnees de son composant parent)
  @Input() index: number;
  @Output() clicProdC = new EventEmitter();//declaration de variable emettant un evenement en sortie(transmet des donnees a son composant parent) 

  produitfavoris: favoris[];
  users = {} as Utilisateurs; //declaration d'objet de type Produit
  utilisateur: Observable<import("@angular/fire/compat/firestore").DocumentChangeAction<unknown>[]>;
  articles: Observable<any[]>;
  utilisateurs: Observable<any[]>;
  public user_concerné: string;
  public counter: number=0;
  public username: string;
  public user_email: string;
  public user_prenom: string;
  public user_number: string;
  public user_id: string;
  public publicateur: string;
  public fav: boolean;
  public fav2: boolean;
  produitFavoris: favoris[] = [];

  x= 5;
  myFlag: boolean;
  id: any;

  //la fonction getProduitById() utilise la variable de soirte clicked pour declencher un evenement avec la valeur idProduit
  obtenirIdProduitC(idProduit: string)  {
    this.clicProdC.emit(idProduit)  ;
  }

  constructor(  
    private activatedRoute: ActivatedRoute  ,
    private produitService: ProduitService  ,
    private toastCtrl:  ToastController,
    public storage: Storage, 
    private angularFireAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    private AuthService: AuthService, 
    public loadingController: LoadingController,
    public alertController: AlertController, 
    public afSG: AngularFireStorage,
    public afDB: AngularFireDatabase,
    public navCtrl: NavController,
    public router: Router,
    public modalController: ModalController

    ){}

ngOnInit() {
  
    this.firestore.collection('articles', ref => ref.where('user_id', '==', this.produitCard.user_id)).snapshotChanges().subscribe(data3 =>{
      data3.forEach(data4=> {
  
       this.user_concerné=data4.payload.doc.data()['user_id'];
       this.utilisateurs= this.firestore.collection('utilisateurs', ref => ref.where(documentId(), '==',data4.payload.doc.data()['user_id'])).valueChanges(); 
       this.firestore.collection('utilisateurs', ref => ref.where(documentId(), '==',data4.payload.doc.data()['user_id'])).snapshotChanges().subscribe(data => {
         data.forEach(data1 => {
         // console.log('ok');
          //console.log(data1.payload.doc.id);
          this.publicateur=data1.payload.doc.id;
         })
       })
       //console.log(this.utilisateurs);
      }); 
  });

   this.articles = this.firestore.collection('articles', ref => ref.where('user_id', '==', this.produitCard.user_id)).valueChanges();   
   this.storage.get("favoris")
   .then((data : favoris[]) =>{
    this.produitFavoris = data;
    })
    .catch((err) => {
     console.log("erreur", err);
   })
   //console.log(this.articles)
   //this.produitCard.liked = false;


   this.storage.get('user_id').then((value)=> {
    if(value.length>0)
    {

      this.activatedRoute.params.subscribe((params) => {
        this.id = params['id'];
        this.myFlag = this.id == "false";
      })

   this.articles.forEach(article => {
    article.forEach(art => {
        this.produitCard.liked = false;
       this.produitFavoris.forEach(produit => {
         //console.log(this.produitCard.id);
         //console.log(produit.produit.id);
          if (produit.produit.id === this.produitCard.id) {
            this.produitCard.liked = true;
           // console.log(art);    
          }
       });
       //console.log(art);
     });
   });
   // console.log(this.produitFavoris);

   console.log(this.produitCard)
   console.log(this.index)

  }

  else{
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      this.myFlag = this.id == "null";
      console.log(this.myFlag);
  });
  }

})
}

allerauprofil(idUser: string)  {
  //this.router.navigate(['profils' , idUser])
  this.navCtrl.navigateForward('/profils/'  + idUser) ; 
}


ajouterArticlefavoris( articledetails: Articles):void {

  console.log(articledetails.categorie)

  let ajout: boolean =false;
  //si le pânier est vide

  this.storage.get("favoris").then((data: favoris[]) => {
    if(data===null || data.length===0)
    {
      data=[];
      data.push({
        produit: articledetails,
      })
    }

    else{
     
      for (let i=0; i<data.length; i++)
      {
          //le panier n'est pas vide et contient deja notre element
        const element: favoris= data[i];

        console.log(element.produit.id)

        if(articledetails.id === element.produit.id)
        {
          console.log('deja present')
          //this.produitfavoris.splice(index, 1);
          this.storage.set("favoris", this.produitfavoris)
          ajout= true;
        }
      }
          //le panier n'est pas vide et ne contient pas notre element

          if(!ajout)
          {
            data.push({
              produit: articledetails,
            })
          }

        }

        this.storage.set("favoris", data);
        this.router.navigateByUrl('tabs/favoris');
  })
  
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



