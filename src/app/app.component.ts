import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ShopdetailPage } from '../pages/shopdetail/shopdetail';
import { ProdutoListPage } from '../pages/produto-list/produto-list';
import { LoginPage } from '../pages/login/login';
import { CarrinhoPage } from '../pages/carrinho/carrinho';


@Component({
  templateUrl: 'app.html' 
})
export class MyApp { 
  rootPage:any = CarrinhoPage; 
 
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

