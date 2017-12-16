import { Component, ViewChild } from '@angular/core';
import { Platform , Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ShopdetailPage } from '../pages/shopdetail/shopdetail';
import { ProdutoListPage } from '../pages/produto-list/produto-list';
import { LoginPage } from '../pages/login/login';
import { CarrinhoPage } from '../pages/carrinho/carrinho';
import { PedidosPage } from '../pages/pedidos/pedidos';
import { ShopPage } from '../pages/shop/shop';
@Component({
  templateUrl: 'app.html' 
})
export class MyApp { 
  rootPage:any = HomePage; 
  
  @ViewChild(Nav) public nav:Nav; 
  
  public paginas = [
     
    {titulo: 'Meus Pedidos', componente: PedidosPage},
    {titulo: 'Cadastrar Produtos', componente: ShopPage},
    
    
  ];


  constructor(
     platform: Platform,
     statusBar: StatusBar,
     splashScreen: SplashScreen,  
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  abrePagina(pagina): void {
      
        this.nav.push(pagina.componente);
  }

  logout(): void {
    
      this.nav.setRoot(LoginPage,{sair:true});
}

 
}

