import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-mes-produits',
  templateUrl: './mes-produits.page.html',
  styleUrls: ['./mes-produits.page.scss'],
})
export class MesProduitsPage implements OnInit {
  articles: Observable<any[]>;

  public username: string;
  public user_email: string;
  public user_prenom: string;
  public user_number: string;
  public user_id: string;
  id: any;

  constructor( public navCtrl: NavController , private router: Router, public storage: Storage,private angularFireAuth: AngularFireAuth, public firestore: AngularFirestore, private AuthService: AuthService, private camera: Camera,public loadingController: LoadingController,public alertController: AlertController, public afSG: AngularFireStorage, public afDB: AngularFireDatabase) { }

  ngOnInit() {

this.AuthService.getsession().then(data =>{
  console.log(data);

  this.firestore.collection('articles', ref => ref.where('user_id', '==', data)).snapshotChanges().subscribe(data3 =>{
    data3.forEach(data4=> {

      console.log('categorie' + data4.payload.doc.data()['categorie']);
      console.log('description' + data4.payload.doc.data()['description']);
      console.log('prix' + data4.payload.doc.data()['prix']);
      console.log('stock' + data4.payload.doc.data()['stock']);

    }); 
});

 this.articles = this.firestore.collection('articles', ref => ref.where('user_id', '==', data)).valueChanges();       
        
});
  
  }

  showcreatepage()
  {
    this.router.navigateByUrl('/creer-produit');
  }
}
