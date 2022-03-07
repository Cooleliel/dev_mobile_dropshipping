import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Produit } from 'src/app/models/produit.model';
import { Utilisateurs } from 'src/app/models/Utilisateurs.model';
import { ProduitService } from 'src/app/services/produit.service';
import { AngularFirestore,  AngularFirestoreCollection } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-profils',
  templateUrl: './profils.page.html',
  styleUrls: ['./profils.page.scss'],
})

export class ProfilsPage implements OnInit {
  id: string;  //Declaration de variable qui va recevoir l'id du produit
  
  selection: Utilisateurs;
  users: Utilisateurs; //declaration d'objet de type Produit
  utilisateur: Observable<import("@angular/fire/compat/firestore").DocumentChangeAction<unknown>[]>;
  constructor(  
    private activatedRoute: ActivatedRoute  ,
    private produitService: ProduitService  ,
    private toastCtrl:  ToastController,
    public firestore: AngularFirestore

    ) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('id');//recuperation de l'id 
  }
  ngOnInit() {
  
  }

}
