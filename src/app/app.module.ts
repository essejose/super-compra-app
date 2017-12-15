import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2'; 

import { MyApp } from './app.component'; 
import { FirebaseProvider } from '../providers/firebase/firebase';

import { HomePage } from '../pages/home/home';
import { ShopPage } from '../pages/shop/shop';
import { ShopdetailPage } from '../pages/shopdetail/shopdetail';
import { ProdutoListPage } from '../pages/produto-list/produto-list';


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
    ProdutoListPage
  ],

  imports: [
    BrowserModule,
    HttpModule,

    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
   
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ShopPage,
    ShopdetailPage,
    ProdutoListPage
  ],
  providers: [
    StatusBar,
    LoadingController,
    SplashScreen,
    FirebaseProvider,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider
  ]
})
export class AppModule {}
