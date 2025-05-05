import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthLayout } from '@shared/layouts/auth/auth.layout';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, RouterModule, AuthLayout, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  private formBuilder = inject(FormBuilder);

  public signUpForm = this.formBuilder.group({
    email: ['', [ Validators.required, Validators.email ]],
  });

  public signUp() {
    if (this.signUpForm.invalid) return;

    const { email } = this.signUpForm.value;

    console.log({ email }); // TODO (dpardo): delete
  }

}
