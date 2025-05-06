import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { filter, firstValueFrom, Observable, switchMap } from 'rxjs';
import { Task } from '@shared/interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  public async create(task: Partial<Task>) {
    const user = await firstValueFrom(this.authService.user$);

    if (!user) throw new Error('User not authenticated');

    const createdAt = new Date();

    const tasksCollection = collection(this.firestore, `users/${user.uid}/tasks`);
    return addDoc(tasksCollection, { ...task, createdAt });
  }

  public getAll(): Observable<Task[]> {
    return this.authService.user$.pipe(
      filter(user => !!user),
      switchMap(user => {
        const tasksCollection = collection(this.firestore, `users/${user!.uid}/tasks`);
        return collectionData(tasksCollection, { idField: 'id' }) as Observable<Task[]>;
      })
    );
  }

  public async update(id: string, task: Partial<Task>) {
    const user = await firstValueFrom(this.authService.user$);

    if (!user) throw new Error('User not authenticated');

    const taskRef = doc(this.firestore, `users/${user.uid}/tasks/${id}`);
    return updateDoc(taskRef, task);
  }

}
