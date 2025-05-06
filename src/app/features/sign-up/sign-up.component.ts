import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthLayout } from '@shared/layouts/auth/auth.layout';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { ToastService } from '@core/services/toast.service';
import { FirebaseError } from '@angular/fire/app';


@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, RouterModule, AuthLayout, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  private toastService = inject(ToastService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  private authService = inject(AuthService);

  public signUpForm = this.formBuilder.group({
    email: ['', [ Validators.required, Validators.email ]],
  });

  public get emailControl() {
    return this.signUpForm.get('email');
  }

  public async signUp() {
    if (this.signUpForm.invalid) return;

    const { email } = this.signUpForm.value;

    try {
      await this.authService.signIn(email!);

      this.router.navigate(['/tasks']);
    } catch (error) {
      console.log({ error }); // TODO (dpardo): delete
      const { code } = error as FirebaseError;
      const errorMapper: Record<string, string> = {
        'auth/too-many-requests': 'Too many requests',
      };

      const message = errorMapper[code] || 'Error signing up';

      this.toastService.show(message);
    }
  }

}
