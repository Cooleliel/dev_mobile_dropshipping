import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule} from '@angular/fire/compat';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

const firebaseConfig = {

  apiKey: 'AIzaSyBXSCro-iStlQDjT3csB2v185X50SmQAy4',

  authDomain: 'dropshopping-29d45.firebaseapp.com',

  projectId: 'dropshopping-29d45',

  storageBucket: 'dropshopping-29d45.appspot.com',

  messagingSenderId: '166194366272',

  appId: '1:166194366272:web:54064490acd8ef22ef1ca5',

  measurementId: 'G-83T8B9TEWW'

};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
<<<<<<< HEAD
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ],
=======
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,AngularFireModule.initializeApp(firebaseConfig)],
>>>>>>> e773d04e5aa9a892bad451c0248fe14d5714b21d
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
