import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  // order = input<'asc' | 'desc'>()
  order?: 'asc' | 'desc';
  userId = input.required<string>();
  private taskService = inject(TasksService);
  private activatedRoute = inject(ActivatedRoute);
  private desref = inject(DestroyRef);
  userTasks = computed(() => {
    return this.taskService.allTasks().filter(x => x.userId === this.userId())
  });

  ngOnInit() {

    const sub = this.activatedRoute.queryParams.subscribe({
      next: (params) => {
        this.order = params['order'];
      }
    });
    this.desref.onDestroy(() => { sub.unsubscribe(); })
  }
}
