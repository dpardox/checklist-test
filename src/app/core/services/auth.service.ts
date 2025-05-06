import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private password = 'i&C=L>8=V9O4{M44FRU3'; // password for the whole app

  private auth = inject(Auth);

  public user$ = user(this.auth);

  constructor() { }

  public async signUp(email: string): Promise<void> {
    await createUserWithEmailAndPassword(this.auth, email, this.password);
  }

  public async signOut(): Promise<void> {
    await this.auth.signOut();
  }

}
