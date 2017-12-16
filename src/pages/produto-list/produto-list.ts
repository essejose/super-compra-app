import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';
import { LoginPage  }  from '../../pages/login/login';
 
@IonicPage()
@Component({
  selector: 'page-produto-list',
  templateUrl: 'produto-list.html',
})
export class ProdutoListPage {

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutoListPage');
  }

  comprarItem(e){
   // this.appCtrl.getRootNav().push(SecondPage);
    this.navCtrl.push(LoginPage);
  }

}
