import {  Component } from '@angular/core';
import { App,IonicPage, NavController, NavParams, ViewController  } from 'ionic-angular';
import { ProdutoService } from '../../providers/carrinho/ProdutoService';
import { Produto } from '../../providers/carrinho/produto';
import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import 'rxjs/add/operator/map';   
import { PedidosDetailPage } from '../../pages/pedidos-detail/pedidos-detail';

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {
 
  carrinhoItens : any;
  carrinho: any;
  total :  any[] ;
  totalVal: any = 0;

  constructor(  
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseProvider: FirebaseProvider,
    public appCtrl: App,
    public viewCtrl: ViewController,
    public produtosCheckout : ProdutoService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarrinhoPage');

    this.carrinhoItens = this.firebaseProvider.getShoppingCarrinhoItems();
    console.log( this.carrinhoItens);

    this.firebaseProvider.getShoppingCarrinhoItems().subscribe(
      list => {
      this.total = list;
      this.somartotal();
      }
    )
  

  }
 

  removeItem(key){
    this.firebaseProvider.removeItem(key,'carrinho'); 
    this.firebaseProvider.getShoppingCarrinhoItems().subscribe(list => this.total = list);

  }

  fecharPedido(){
   
    
    if(this.totalVal > 0){
        this.somartotal();
          this.firebaseProvider.addPedido( 
          this.total, 
          this.totalVal, 
          'dinheiro', // tornar dinamico
          'Mercearia do jose' // tornar dinamico
        ); 
          
        this.total.forEach((item) =>{
        
          this.firebaseProvider.removeItem(item.key,'/carrinho/')
        })
        
        this.navCtrl.setRoot(PedidosDetailPage,{
          info: 'Pedido Efetuado com sucesso!',
          pedidos:  this.total,
          valortotal: this.totalVal,
          formaPagamento: 'dinheiro'
        }
        ); 
  }

    
  }

  somartotal(){
      this.totalVal = 0;
      this.total.forEach(action => {
        this.totalVal =  parseInt(this.totalVal) + parseInt(action.produto.price);
      }) 

  } 

}
