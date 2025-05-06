import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private messages = new BehaviorSubject<string[]>([]);

  public messages$ = this.messages.asObservable();

  public show(message: string) {
    this.messages.next([...this.messages.value, message]);
    setTimeout(() => {
      this.messages.next(this.messages.value.slice(1));
    }, 3000);
  }

}
