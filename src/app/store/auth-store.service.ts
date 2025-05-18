import { computed, inject, Injectable, signal } from '@angular/core';
import { Auth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  readonly router = inject(Router)
  readonly auth = inject(Auth);
  readonly googleAuthProvider = new GoogleAuthProvider();

  #state = signal<any>(undefined)

  select = {
    isAuth: computed(() => this.#state())
  }

  constructor() {
    onAuthStateChanged(this.auth, user => {
      console.log(user)
      this.#state.set(user)
    } );
  }

  actionLogin() {
    signInWithPopup(this.auth, this.googleAuthProvider)
      .then(async res => {
        const email = res.user.email
        if (email === 'kelvinbruno15@gmail.com' || 'brunomonteiroestudio@gmail.com' || 'telmamatos2005@gmail.com') {
          const item = { nome: res?.user.displayName, email: res.user.email, id: res.user.uid, foto: res.user.photoURL };
          this.#state.set(item);
          this.router.navigate(['/admin'])
          return;
        }
        const current = await this.auth.currentUser;
        current?.delete()

      }).catch(err => {
        console.log(err)
      });
  }

  actionLogOut(){
    return signOut(this.auth);
  }

  actionIsAuth(){
    return new Promise(resolve => {
      onAuthStateChanged(this.auth, user => {
        console.log(user)
        this.#state.set(user);
        resolve(user)
      } );
    })

  }


}
