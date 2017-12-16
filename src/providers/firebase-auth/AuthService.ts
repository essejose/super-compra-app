import { Injectable } from '@angular/core';
import { AngularFireAuth  } from 'angularfire2/auth';
import {  AlertController   } from 'ionic-angular'; 
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { User } from '../user/user';

@Injectable()
export class AuthService {


	  user: AngularFireObject<User>
    users: AngularFireList<User[]> = null;
    authState: any = null;


    constructor(
              private firebaseAuth: AngularFireAuth,  
              private db: AngularFireDatabase, 
              public alert: AlertController) { 
                this.firebaseAuth.authState.subscribe((auth) => {
                  this.authState = auth
      });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  get currentUserObservable(): any {
    return this.firebaseAuth.authState
  }
  
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  get status() :string{

    return 
  }

  signup(email: string, password:string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        return this.db.object(`/users/${user.uid}`).update({
          userId: user.uid,
          email: user.email
      })
    
    })
      .catch(err => {
        console.log('Something went wrong:',err.code);
        console.log('Something went wrong:',err.message);
        let alerta = this.alert.create({
          title: 'Erro!',
          subTitle: this.checkError(err.code),
          buttons: ['OK']
        });
        alerta.present();
      });    
  }
  
  login(email: string, password: string) {
    return this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
    
      .catch(err => {
        let alerta = this.alert.create({
          title: 'Erro!',
          subTitle: this.checkError(err.code),
          buttons: ['OK']
        });
        alerta.present();
        
        console.log('Something went wrong:',err.code);
      });
  }

  checkError(err){
    switch (err) {
      case 'auth/invalid-email': return   'E-mail inválido'
      case 'auth/wrong-password': return  'Senha incorreta'
      case 'auth/weak-password': return   'A senha deve ter pelo menos 6 caracteres'
      case 'auth/user-not-found': return  'Usuário não encontrado'
      case 'auth/email-already-in-use' : return  'O endereço de e-mail já está sendo usado por outra conta'
      case 'auth/operation-not-allowed' : return  'auth/operation-not-allowed'
      case 'auth/user-disabled' : return  'auth/user-disabled' 
      default: return 'Erro desconhecido'
    }
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider()
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.firebaseAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {
        this.authState = credential.user
        this.updateUserData()
      })
      .catch(error => console.log(error));
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
      console.log('logout')

  }

  private updateUserData(): void { 
      let path = `users/${this.currentUserId}`;
      let data = {
                    email: this.authState.email,
                    name: this.authState.displayName,
                    userId: this.authState.uid
                  }
  
      this.db.object(path).update(data)
      .catch(error => console.log(error));
    }
  }