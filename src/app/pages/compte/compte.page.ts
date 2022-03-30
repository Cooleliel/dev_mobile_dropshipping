import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavController} from '@ionic/angular';
import { Router } from '@angular/router';
import{ Storage } from '@ionic/storage';
import {ActivatedRoute} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../Service/auth.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { LoadingController, AlertController, ToastController  } from '@ionic/angular';
import { AngularFirestore,  AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { documentId } from 'firebase/firestore';
@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {
  public username: string;
  public user_email: string;
  public user_prenom: string;
  public user_number: string;
  public user_id: string;
  public status: string;
  id: any;
  myFlag: boolean;
  articles: Observable<any[]>;
  users: Observable<any[]>;
  public user_concerné: string;
  public nom: string;
  public email: string;
  public prenom: string;
  public numero: string;
  public identifiant: string;
  public publicateur: string;

  constructor(private router: Router,
     public storage: Storage, 
     private activatedRoute: ActivatedRoute,
     private angularFireAuth: AngularFireAuth,
     public firestore: AngularFirestore,
     private AuthService: AuthService, 
     public loadingController: LoadingController,
     public alertController: AlertController, 
     public afSG: AngularFireStorage,
     public afDB: AngularFireDatabase,
     public navCtrl: NavController, 
     public toastCtrl: ToastController
     
     ) 
     { }

  ngOnInit() {

    this.getprofil();

  }

  async getprofil(){

    let loader  = await this.loadingController.create({
      message:  'Patienter s\'il vous plait ....'
    })  ;

    loader.present()  ;
    try {

    this.storage.get('user_id').then((value)=> {
      if(value.length>0)
      {
     this.activatedRoute.params.subscribe((params) => {
        this.id = params['id'];
        this.myFlag = this.id == "false";
        console.log(this.myFlag);
        this.storage.get('user_name').then((value)=> {this.username=value; });
        this.storage.get('user_email').then((value)=> {this.user_email=value; });
        this.storage.get('user_second_name').then((value)=> {this.user_prenom=value; });
        this.storage.get('user_id').then((value)=> {this.user_id=value; });
        this.storage.get('user_number').then((value)=> {this.user_number=value; });

        console.log(this.user_id);
    });

    this.AuthService.getsession().then(data =>{
      //console.log(data);
    
      this.firestore.collection('articles', ref => ref.where('user_id', '==', data)).snapshotChanges().subscribe(data3 =>{
        data3.forEach(data4=> {
    
         this.user_concerné=data4.payload.doc.data()['user_id'];
         this.users= this.firestore.collection('utilisateurs', ref => ref.where(documentId(), '==',data4.payload.doc.data()['user_id'])).valueChanges(); 
         this.firestore.collection('utilisateurs', ref => ref.where(documentId(), '==',data4.payload.doc.data()['user_id'])).snapshotChanges().subscribe(data => {
           data.forEach(data1 => {
            console.log('ok');
            console.log(data1.payload.doc.id);
            this.publicateur=data1.payload.doc.id;
           })
         })
         console.log(this.users);
        }); 
    });
     this.articles = this.firestore.collection('articles', ref => ref.where('user_id', '==', data)).valueChanges();          
    });

      }

      else

      {
        this.activatedRoute.params.subscribe((params) => {
          this.id = params['id'];
          this.myFlag = this.id == "null";
          console.log(this.myFlag);
      });
      }

     });
     loader.dismiss()  ;
    }
    catch(e) {
      this.messageAttente(e) ;
    } 
  }

  async disconnect(){

    let loader  = await this.loadingController.create({
      message:  'Patienter s\'il vous plait ....'
    })  ;

    loader.present()  ;
    try {

    this.storage.remove('user_name');
    this.storage.remove('user_email');
    this.storage.remove('user_second_name');
    this.storage.remove('user_id');
    this.storage.remove('user_number');

    this.router.navigate(['/login']);
    loader.dismiss();
  }
  catch(e) {
    this.messageAttente(e) ;
  } 
  }


  @Output() env = new EventEmitter();//declaration de variable emettant un evenement en sortie(transmet des donnees a son composant parent) 

  allerauprofil(idUser: string)  {
      //this.router.navigate(['profils' , idUser])
      this.navCtrl.navigateForward('/profils/'  + idUser) ; 
    }

    messageAttente(message:  string) {
      this.toastCtrl.create({
        message:  message ,
  
        duration: 2000
      }).then(toastData =>  toastData.present())  ;
    }


    doRefresh(event){

      window.location.reload();
     }
  

}
