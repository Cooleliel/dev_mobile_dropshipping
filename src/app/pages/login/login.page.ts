import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore,  AngularFirestoreCollection } from '@angular/fire/compat/firestore';
//import { of, Subject } from 'rxjs';
//import { collection, query, where } from "firebase/firestore";
import { Router } from "@angular/router";
import{ Storage } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
    myFlag: boolean=true;
    user: any;
  error_msg = {
    'email': [
      { 
        type: 'required', 
        message: 'Provide email.' 
      },
      { 
        type: 'pattern', 
        message: 'Email is not valid.' 
      }
    ],
    'password': [
      { 
        type: 'required', 
        message: 'Password is required.' 
      },
      { 
        type: 'minlength', 
        message: 'Password length should be 6 characters long.' 
      }
    ]
  };
  id: any;



  constructor(
    private router: Router,
    private AuthService: AuthService,
    private fb: FormBuilder,
    public storage: Storage, public activatedRoute: ActivatedRoute,
    private angularFireAuth: AngularFireAuth, public firestore: AngularFirestore,
    public toastCtrl:  ToastController, 
    public loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  /*signIn(value) {
    this.AuthService.signinUser(value);
  }*/

 async signIn(value) {

  let loader  = await this.loadingCtrl.create({
    message:  'Patienter s\'il vous plait ....'
  })  ;

  loader.present()  ;
  try {

this.user= this.firestore.collection('utilisateurs').valueChanges();
console.log(value.password);
console.log(value.email);
    this.firestore.collection('utilisateurs', ref => ref.where('code', '==', value.password).where('email', '==', value.email)).snapshotChanges().subscribe(data =>{
      if(data.length >0)
      {
        this.firestore.collection('utilisateurs', ref => ref.where('code', '==', value.password).where('email', '==', value.email)).snapshotChanges().subscribe(data3 =>{
          data3.forEach(data4=> {

            this.storage.set('user_name', data4.payload.doc.data()['nom'])
            this.storage.set('user_id', data4.payload.doc.id)
            this.storage.set('user_second_name', data4.payload.doc.data()['prenom'])
            this.storage.set('user_email', data4.payload.doc.data()['email'])
            this.storage.set('user_number', data4.payload.doc.data()['numero'])

          }); 
        })
        this.router.navigate(['/tabs/accueil']);
      }
      else
      {
        console.log('rien');
        this.activatedRoute.params.subscribe((params) => {
          this.id = params['id'];
          this.myFlag = this.id == "null";
          console.log(this.myFlag);
      });
        this.router.navigate(['/login'],{queryParams: {errorMsg:1}});
       }
    })
    loader.dismiss()  ;
  }
   catch(e) {
      this.messageAttente(e) ;
    }  
  }

  goToSignup() {
    this.router.navigateByUrl('inscription');
  }

  messageAttente(message:  string) {
    this.toastCtrl.create({
      message:  message ,

      duration: 5000
    }).then(toastData =>  toastData.present())  ;
  }


}
