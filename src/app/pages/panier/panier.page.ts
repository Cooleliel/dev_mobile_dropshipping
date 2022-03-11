import { Component, OnInit } from '@angular/core';
import{ Storage } from '@ionic/storage';
import { panier } from 'src/app/models/panier.model';
import { AlertController, ModalController,ToastController,LoadingController } from '@ionic/angular';
import { Articles } from 'src/app/models/Articles.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {
produitPanier: panier[];
total: number =0;
nombretotal : number=0;
  constructor(public storage: Storage, public toast: ToastController, public alertCtrl: AlertController, public router: Router, public loadingctrl: LoadingController) { }

  ngOnInit() {

    this.storage.get("panier")
    .then((data : panier[]) =>{
     this.produitPanier = data;
     this.produitPanier.forEach((element: panier) => {
      this.total += element.produit.prix*element.nombre;
     })

     this.produitPanier.forEach((element: panier) => {
      this.nombretotal += 1;
     })

     console.log(this.produitPanier);
    })
    .catch((err) => {
      console.log("erreur", err);
    })

  }


  async removeitem(article: panier, index: number):Promise<void> {

    const loading = await this.loadingctrl.create({
      duration: 2000
    });

console.log('ok');
    const alert = await this.alertCtrl.create({
      header: 'Voulez vous vraiment retirer cet article de votre panier?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        }, {
          text: 'Retirer',
          handler: res => {
            console.log('ok');

            let price: number = article.produit.prix;
            let tot: number = article.nombre;
            let mytotal: number = price * tot;
            this.produitPanier.splice(index, 1);
            this.storage.set("panier", this.produitPanier)
              .then((data) => {
                this.total -= mytotal;
                this.nombretotal -= 1;
                this.toast.create({
                  message: "supprime",
                  duration: 2000,
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

  async addsamearticle( ajoutarticle: Articles):Promise<void> {

  const loading = await this.loadingctrl.create({
    duration: 2000
  });


  this.storage.get("panier").then((data: panier[]) => {
  
      for (let i=0; i<data.length; i++)
      {
          //le panier n'est pas vide et contient deja notre element
        const element: panier= data[i];

        console.log(element.produit.id)

        if(ajoutarticle.id === element.produit.id)
        {
          console.log('deja present')
          element.nombre+= 1;
          element.prix+= ajoutarticle.prix;
          this.storage.set("panier", data)         
          .then((data) => {
            this.total=this.total+ajoutarticle.prix;
          });      
        }
      }
      setInterval(()=> {
        this.getdata(); },4000); 
  });
  this.router.navigateByUrl('/panier');
}


  async reducearticle( reducearticle: Articles):Promise<void> {

  const loading = await this.loadingctrl.create({
    duration: 2000
  });

  this.storage.get("panier").then(async (data: panier[]) => {
   
      for (let i=0; i<data.length; i++)
      {
          //le panier n'est pas vide et contient deja notre element
        const element: panier= data[i];

        console.log(element.produit.id)

        if(reducearticle.id === element.produit.id)
        {
          console.log('deja present')
          element.nombre -= 1
          element.prix-= reducearticle.prix
          this.storage.set("panier", data)
          .then((data) => {
            this.total=this.total-=reducearticle.prix;
            });
        }
      }
      setInterval(()=> {
        this.getdata(); },4000); 
  });
  this.router.navigateByUrl('/panier')
}


doRefresh(event) {
  console.log('Begin async operation');
  
  setTimeout(() => {
    console.log('Async operation has ended');
    event.target.complete(); 

    setInterval(()=> {
      this.getdata(); },4000); 

  }, 2000);
}

getdata(){

  this.storage.get("panier")
       .then((data : panier[]) =>{
        this.produitPanier = data;
        this.produitPanier.forEach((element: panier) => {
        this.total == element.produit.prix*element.nombre;
       })
    })


    this.router.navigateByUrl('/panier');

}

}
