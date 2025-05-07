import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '@shared/interfaces/task.interface';

@Pipe({
  name: 'taskSort'
})
export class TaskSortPipe implements PipeTransform {

  transform(tasks: Task[] | null): Task[] {
    if (!tasks || tasks.length === 0) return [];
    const pending = tasks.filter(task => !task.done) .sort(this.sortByDate);
    const done = tasks.filter(task => task.done).sort(this.sortByDate);
    return [...pending, ...done];
  }

  private sortByDate(a: Task, b: Task): number {
    return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
  }

}
