import { Component, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistrarPage  }  from '../../pages/registrar/registrar'; 

import { AuthService } from '../../providers/firebase-auth/AuthService';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	@ViewChild('username') user;
  @ViewChild('password') password;
  
  public logout : any;

  constructor(public navCtrl: NavController,
           public navParams: NavParams, 
           public auth: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    console.log(this.auth.currentUserObservable );
    this.logout = this.navParams.get("sair")
    
    console.log(this.logout);
    
    if( this.logout){
      this.auth.logout()
    }
    //criando sessao
    // else if(this.auth.authenticated){
    //   this.navCtrl.setRoot(HomePage);
    // }

    this.user.value = '';
    this.password.value = '';
    
  }
 
  signInUser() { 
    console.log(this.auth.authenticated);
    console.log(this.auth.currentUserObservable );

    let login = this.auth.login(this.user.value , this.password.value); 

    login.then((user) => {
          
          if(user){
            this.navCtrl.setRoot(HomePage);
          }
    })
    
  }


  goRegister(){
    this.navCtrl.push(RegistrarPage);
  }

}
