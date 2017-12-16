import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth'; 
import { AuthService } from '../../providers/firebase-auth/AuthService'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

 
@Injectable()
export class FirebaseProvider {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>; 
  userId: string;
  total:any;

  constructor(public afd: AngularFireDatabase,
              private firebaseAuth: AngularFireAuth,
              private auth: AuthService
  ) { 

    this.firebaseAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })

    console.log(this.userId);
  }
  
   getShoppingItems() {

    return this.afd.list('/shoppingItems/', ref => ref.orderByChild('name'))
    .snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })

   }
   
   getShoppingCarrinhoItems() {

        if(this.userId == undefined){
          this.userId = '1';
        }
 
        return this.afd.list('/carrinho/', ref => ref.orderByChild('name/userId').equalTo(this.userId))
        .snapshotChanges()
        .map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
    
       }
  getShoppingCarrinhoTotal(){


    if(this.userId == undefined){
      this.userId = '1';
    }

    let price;
     this.afd.list('/carrinho/', ref => ref.orderByChild('name/userId').equalTo(this.userId))
    .snapshotChanges() 
    .subscribe(actions => {
      actions.forEach(action => {
        console.log(action.type);
        console.log(action.key);
        console.log(  action.payload.val().name.price)
        price = price + action.payload.val().name.price;
      });
      return price  
    }); 

  }

   addItem(name,path:string) {
     if(path == undefined){
      path = 'shoppingItems';
     }
    const afList = this.afd.list('/'+path+'/')
    afList.push({ name: name });
    const listObservable = afList.snapshotChanges();
    listObservable.subscribe();
   }
  
   removeItem(id,path) {
    if(path == undefined){
      path = '/shoppingItems';
     }

    return this.afd.list('/'+path+'/').remove(id);
    
   }

}
