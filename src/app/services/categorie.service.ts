//Declaration des services lies a la  class Categorie dans le dossier models

import { Injectable } from "@angular/core";
import { Categorie } from '../models/categorie.model' ;
@Injectable({

 providedIn: 'root'
})
export class CategorieService{
 //Declarations de la fonction getCategories qui permet d'avoir les produits par categorie
 getCategories(): Categorie[] {

  return[
   {
    title: 'Men' ,
    image: '../../assets/images/im1.jpg'
   },
   {
    title: 'Children' ,
    image: '../../assets/images/im1.jpg'
   },
   {
    title: 'women' ,
    image: '../../assets/images/im1.jpg'
   },
   {
    title: 'girl' ,
    image: '../../assets/images/im1.jpg'
   },
   {
    title: 'Eliel' ,
    image: '../../assets/images/im1.jpg'
   }
  ] ;
 }
}