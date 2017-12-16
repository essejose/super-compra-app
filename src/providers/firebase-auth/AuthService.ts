import { Injectable } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { User } from '../user/user';

@Injectable()
export class AuthService {
	user: AngularFireObject<User>
    users: AngularFireList<User[]> = null;
    authState: any = null;
    constructor(private firebaseAuth: AngularFireAuth, 
              private db: AngularFireDatabase) { 
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
        console.log('Something went wrong:',err.message);
      });    
  }
  
  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
      //  this.router.navigate(['/todos']);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
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
     // this.router.navigate(['/']);
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