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
import { LoadingController, AlertController } from '@ionic/angular';
import { getStorage, ref } from "firebase/storage";
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
  id: any;
  myFlag: boolean;
  userForm: FormGroup;
  image = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
  imagePath: string;
  upload: any;
  url: string;
  path: string;
  test: string;

  constructor(private router: Router, public storage: Storage, private activatedRoute: ActivatedRoute,private angularFireAuth: AngularFireAuth, public firestore: AngularFirestore,private fb: FormBuilder, private AuthService: AuthService, private camera: Camera,public loadingController: LoadingController,public alertController: AlertController, public afSG: AngularFireStorage, public afDB: AngularFireDatabase) { }

  ngOnInit() {

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
        Validators.required,
      ])),
    });

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
    });
      }
  })

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
        message: 'L\'envoi de la photo dans Firebase est terminé!',
        buttons: ['OK']
      });

      this.afSG.ref(this.imagePath).getDownloadURL().subscribe(imgURL =>{
        console.log(imgURL);
        this.url=imgURL;
      });

      await alert.present();
    });

    this.AuthService.createArticle(value,this.url);
    this.router.navigateByUrl('/mes-produits');
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

doRefresh(event) {  
  console.log('Pull Event Triggered!');  
}  

}

