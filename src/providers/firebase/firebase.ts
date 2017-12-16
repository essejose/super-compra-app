 
import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth'; 
 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

 
@Injectable()
export class FirebaseProvider {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>; 
  userId: any;
  total:any;

  constructor(public afd: AngularFireDatabase,
              private firebaseAuth: AngularFireAuth,
      
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
    console.log(this.userId );
        if(this.userId == undefined){
          this.userId = 1;
        
        }
 
        return this.afd.list('/carrinho/', ref => ref.orderByChild('produto/userId').equalTo(this.userId))
        .snapshotChanges()
        .map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
    
       }
  getShoppingCarrinhoTotal(){


    if(this.userId == undefined){
      this.userId = '1';
    } 
     this.afd.list('/carrinho/', ref => ref.orderByChild('produto/userId').equalTo(this.userId))
 

  }

  getPedidosItens(){
     
        if(this.userId == undefined){
          this.userId = '1';
        } 
        return   this.afd.list('/pedidos/', ref => ref.orderByChild('pedido/userId').equalTo(this.userId))  .snapshotChanges()
         .map(changes => {
           return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
         })
     
    
      }


   addItem(name,path:string) {
     if(path == undefined){
        path = 'shoppingItems';
     }

     name.produto.userId = this.userId;
     
    let afList = this.afd.list('/'+path+'/')
    afList.push(name);
    let listObservable = afList.snapshotChanges();
    listObservable.subscribe();
   
  }


   addPedido(pedidos,total,formapagamento) {
    if(this.userId == undefined){
      this.userId = '1';
    }
    
    let afList = this.afd.list('/pedidos/');
    let pedidoformat = {
      userId : this.userId,
      total: total,
      active:false,
      formaPagemento:formapagamento,
      itens: pedidos
    }
   afList.push({pedido:pedidoformat});
   let listObservable = afList.snapshotChanges();
   listObservable.subscribe();
  }



   
  
   removeItem(id,path) {
    if(path == undefined){
      path = '/shoppingItems';
     }

    return this.afd.list('/'+path+'/').remove(id);
    
   }

}
