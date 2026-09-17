import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink]
})
export class UserTasksComponent implements OnInit {
  userId = input.required<string>();
  message = input.required<string>();
  private userService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  userName = '';

  // userName = computed(() => {
  //   return this.userService.users.find(u => u.id == this.userId())?.name;
  // });

  ngOnInit(): void {
    console.log("message from route :" + this.message());
    const subscribtion = this.activatedRoute.paramMap.subscribe({
      next: paramMap => {
        this.userName = this.userService.users.find((u) => u.id === paramMap.get('userId'))?.name || '';
      }
    });

    this.destroyRef.onDestroy(() => subscribtion.unsubscribe())

    console.log(this.userId() + " user name")
  }

}
