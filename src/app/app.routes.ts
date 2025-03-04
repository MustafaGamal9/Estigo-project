import { Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { CoursesPageComponent } from '../pages/courses-page/courses-page.component';


export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'courses', component: CoursesPageComponent}
];