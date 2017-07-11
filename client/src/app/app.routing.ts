import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './ts/_components/home/home.component';
import { LoginComponent } from './ts/_components/login/login.component';
import { RegisterComponent } from './ts/_components/register/register.component';
import { AuthGuard } from './ts/_guards/auth.guard';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
