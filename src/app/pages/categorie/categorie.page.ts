import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})
export class CategoriePage implements OnInit {
  tousCategories: Categorie[] = []  ;

  constructor(  private categorieService: CategorieService  , private router: Router  ) { }

  ngOnInit() {
    this.tousCategories = this.categorieService.obtenirCategories() ;
  }
  redirigerVersPageDetails(idItemCategorie:  number)  {
    this.router.navigate(['details' , idItemCategorie])
  }
}
