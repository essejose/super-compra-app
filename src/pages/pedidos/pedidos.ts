import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';


import { PedidosDetailPage } from '../../pages/pedidos-detail/pedidos-detail';


@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {

  pedidosItems:  any;
  public registros:any;
  
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public firebaseProvider: FirebaseProvider) {
  }

  ionViewDidLoad() {
    
    
    this.pedidosLoad().then((registros) =>{
      
      this.pedidosItems = registros;
       
    });

  }

  pedidosLoad(){
    return new Promise(resolve => { 
      let itens = this.firebaseProvider.getPedidosItens() 
      resolve( itens); 
    })
  }

  verDetalhe(item){ 
    console.log(item.pedido);
      this.navCtrl.push(PedidosDetailPage,{
        info: 'Pedido Efetuado com sucesso!',
        pedidos: item.pedido.itens,
        valortotal: item.pedido.total,
        formaPagamento: 'dinheiro'
      });
    
  }
}
