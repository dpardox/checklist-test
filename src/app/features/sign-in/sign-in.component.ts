import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthLayout } from '@shared/layouts/auth/auth.layout';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/services/auth.service';


@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, RouterModule, AuthLayout, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  private router = inject(Router);
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  public signInForm = this.formBuilder.group({
    email: ['', [ Validators.required, Validators.email ]],
  });


  public get emailControl() {
    return this.signInForm.get('email');
  }


  public async signIn() {
    if (this.signInForm.invalid) return;

    const { email } = this.signInForm.value;

    await this.authService.signIn(email!);

    this.router.navigate(['/tasks']);
  }

}
