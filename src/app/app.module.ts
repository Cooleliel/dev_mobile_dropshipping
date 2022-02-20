import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import{ IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera/ngx';

const firebaseConfig = {

  apiKey: 'AIzaSyAtpdDGQuTvxpFSwe2HG3PZXAaFwyTUWCQ',
  authDomain: 'monappliecole.firebaseapp.com',
  projectId: 'monappliecole',
  storageBucket: 'monappliecole.appspot.com',
  messagingSenderId: '904714985018',
  appId: '1:904714985018:web:83bd802502277e2d035f03',
  measurementId: 'G-H7YFFGP3YW'

};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),IonicStorageModule.forRoot(), AppRoutingModule,AngularFireModule.initializeApp(firebaseConfig), AngularFireAuthModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Storage,Camera],
  bootstrap: [AppComponent],
})
export class AppModule {}
