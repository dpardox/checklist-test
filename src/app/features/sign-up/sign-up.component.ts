import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthLayout } from '@shared/layouts/auth/auth.layout';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';


@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, RouterModule, AuthLayout, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  private formBuilder = inject(FormBuilder);

  private authService = inject(AuthService);

  public signUpForm = this.formBuilder.group({
    email: ['', [ Validators.required, Validators.email ]],
  });

  public get emailControl() {
    return this.signUpForm.get('email');
  }

  public signUp() {
    if (this.signUpForm.invalid) return;

    const { email } = this.signUpForm.value;

    this.authService.signUp(email!);
  }

}
