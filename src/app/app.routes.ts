import { Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { CoursesPageComponent } from '../pages/courses-page/courses-page.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AboutUsComponent } from '../pages/about-us/about-us.component';
import { LoginComponent } from '../pages/login/login.component';
import { PaymentComponent } from '../pages/payment/payment.component';
import { RegisterComponent } from '../pages/register/register.component';


export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'courses', component: CoursesPageComponent},
    {path:  'dashboard', component: DashboardComponent},
    {path: "aboutus", component: AboutUsComponent},
    {path: "login", component:LoginComponent},
     {path: "payment", component:PaymentComponent},
     {path:"register",component:RegisterComponent}
];