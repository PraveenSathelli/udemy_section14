import { Component, computed, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  userId = input.required<string>();
  private userService = inject(UsersService);
  userName = computed(() => { return this.userService.users.find(u => u.id == this.userId())?.name;
  });

  constructor() {

  }

  ngOnInit(): void {
    console.log(this.userId() + " user name")
  }

}
