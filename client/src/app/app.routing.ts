import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './ts/_components/home/home.component';
import { LoginComponent } from './ts/_components/login/login.component';
import { RegisterComponent } from './ts/_components/register/register.component';
import { AuthGuard } from './ts/_guards/auth.guard';
import { AdminComponent } from './ts/_components/admin/admin.component';

const appRoutes: Routes = [
    /*{ path: '', component: HomeComponent, canActivate: [AuthGuard] },*/
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin', component: AdminComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
