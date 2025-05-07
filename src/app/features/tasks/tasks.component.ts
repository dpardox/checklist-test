import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject } from '@angular/core';
import { TaskService } from '@core/services/task.service';
import { ToastService } from '@core/services/toast.service';
import { Task } from '@shared/interfaces/task.interface';
import { TaskSortPipe } from './pipes/task-sort.pipe';
import { WebLayout } from '@shared/layouts/web/web.layout';
import { TaskFormComponent } from './components/task-form/task-form.component';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, TaskSortPipe, WebLayout, TaskFormComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  private toastService = inject(ToastService);

  private taskService = inject(TaskService);

  private elementRef = inject(ElementRef);

  public task!: Task;

  public tasks$ = this.taskService.getAll();

  public editTask(task: Task) {
    this.task = task;
    const form = this.elementRef.nativeElement.querySelector('app-task-form');
    form.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  public async deleteTask(id: string) {
    try {
      await this.taskService.delete(id);
      this.toastService.show('Task deleted successfully!');
    } catch (_) {
      this.toastService.show('Error deleting task');
    }
  }

  public async toggleDone(task: Task) {
    try {
      const { id, done } = task;
      await this.taskService.update(id!, { done: !done });
      this.toastService.show('Task updated successfully!');
    } catch (_) {
      this.toastService.show('Error updating task');
    }
  }

}
