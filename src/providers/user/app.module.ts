import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, AlertController  } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule  } from 'angularfire2/database';
 


import { AngularFireModule } from 'angularfire2'; 
import { AngularFireAuthModule  } from 'angularfire2/auth';

import { MyApp } from './app.component'; 
import { FirebaseProvider } from '../providers/firebase/firebase';
import { AuthService } from '../providers/firebase-auth/AuthService';
import { ProdutoService } from '../providers/carrinho/ProdutoService';


import { HomePage } from '../pages/home/home';
import { ShopPage } from '../pages/shop/shop';
import { ShopdetailPage } from '../pages/shopdetail/shopdetail';
import { ProdutoListPage } from '../pages/produto-list/produto-list';
import { LoginPage } from '../pages/login/login';
import { RegistrarPage } from '../pages/registrar/registrar';
import { CarrinhoPage } from '../pages/carrinho/carrinho';
import { PedidosPage } from '../pages/pedidos/pedidos';
import { PedidosDetailPage} from '../pages/pedidos-detail/pedidos-detail';

var firebaseConfig  = {
  apiKey: "AIzaSyAh0QorZocX_FS0Q5nPZj6OBXLT90CpUyA",
  authDomain: "ionic-fiap.firebaseapp.com",
  databaseURL: "https://ionic-fiap.firebaseio.com",
  projectId: "ionic-fiap",
  storageBucket: "ionic-fiap.appspot.com",
  messagingSenderId: "1000748698604"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ShopPage, 
    ShopdetailPage,
    ProdutoListPage,
    LoginPage,
    RegistrarPage,
    CarrinhoPage,
    PedidosPage,
    PedidosDetailPage
  ],
 
  imports: [
    BrowserModule,
    HttpModule, 
    AngularFireDatabaseModule, 
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig), 

    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ShopPage,
    ShopdetailPage,
    ProdutoListPage,
    LoginPage,
    RegistrarPage,
    CarrinhoPage,
    PedidosPage,
    PedidosDetailPage
  ],
  providers: [
    StatusBar,
    LoadingController,
    SplashScreen,
    FirebaseProvider,
    AuthService,
    ProdutoService,
    Geolocation,
    AlertController, 
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    
  ]
})
export class AppModule {}
