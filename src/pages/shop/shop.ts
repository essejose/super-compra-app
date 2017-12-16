import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import 'rxjs/add/operator/map';

 

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  shoppingItems:  any;
  newItem = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,   public firebaseProvider: FirebaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');

    this.shoppingItems = this.firebaseProvider.getShoppingItems();
    
    
  }

  addItem() {
    //this.firebaseProvider.addItem(this.newItem);
  }
 
  removeItem(id) {
   // this.firebaseProvider.removeItem(id);
  }



}
