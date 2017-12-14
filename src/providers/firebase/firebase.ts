import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(public afd: AngularFireDatabase) { }
  
   getShoppingItems() {

    return this.afd.list('/shoppingItems/', ref => ref.orderByChild('name'))
    .snapshotChanges()
    .map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    })

 
    
    
   
   }
  
   addItem(name) {
    const afList = this.afd.list('/shoppingItems/')
    afList.push({ name: name });
    const listObservable = afList.snapshotChanges();
    listObservable.subscribe();
   }
  
   removeItem(id) {
    return this.afd.list('/shoppingItems/').remove(id);
    
   }

}
