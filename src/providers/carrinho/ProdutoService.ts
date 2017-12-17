import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthService } from '../../providers/firebase-auth/AuthService';

import { Produto } from './produto';
 

@Injectable()
export class ProdutoService {
  private basePath: string = '/produtos';
  produtos: AngularFireList<Produto[]> = null;
  produto: AngularFireObject<Produto> = null; 
  userId: string;
  
  constructor(
  	private firebaseAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    auth: AuthService
  ) {
    this.firebaseAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
  }

  getProdutoList(query={}): AngularFireList<Produto[]> {
    if (!this.userId) return;
    this.produtos = this.db.list("/produtos/",  ref => ref.orderByChild('userId').equalTo(this.userId));   
  	return this.produtos
	}
	
  getProduto(key: string): AngularFireObject<Produto> {
    const produtoPath =  `${this.basePath}/${key}`;
    this.produto = this.db.object(produtoPath)
    return this.produto
  }
 
  createProduto(produto: Produto): void  {
    produto.userId = 'this.userId'

    const afList = this.db.list('/produtos/')
    afList.push(produto);
    const listObservable = afList.snapshotChanges();
    listObservable.subscribe();
    
     
    
    // this.produtos.push(produto)
       //.catch(error => this.handleError(error))
  }

  updateProduto(key: string, value: any): void {
    this.produtos.update(key, value)
      .catch(error => this.handleError(error))
  }
 
  deleteProduto(key: string): void {
    this.produtos.remove(key)
      .catch(error => this.handleError(error))
 	}

  
  private handleError(error) {
    console.log(error)
  }

}