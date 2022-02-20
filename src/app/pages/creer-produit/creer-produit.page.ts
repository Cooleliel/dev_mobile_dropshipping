import { Component, OnInit } from '@angular/core';
import{ Storage } from '@ionic/storage';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore,  AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../Service/auth.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

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

  constructor(private router: Router, public storage: Storage, private activatedRoute: ActivatedRoute,private angularFireAuth: AngularFireAuth, public firestore: AngularFirestore,private fb: FormBuilder, private AuthService: AuthService, private camera: Camera) { }

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

creation(value) {
  this.AuthService.createArticle(value);
}

async addPhoto(source: string) {
  if (source === 'camera') {
    console.log('camera');
    const cameraPhoto = await this.openCamera();
    this.image = 'data:image/jpg;base64,' + cameraPhoto;
  } else {
    console.log('library');
    const libraryImage = await this.openLibrary();
    this.image = 'data:image/jpg;base64,' + libraryImage;
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
    targetWidth: 1000,
    targetHeight: 1000,
    sourceType: this.camera.PictureSourceType.CAMERA
  };
  return await this.camera.getPicture(options);
}


}