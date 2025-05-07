import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '@core/services/task.service';
import { ToastService } from '@core/services/toast.service';
import { Task } from '@shared/interfaces/task.interface';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnChanges {

  @Input() task: Task | null = null;

  private formBuilder = inject(FormBuilder);

  private taskService = inject(TaskService);

  private toastService = inject(ToastService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']) {
      this.taskForm.patchValue(this.task || {});
    }
  }

  public get idControl() {
    return this.taskForm.get('id');
  }

  public taskForm = this.formBuilder.nonNullable.group({
    id: [''],
    title: ['', [ Validators.required ]],
    description: [''],
  });

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

}
