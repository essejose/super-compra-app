import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoListPage } from '../../pages/produto-list/produto-list';
/**
 * Generated class for the ShopdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopdetail',
  templateUrl: 'shopdetail.html',
})
export class ShopdetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopdetailPage');
  }

  carregalista(){

    this.navCtrl.push(ProdutoListPage)
  }
}
