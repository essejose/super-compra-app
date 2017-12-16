import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
/**
 * Generated class for the PedidosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {

  pedidosItems:  any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public firebaseProvider: FirebaseProvider) {
  }

  ionViewDidLoad() {
   
    this.pedidosItems = this.firebaseProvider.getPedidosItens();
    console.log(this.pedidosItems);
  }

}
