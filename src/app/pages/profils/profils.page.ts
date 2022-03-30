import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Produit } from 'src/app/models/produit.model';
import { Utilisateurs } from 'src/app/models/Utilisateurs.model';
import { ProduitService } from 'src/app/services/produit.service';
import { Router } from '@angular/router';
import{ Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../Service/auth.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { LoadingController, AlertController } from '@ionic/angular';
import { AngularFirestore,  AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { doc, documentId } from 'firebase/firestore';
@Component({
  selector: 'app-profils',
  templateUrl: './profils.page.html',
  styleUrls: ['./profils.page.scss'],
})

export class ProfilsPage implements OnInit {
  id: string;  //Declaration de variable qui va recevoir l'id du produit
  
  selection: Utilisateurs;
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
    public afDB: AngularFireDatabase

    ) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('idUser');//recuperation de l'id 
    console.log(this.id);
  }
  ngOnInit() {
    this.obtenirUser(this.id);
    
      this.firestore.collection('articles', ref => ref.where('user_id', '==', this.id)).snapshotChanges().subscribe(data3 =>{
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

     this.articles = this.firestore.collection('articles', ref => ref.where('user_id', '==', this.id)).valueChanges();          
      }

  obtenirUser(id: string){
    this.firestore
    .doc('utilisateurs/' + id)
    .valueChanges()
    .subscribe(data  =>  {
      this.users.nom = data['nom'] ;
      this.users.email = data['email'] ;
      this.users.prenom = data['prenom'] ;
      this.users.number = data['numero'] ;
    })  ;
   }

   doRefresh(event){

    window.location.reload();
   }
  
 }
