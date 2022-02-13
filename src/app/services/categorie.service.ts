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
    id: 1,
    title: 'Men' ,
    image: '../../assets/images/im1.jpg'
   },
   {
    id: 2,
    title: 'Children' ,
    image: '../../assets/images/im1.jpg'
   },
   {
    id: 3,
    title: 'women' ,
    image: '../../assets/images/im1.jpg'
   },
   {
    id: 4,
    title: 'girl' ,
    image: '../../assets/images/im1.jpg'
   },
   {
    id: 5,
    title: 'Eliel' ,
    image: '../../assets/images/im1.jpg'
   }
  ] ;
 }
}