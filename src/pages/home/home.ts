import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation }  from '@ionic-native/geolocation';
import { NavController } from 'ionic-angular';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map:any;
  
@ViewChild ('map') mapRef: ElementRef;

  constructor(
      public navCtrl: NavController,
      public geolocation: Geolocation) {

  }

  ionViewDidLoad(){
    console.log(this.mapRef);
 
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude 

      this.showMap(resp.coords.latitude,resp.coords.longitude );
      
     }).catch((error) => {
       console.log('Error getting location', error);
     });


   
  } 
 
  showMap(lat,lng){

    const location = new google.maps.LatLng(lat, lng);
    const options = {
      center:location,
      zoom:17
    }

    const map = new google.maps.Map(this.mapRef.nativeElement, options);
    let marker =  this.addMarker(location,map,'you');

    var infowindow = new google.maps.InfoWindow({
      content: 'Você está aqui'
    });
    google.maps.event.addListener(marker, 'click', () => {
        console.log(marker);
        infowindow.open(map, marker);
    })

  }

  addMarker(position,map,title){
    return new google.maps.Marker({
      position,
      map,
      animation: google.maps.Animation.DROP,
      title: title, 
    })
 


  }

 

}
