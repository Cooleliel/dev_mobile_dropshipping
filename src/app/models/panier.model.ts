import { Articles } from './Articles.model';

export interface panier{
    produit: Articles;
    prix:any;
    nombre: number;
    categorie: string;
}