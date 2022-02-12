//Declaration des services lies a la  class Produit dans le dossier models

import { Injectable } from "@angular/core";
import { Produit } from "../models/produit.model";
@Injectable({
 providedIn: 'root'
})

export class ProduitService {
 //Declarations de la fonction getProduits qui permet d'avoir les produits  sous forme de tableau

 getProduitS() : Produit[] {
  return [
   {
    id: 1,
    name: 'Fasion Jeans',
    price: 12,
    imageUrl: '../../assets/images/im1.jpg',
    liked: true,
   },
   {
    id: 2,
    name: 'Fasion Jeans',
    price: 12,
    imageUrl: '../../assets/images/im1.jpg',
    liked: false,
   },
   {
    id: 3,
    name: 'Fasion Jeans',
    price: 12,
    imageUrl: '../../assets/images/im1.jpg',
    liked: false,
   },
   {
    id: 4,
    name: 'Fasion Jeans',
    price: 12,
    imageUrl: '../../assets/images/im1.jpg',
    liked: true,
   },
   {
    id: 5,
    name: 'Fasion Jeans',
    price: 12,
    imageUrl: '../../assets/images/im1.jpg',
    liked: true,
   }
   
  ] ;
 }

  //Declarations de la fonction getCaracteristique qui permet d'avoir les caracterisques des produits
  getCaracterisques(): Produit[] {
  return this.getProduitS().slice(1 , 3) ;
 }

 //Declarations de la fonction getMeilleursVentes qui permet d'avoir les produits les plus et meiux vendus
 getMeilleuresVentes(): Produit[] {
  return this.getProduitS().slice(2 , 5) ;
 }
}