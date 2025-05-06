import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-tasks',
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  public async signOut() {
    await this.authService.signOut();
    this.router.navigate(['/sign-in']);
  }

}
