import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.layout.html',
  styleUrl: './auth.layout.css'
})
export class AuthLayout {

  @Input()
  public bg!: string;

}
