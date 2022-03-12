import { Component, OnInit } from '@angular/core';
import { favoris } from 'src/app/models/favoris.model';
import{ Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController, ModalController,ToastController,LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {

  produitFavoris: favoris[];

  constructor(
    public storage: Storage,private toast: ToastController, public alertCtrl: AlertController, public router: Router, public loadingctrl: LoadingController
  ) { }

  ngOnInit() {

    this.storage.get("favoris")
    .then((data : favoris[]) =>{
     this.produitFavoris = data;
     })
     .catch((err) => {
      console.log("erreur", err);
    })
     console.log(this.produitFavoris);
  }


  async removefavoris(article: favoris, index: number):Promise<void> {

    const alert = await this.alertCtrl.create({
      header: 'Voulez vous vraiment retirer cet article de vos favoris?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        }, {
          text: 'Retirer',
          handler: res => {
            console.log('ok');

            this.produitFavoris.splice(index, 1);
            this.storage.set("favoris", this.produitFavoris)
              .then((data) => {
                console.log('ok');
                this.alertCtrl.create({
                  header: 'Boite de confirmation',
                  subHeader: 'Votre article a été retiré des favoris',
                  buttons: ['OK']
                });
              })
              .catch((err) => {
                console.log("erreur", err);
              });
          },
        },
      ]
    });

    await alert.present();  
}


}
