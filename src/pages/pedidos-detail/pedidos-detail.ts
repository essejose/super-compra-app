import { Component  } from '@angular/core';
import { App, IonicPage, NavController, NavParams ,ViewController } from 'ionic-angular';
import { PedidosPage } from '../../pages/pedidos/pedidos';

import { HomePage } from '../../pages/home/home';
 

@IonicPage()
@Component({
  selector: 'page-pedidos-detail',
  templateUrl: 'pedidos-detail.html',
})  
export class PedidosDetailPage {

  public pedidos;
  public valortotal;
  public formaPagamento;
  public info;
  public codigocompra;
  constructor(public navCtrl: NavController,     public appCtrl: App,    public viewCtrl: ViewController, public navParams: NavParams) {
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidosDetailPage');
    this.pedidos = this.navParams.get("pedidos");

    console.log(this.pedidos);
    this.valortotal = parseInt(this.navParams.get("valortotal"));
    this.info = this.navParams.get("info")
    this.codigocompra = Math.floor (Math.random() * (999999 - 0) + 500);
    
    if(this.info == undefined){
      this.info = "Detalhes do pedido"
    
    }
  }


  // goPedidoPage(){
     
  //   this.viewCtrl.dismiss();
  //   this.appCtrl.getRootNav().push(PedidosPage);
    
  // }

  goMapaPage(){
    this.navCtrl.setRoot(HomePage);
  }
}
