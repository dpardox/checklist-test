import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  private authService = inject(AuthService);

  private router = inject(Router);

  private formBuilder = inject(FormBuilder);

  public taskForm = this.formBuilder.group({
    title: ['', [ Validators.required ]],
    description: [''],
  });

  public user$ = this.authService.user$;

  public submitTask() {
    if (this.taskForm.invalid) return;

    const { title, description } = this.taskForm.value;

    console.log({ title, description }); // TODO (dpardo): delete

    this.taskForm.reset();
  }

  public async signOut() {
    await this.authService.signOut();
    this.router.navigate(['/sign-in']);
  }

}
