//Declaration des services lies a la  class Categorie dans le dossier models

import { Injectable } from "@angular/core";
import { Categorie } from '../models/categorie.model' ;
@Injectable({

 providedIn: 'root'
})
export class CategorieService{
 //Declarations de la fonction getCategories qui permet d'avoir les produits par categorie
 obtenirCategories(): Categorie[] {

  return[
   {
    id: '1',
    titre: 'Men' ,
    image: '../../assets/images/im1.jpg'
   },
   {
    id: '2',
    titre: 'Children' ,
    image: '../../assets/images/im1.jpg'
   },
   {
    id: '3',
    titre: 'women' ,
    image: '../../assets/images/im1.jpg'
   },
   {
    id: '4',
    titre: 'girl' ,
    image: '../../assets/images/im1.jpg'
   },
   {
    id: '5',
    titre: 'Eliel' ,
    image: '../../assets/images/im1.jpg'
   }
  ] ;
 }

 //Declarations de la fonction getProduitById qui permet d'avoir les produits par leur id
 obtenirCategorieParId(id: string): Categorie{
  return this.obtenirCategories().find((categorie) => categorie.id === id ) ;
 }
}

