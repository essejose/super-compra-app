import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoService } from '../../providers/carrinho/ProdutoService';
import { Produto } from '../../providers/carrinho/produto';

import { FirebaseProvider } from './../../providers/firebase/firebase';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {
 
  carrinhoItens : any;
  carrinho: any;
  total : any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseProvider: FirebaseProvider,
    public produtosCheckout : ProdutoService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarrinhoPage');

    this.carrinhoItens = this.firebaseProvider.getShoppingCarrinhoItems();
    this.total = this.firebaseProvider.getShoppingCarrinhoTotal();
 
  }

  createProduto() {
    this.carrinho  = new Produto();
    
    this.carrinho.title = 'teste';
    this.carrinho.price = 100; 
    this.carrinho.userId ='1';
    this.firebaseProvider.addItem( this.carrinho,'carrinho');
    console.log('x',this.firebaseProvider.getShoppingCarrinhoTotal());
  }

  removeItem(key){
    this.firebaseProvider.removeItem(key,'carrinho'); 
  }

 



}
