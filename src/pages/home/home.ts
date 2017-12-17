import { Component, ViewChild, ElementRef } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Geolocation }  from '@ionic-native/geolocation';
import { NavController } from 'ionic-angular'; 
// import { AngularFireList } from 'angularfire2/database';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import 'rxjs/add/operator/map';
declare var google: any;
import { ShopdetailPage } from '../../pages/shopdetail/shopdetail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map:any;
  shoppingItems:  any;
  newItem = '';



@ViewChild ('map') mapRef: ElementRef;

  constructor(
      public navCtrl: NavController,
      public geolocation: Geolocation,
      public firebaseProvider: FirebaseProvider,
      public loadingCtrl: LoadingController
    ) {
     

 } 

  ionViewDidLoad(){
    
    let loader = this.loadingCtrl.create({
      content: "Carregando lojas proximas" 
    });
    loader.present();
    this.geolocation.getCurrentPosition().then((resp) => { 

      this.showMap(resp.coords.latitude,resp.coords.longitude );
      this.shoppingItems = this.firebaseProvider.getShoppingItems();
      
      loader.dismiss();

     }).catch((error) => {
       console.log('Error getting location', error);
     });
 
  }
   

  showMap(lat,lng){

    const location = new google.maps.LatLng(lat, lng);
    const fakePlace = new google.maps.LatLng((lat -0.001), lng  );
    const options = {
      center:location,
      zoom:17
    } 

    const map = new google.maps.Map(this.mapRef.nativeElement, options);
    let marker =  this.addMarker(location,map,'you','http://maps.google.com/mapfiles/ms/icons/POI.png');
    let marker2 =  this.addMarker(fakePlace,map,'Uma loja perto de voce','http://maps.google.com/mapfiles/ms/icons/groecerystore.png');
    var infowindow = new google.maps.InfoWindow({
      content: 'Você está aqui'
    });
    google.maps.event.addListener(marker, 'click', () => {
        console.log(marker);
        infowindow.open(map, marker);
    })
    google.maps.event.addListener(marker2, 'click', () => {
      console.log(marker2);
     // infowindow.open(map, marker2);
      this.navCtrl.push(ShopdetailPage);
   
  })
 

  }

  addMarker(position,map,title,image){
  ;
    return new google.maps.Marker({
      position,
      map,
      animation: google.maps.Animation.DROP,
      title: title, 
      icon: image
    })
 


  }

 

}
