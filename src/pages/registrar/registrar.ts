import { Component , ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../providers/firebase-auth/AuthService';
import { User } from '../../providers/user/user'
  
@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})


export class RegistrarPage {

  @ViewChild('username') user;
  @ViewChild('password') password;

  public registro : any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarPage');
  }

  registar(){
    
    this.registro = this.auth.signup(this.user.value , this.password.value);
     
    this.user.value ='';
    this.password.value ='';
    
  }
}
