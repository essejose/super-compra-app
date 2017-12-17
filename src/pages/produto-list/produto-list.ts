import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular'; 
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Produto } from '../../providers/carrinho/produto';
import { CarrinhoPage } from '../../pages/carrinho/carrinho';
import {  AlertController   } from 'ionic-angular'; 
import { LoadingController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-produto-list',
  templateUrl: 'produto-list.html',
})
export class ProdutoListPage {

  carrinho: any;
  shoppingItems:  any;
  total: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alert: AlertController,
    public loadingCtrl :LoadingController,
    public firebaseProvider: FirebaseProvider,
    public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProdutoListPage');

    let loader = this.loadingCtrl.create({
      content: "Carregando produtos" 
    });
    loader.present();
    this.loadShopItens().then((registros) =>{
      
      this.shoppingItems = registros;
      loader.dismiss();
    })
   

  }

  loadShopItens(){
    return new Promise(resolve => { 
      let itens = this.firebaseProvider.getShoppingItems() 
      resolve( itens); 
    })

   
  }

  comprarItem(e){
   // this.appCtrl.getRootNav().push(SecondPage);
   
  }
  addProdutoLista(item){
    
    this.carrinho  = new Produto();
     
    this.carrinho.title = item.produto.title;
    this.carrinho.price =  item.produto.price; 
    this.carrinho.loja =  item.produto.loja; 
    this.carrinho.imageUrl = item.produto.imageUrl; 
    this.carrinho.userId = 1 ;
    
    this.firebaseProvider.addItem( {produto:this.carrinho},'carrinho');
    console.log('x',this.firebaseProvider.getShoppingCarrinhoTotal());
    this.firebaseProvider.getShoppingCarrinhoItems().subscribe(list => this.total = list);

    let alerta = this.alert.create({
      title: 'Muito bem',
      subTitle: 'Produto adiconado a sua lista',
      buttons: ['OK']
    });
    alerta.present(); 

  }
  
  goCarrinho(){
    this.navCtrl.push(CarrinhoPage);
  }
}
