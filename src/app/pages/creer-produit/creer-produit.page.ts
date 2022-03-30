import { Component, OnInit } from '@angular/core';
import{ Storage } from '@ionic/storage';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore,  AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../Service/auth.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { getStorage, ref } from "firebase/storage";
import { Categorie } from 'src/app/models/categorie.model';
@Component({
  selector: 'app-creer-produit',
  templateUrl: './creer-produit.page.html',
  styleUrls: ['./creer-produit.page.scss'],
})
export class CreerProduitPage implements OnInit {

  public username: string;
  public user_email: string;
  public user_prenom: string;
  public user_number: string;
  public user_id: string;
  public status: string;
  categoriesSlides: Categorie[] =  [];
  id: any;
  myFlag: boolean;
  userForm: FormGroup;
  image = 'assets/images/imagevide.jpg';
  imagePath: string;
  upload: any;
  url: string;
  path: string;
  test: string;

  constructor(private loadingCtrl:  LoadingController,private router: Router, public storage: Storage,private toastCtrl:  ToastController, private activatedRoute: ActivatedRoute,private angularFireAuth: AngularFireAuth, public firestore: AngularFirestore,private fb: FormBuilder, private AuthService: AuthService, private camera: Camera,public loadingController: LoadingController,public alertController: AlertController, public afSG: AngularFireStorage, public afDB: AngularFireDatabase) { }

  ngOnInit() {

    this.obtenirCategories();

    this.userForm = this.fb.group({
      categorie: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      prix: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      stock: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      id_user: new FormControl('', Validators.compose([
      
      ])),
    });

    this.storage.get('user_id').then((value)=> {
      if(value.length>0)
      {
     this.activatedRoute.params.subscribe((params) => {
        this.id = params['id'];
        this.myFlag = this.id == "false";
        console.log(this.myFlag);
        console.log(this.categoriesSlides);
        this.storage.get('user_name').then((value)=> {this.username=value; });
        this.storage.get('user_email').then((value)=> {this.user_email=value; });
        this.storage.get('user_second_name').then((value)=> {this.user_prenom=value; });
        this.storage.get('user_id').then((value)=> {this.user_id=value; });
        this.storage.get('user_number').then((value)=> {this.user_number=value; });
    });
      }
  })

}

async obtenirCategories(){
  let loader  = await this.loadingCtrl.create({
    message:  'Patienter s\'il vous plait ....'
  })  ;

  loader.present()  ;
  try {
    this.firestore
    .collection('categorie')
    .snapshotChanges()
    .subscribe( data  =>  {

      this.categoriesSlides  = data.map( e =>  {
        return  {
          id: e.payload.doc.id  ,
          titre:  e.payload.doc.data()['titre'],
          image:  e.payload.doc.data()['image']

        };
      });
      loader.dismiss()  ;
    }) ;
  }catch(e) {
    this.messageAttente(e) ;
  } 
}

  async creation(value) {

    const loading = await this.loadingController.create({
      duration: 2000
    });
    
    await loading.present();
    this.imagePath = 'images/' + new Date().getTime() + '.jpg';
    this.upload = this.afSG.ref(this.imagePath).putString(this.image, 'data_url');
    this.upload.then(async () => {
      await loading.onDidDismiss();
      const alert = await this.alertController.create({
        header: 'Félicitation',
        message: 'L\'article a été publié!',
        buttons: ['OK']
      });

      this.afSG.ref(this.imagePath).getDownloadURL().subscribe(imgURL =>{
        console.log(imgURL);
        this.url=imgURL;
        this.AuthService.createArticle(value,this.url);
        this.router.navigateByUrl('/mes-produits');
      });

      await alert.present();
    });

  
}

async addPhoto(source: string) {
  if (source === 'camera') {
    console.log('camera');
    const cameraPhoto = await this.openCamera();
    this.image = 'data:image/jpg;base64,' + cameraPhoto;
    console.log(this.image);
  } else {
    console.log('library');
    const libraryImage = await this.openLibrary();
    this.image = 'data:image/jpg;base64,' + libraryImage;
    console.log(this.image);
  }
}

async openLibrary() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    targetWidth: 1000,
    targetHeight: 1000,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  };
  return await this.camera.getPicture(options);
}

async openCamera() {
  const options: CameraOptions = {
    quality:  100 ,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    targetWidth: 186,
    targetHeight: 1024,
    sourceType: this.camera.PictureSourceType.CAMERA
  };
  return await this.camera.getPicture(options);
}

doRefresh(event){

  window.location.reload();
 }
 
messageAttente(message:  string) {
  this.toastCtrl.create({
    message:  message ,

    duration: 2000
  }).then(toastData =>  toastData.present())  ;
}

}

