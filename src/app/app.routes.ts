import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./shared/not-found/not-found.component";
import { routes as userRoutes } from './users/users.routes';
import { resolveTitle } from "./tasks/tasks.component";
import { inject } from "@angular/core";

const dummyMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router)
    const shouldgetAccess = Math.random();
    if(shouldgetAccess < 0.5)
    {
        return true
    }
 return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent,
    },
    {
        path: 'users/:userId', //users/u1,
        component: UserTasksComponent,
        children: userRoutes,
        canMatch: [dummyMatch],
        // canActivate:[dummyMatch],
        data: {
            message: 'Hello! static data'
        },
        resolve: {
            userName: resolveUserName,
            // someother: resolverLastName
        },
        title: resolveTitle
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];