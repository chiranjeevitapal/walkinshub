import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent }      from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UploadComponent } from './upload/upload.component';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
    {
        path: "home",
        component: HomeComponent
    }, {
        path: "dashboard",
        component: DashboardComponent
    },{
        path: "upload",
        component: UploadComponent
    },{
        path: "register",
        component: RegisterComponent
    },{
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
