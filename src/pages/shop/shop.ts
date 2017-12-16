import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import 'rxjs/add/operator/map';
import { Produto } from '../../providers/carrinho/produto';
 

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  shoppingItems:  any;
  price: any;
  title: any;
  imageUrl: any;
  loja:any
  newItem : Produto;
  constructor(public navCtrl: NavController, public navParams: NavParams,   public firebaseProvider: FirebaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');

    this.shoppingItems = this.firebaseProvider.getShoppingItems();
    
    
  }

  addItem() {
    this.newItem = new Produto();
    this.newItem.price    =  this.price;
    this.newItem.title    =  this.title;
    this.newItem.loja     =  this.loja;
    this.newItem.imageUrl =  this.imageUrl;
    this.newItem.userId = '1';
     this.firebaseProvider.addItem({produto:this.newItem} ,'shoppingItems');
  }
 
  removeItem(id) {
    this.firebaseProvider.removeItem(id,'shoppingItems');
  }



}
