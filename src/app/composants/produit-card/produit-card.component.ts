import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Articles } from 'src/app/models/Articles.model';
import { Produit } from 'src/app/models/produit.model';
import { Utilisateurs } from 'src/app/models/Utilisateurs.model';
import { ProduitService } from 'src/app/services/produit.service';
import { ActivatedRoute, Router } from '@angular/router';
import{ Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../Service/auth.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { LoadingController, AlertController, ToastController, NavController } from '@ionic/angular';
import { AngularFirestore,  AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { doc, documentId } from 'firebase/firestore';

@Component({
  selector: 'app-produit-card',
  templateUrl: './produit-card.component.html',
  styleUrls: ['./produit-card.component.scss'],
})
export class ProduitCardComponent {
  @Input()  produitCard:  Articles;//declaration d'objet de type Produit en entree(recoit des donnees de son composant parent)
  @Output() clicProdC = new EventEmitter();//declaration de variable emettant un evenement en sortie(transmet des donnees a son composant parent) 

  users = {} as Utilisateurs; //declaration d'objet de type Produit
  utilisateur: Observable<import("@angular/fire/compat/firestore").DocumentChangeAction<unknown>[]>;
  articles: Observable<any[]>;
  utilisateurs: Observable<any[]>;
  public user_concerné: string;
  public username: string;
  public user_email: string;
  public user_prenom: string;
  public user_number: string;
  public user_id: string;
  public publicateur: string;

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
    public navCtrl: NavController

    ){}

ngOnInit() {
  
    this.firestore.collection('articles', ref => ref.where('user_id', '==', this.produitCard.user_id)).snapshotChanges().subscribe(data3 =>{
      data3.forEach(data4=> {
  
       this.user_concerné=data4.payload.doc.data()['user_id'];
       this.utilisateurs= this.firestore.collection('utilisateurs', ref => ref.where(documentId(), '==',data4.payload.doc.data()['user_id'])).valueChanges(); 
       this.firestore.collection('utilisateurs', ref => ref.where(documentId(), '==',data4.payload.doc.data()['user_id'])).snapshotChanges().subscribe(data => {
         data.forEach(data1 => {
          console.log('ok');
          console.log(data1.payload.doc.id);
          this.publicateur=data1.payload.doc.id;
         })
       })
       console.log(this.utilisateurs);
      }); 
  });

   this.articles = this.firestore.collection('articles', ref => ref.where('user_id', '==', this.produitCard.user_id)).valueChanges();          

}

allerauprofil(idUser: string)  {
  //this.router.navigate(['profils' , idUser])
  this.navCtrl.navigateForward('/profils/'  + idUser) ; 
}

}



