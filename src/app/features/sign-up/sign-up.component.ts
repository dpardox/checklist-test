import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthLayout } from '@shared/layouts/auth/auth.layout';

@Component({
  selector: 'app-sign-up',
  imports: [RouterModule, AuthLayout],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

}
