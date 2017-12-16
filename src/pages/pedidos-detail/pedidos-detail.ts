import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PedidosDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidosDetailPage');
    this.pedidos = this.navParams.get("pedidos");
    this.valortotal = this.navParams.get("valortotal");
    this.info = this.navParams.get("info")

    if(this.info == undefined){
      this.info = "Detalhes do pedido"
    }
  }

}
