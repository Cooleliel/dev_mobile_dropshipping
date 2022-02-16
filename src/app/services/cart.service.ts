//Declaration des services lies a la  class CartItem dans le dossier models
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CartItem } from "../models/cart.model";
@Injectable({

 providedIn: 'root'
})
export class CartService{
 private item$ = new BehaviorSubject<CartItem[]>([]) ;

 obtenirPanier() {
  return this.item$.asObservable();
 }

 ajouterAuPanier( newItem: CartItem ) {
  this.item$.next([...this.item$.getValue() , newItem]) ;
 }  

 supprimerArticle( id: number) {
  this.item$.next(this.item$.getValue().filter((item) => item.id == id)) ;
 }
}