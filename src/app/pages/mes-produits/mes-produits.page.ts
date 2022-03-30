import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavController} from '@ionic/angular';
import { CreerProduitPage } from '../creer-produit/creer-produit.page';
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
import { idText } from 'typescript';

@Component({
  selector: 'app-mes-produits',
  templateUrl: './mes-produits.page.html',
  styleUrls: ['./mes-produits.page.scss'],
})
export class MesProduitsPage implements OnInit {
  articles: Observable<any[]>;
  users: Observable<any[]>;
  public user_concerné: string;
  public username: string;
  public user_email: string;
  public user_prenom: string;
  public user_number: string;
  public user_id: string;
  public publicateur: string;
  id: any;
 

  constructor( public navCtrl: NavController , private router: Router, public storage: Storage,private angularFireAuth: AngularFireAuth, public firestore: AngularFirestore, private AuthService: AuthService, private camera: Camera,public loadingController: LoadingController,public alertController: AlertController, public afSG: AngularFireStorage, public afDB: AngularFireDatabase) { }

  ngOnInit() {

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
     
     /*
      console.log('categorie' + data4.payload.doc.data()['categorie']);
      console.log('description' + data4.payload.doc.data()['description']);
      console.log('prix' + data4.payload.doc.data()['prix']);
      console.log('stock' + data4.payload.doc.data()['stock']);
      */
    }); 
});
 this.articles = this.firestore.collection('articles', ref => ref.where('user_id', '==', data)).valueChanges();       
});
  
  }

  showcreatepage()
  {
    this.router.navigateByUrl('/creer-produit');
  }

  @Output() env = new EventEmitter();//declaration de variable emettant un evenement en sortie(transmet des donnees a son composant parent) 

  allerauprofil(idUser: string)  {
      //this.router.navigate(['profils' , idUser])
      this.navCtrl.navigateForward('/profils/'  + idUser) ; 
    }

    doRefresh(event){

      window.location.reload();
     }

}
