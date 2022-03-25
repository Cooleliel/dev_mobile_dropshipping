import { Component } from '@angular/core';
import { Router } from '@angular/router';
import{ Storage } from '@ionic/storage';
import {ActivatedRoute} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './Service/auth.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { AngularFirestore,  AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { documentId } from 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public username: string;
  public user_email: string;
  public user_prenom: string;
  public user_number: string;
  public user_id: string;
  public status: string;
  id: any;
  myFlag: boolean;
  constructor(  private router: Router,
    public storage: Storage, 
    private activatedRoute: ActivatedRoute,
    private angularFireAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    private AuthService: AuthService, 
    public loadingController: LoadingController,
    public alertController: AlertController, 
    public afSG: AngularFireStorage,
    public afDB: AngularFireDatabase,
    public navCtrl: NavController) {}

  ngOnInit() {

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

  }

  allerPageAccueil() {
    this.router.navigate(['tabs/accueil']);

  }

  allerPageFavori() {
    this.router.navigate(['tabs/favoris']);

  }

  allerPageMesProduit() {
    this.router.navigate(['mes-produits']);

  }

  allerPageMessage() {
    this.router.navigate(['message']);

  }

  allerPagePanier() {
    this.router.navigate(['panier']);

  }

  allerPageBoutique() {
    this.router.navigate(['tabs/boutique']);

  }

  allerPageCategorie() {
    this.router.navigate(['categorie']);

  }

  allerPageCompte() {
    this.router.navigate(['tabs/compte']);
  }
}
