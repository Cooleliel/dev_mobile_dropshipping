//Declaration des services lies a la  class Produit dans le dossier models

import { Injectable } from "@angular/core";
import { Produit } from "../models/produit.model";
@Injectable({
 providedIn: 'root'
})

export class ProduitService {
 //Declarations de la fonction getProduits qui permet d'avoir les produits  sous forme de tableau

 obtenirProduits() : Produit[] {
  return [
   {
    id: 1,
    nom: 'Fasion Jeans',
    prix: 12,
    imageUrl: '../../assets/images/im1.jpg',
    liked: true,
   },
   {
    id: 2,
    nom: 'Fasion Jeans',
    prix: 12,
    imageUrl: '../../assets/images/im6.jpg',
    liked: false,
   },
   {
    id: 3,
    nom: 'Fasion Jeans',
    prix: 12,
    imageUrl: '../../assets/images/im4.jpg',
    liked: false,
   },
   {
    id: 4,
    nom: 'Fasion Jeans',
    prix: 12,
    imageUrl: '../../assets/images/im2.jpg',
    liked: true,
   },
   {
    id: 5,
    nom: 'Fasion Jeans',
    prix: 12,
    imageUrl: '../../assets/images/im3.jpg',
    liked: true,
   },
   {
    id: 6,
    nom: 'Fasion Jeans',
    prix: 12,
    imageUrl: '../../assets/images/im1.jpg',
    liked: true,
   },
   {
    id: 7,
    nom: 'Fasion Jeans',
    prix: 12,
    imageUrl: '../../assets/images/im6.jpg',
    liked: false,
   },
   {
    id: 8,
    nom: 'Fasion Jeans',
    prix: 12,
    imageUrl: '../../assets/images/im4.jpg',
    liked: false,
   },
   {
    id: 9,
    nom: 'Fasion Jeans',
    prix: 12,
    imageUrl: '../../assets/images/im2.jpg',
    liked: true,
   },
   {
    id: 10,
    nom: 'Fasion Jeans',
    prix: 12,
    imageUrl: '../../assets/images/im3.jpg',
    liked: true,
   }
   
  ] ;
 }

  //Declarations de la fonction getCaracteristique qui permet d'avoir les caracterisques des produits
  obtenirCaracterisques(): Produit[] {
  return this.obtenirProduits().slice(1 , 3) ;
 }

 //Declarations de la fonction getMeilleursVentes qui permet d'avoir les produits les plus et meiux vendus
 obtenirMeilleuresVentes(): Produit[] {
  return this.obtenirProduits().slice(2 , 5) ;
 }

 //Declarations de la fonction getProduitById qui permet d'avoir les produits par leur id
 obtenirProduitParId(id: number): Produit{
  return this.obtenirProduits().find((produit) => produit.id == id ) ;
 }
}