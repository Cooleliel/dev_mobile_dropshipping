import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import { Router } from '@angular/router';
import{ Storage } from '@ionic/storage';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {
  public username: string;
  public user_email: string;
  public user_prenom: string;
  public user_number: string;
  public user_id: string;
  public status: string;
  id: any;
  myFlag: boolean;

  constructor(private router: Router, public storage: Storage, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.storage.get('user_id').then((value)=> {
      if(value.length>0)
      {
     this.activatedRoute.params.subscribe((params) => {
        this.id = params['id'];
        this.myFlag = this.id == "false";
        console.log(this.myFlag);
        this.storage.get('user_name').then((value)=> {this.username=value; });
        this.storage.get('user_email').then((value)=> {this.user_email=value; });
        this.storage.get('user_second_name').then((value)=> {this.user_prenom=value; });
        this.storage.get('user_id').then((value)=> {this.user_id=value; });
        this.storage.get('user_number').then((value)=> {this.user_number=value; });
    });
      }
      else
      {
        this.activatedRoute.params.subscribe((params) => {
          this.id = params['id'];
          this.myFlag = this.id == "null";
          console.log(this.myFlag);
      });
      }
     });

  }

  disconnect(){
    this.storage.remove('user_name');
    this.storage.remove('user_email');
    this.storage.remove('user_second_name');
    this.storage.remove('user_id');
    this.storage.remove('user_number');

    this.router.navigate(['/login']);

  }

}
