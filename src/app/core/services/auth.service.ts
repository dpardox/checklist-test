import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, user, UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // for demostration purposes only, in a prod app must be email and password
  private password = 'i&C=L>8=V9O4{M44FRU3';

  private auth = inject(Auth);

  public user$ = user(this.auth);

  constructor() { }

  public async signIn(email: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, this.password);
  }

  public async signUp(email: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(this.auth, email, this.password);
  }

  public async signOut(): Promise<void> {
    await this.auth.signOut();
  }

}
