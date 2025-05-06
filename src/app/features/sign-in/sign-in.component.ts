import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthLayout } from '@shared/layouts/auth/auth.layout';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, RouterModule, AuthLayout, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  private formBuilder = inject(FormBuilder);

  public signInForm = this.formBuilder.group({
    email: ['', [ Validators.required, Validators.email ]],
  });


  public get emailControl() {
    return this.signInForm.get('email');
  }


  public signIn() {
    if (this.signInForm.invalid) return;

    const { email } = this.signInForm.value;

    console.log({ email }); // TODO (dpardo): delete
  }

}
