import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistrarPage  }  from '../../pages/registrar/registrar'; 

import { AuthService } from '../../providers/firebase-auth/AuthService';
 

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	@ViewChild('username') user;
  @ViewChild('password') password;
  
  constructor(public navCtrl: NavController,
           public navParams: NavParams, 
           public auth: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signInUser() { 
    this.auth.login(this.user.value , this.password.value); 
  }


  goRegister(){
    this.navCtrl.push(RegistrarPage);
  }

}
