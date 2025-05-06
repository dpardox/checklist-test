import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '@core/services/task.service';
import { ToastService } from '@core/services/toast.service';
import { Task } from '@shared/interfaces/task.interface';

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

  private toastService = inject(ToastService);

  private taskService = inject(TaskService);

  public taskForm = this.formBuilder.nonNullable.group({
    id: [''],
    title: ['', [ Validators.required ]],
    description: [''],
  });

  public user$ = this.authService.user$;

  public tasks$ = this.taskService.getAll();

  public async submitTask() {
    if (this.taskForm.invalid) return;

    const { id, title, description } = this.taskForm.value;

    try {
      if (id) {
        await this.taskService.update(id, { title, description });
        this.toastService.show('Task updated successfully!');
      } else {
        await this.taskService.create({ title, description });
        this.toastService.show('Task created successfully!');
      }
      this.taskForm.reset();
    } catch (_) {
      this.toastService.show('Error creating task');
      return;
    }
  }

  public editTask(task: Task) {
    const { id, title, description } = task;
    this.taskForm.patchValue({ id, title, description });
  }

  public async signOut() {
    await this.authService.signOut();
    this.router.navigate(['/sign-in']);
  }

}
