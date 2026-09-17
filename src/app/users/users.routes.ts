import { Routes } from "@angular/router";
import { resolveUserTasks, TasksComponent } from "../tasks/tasks.component";
import { canLeaveEditPage, NewTaskComponent } from "../tasks/new-task/new-task.component";
import { resolveUserName } from "./user-tasks/user-tasks.component";

export const routes: Routes = [

    {
        path: '', // <domain>/users/<uid>/tasks
        redirectTo: 'tasks',
        pathMatch: 'full'
    },
    {
        path: 'tasks', // <domain>/users/<uid>/tasks
        component: TasksComponent,
        resolve:{
            userTasks:resolveUserTasks
        }
    },
    {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage]
    }
]