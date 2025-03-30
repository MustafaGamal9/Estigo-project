import { BioVmComponent } from './../components/courses/bio-vm/bio-vm.component';
import { Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home-page/home-page.component';
import { CoursesPageComponent } from '../pages/courses-page/courses-page.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { AboutUsComponent } from '../pages/about-us/about-us.component';
import { LoginComponent } from '../pages/login/login.component';
import { PaymentComponent } from '../pages/payment/payment.component';
import { RegisterComponent } from '../pages/register/register.component';
import { RoadmapComponent } from '../pages/roadmap/roadmap.component';
import { CourseVideoComponent } from './../pages/course-video/course-video.component';
import { ChemVmComponent } from '../components/courses/chem-vm/chem-vm.component';
import { MathVmComponent } from '../components/courses/math-vm/math-vm.component';
import { PhyVmComponent } from '../components/courses/phy-vm/phy-vm.component';
import { EngVmComponent } from '../components/courses/eng-vm/eng-vm.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'courses', component: CoursesPageComponent},
    {path:  'dashboard', component: DashboardComponent},
    {path: "aboutus", component: AboutUsComponent},
    {path: "login", component:LoginComponent},
     {path: "payment", component:PaymentComponent},
     {path:"register",component:RegisterComponent},
     {path:"roadmap",component:RoadmapComponent},
     {path:"video",component:CourseVideoComponent},
     {path:"bioVm",component:BioVmComponent},
     {path:"chemVm",component:ChemVmComponent},
     {path:"phyVm",component:PhyVmComponent},
     {path:"mathVm",component:MathVmComponent},
     {path:"engVm",component:EngVmComponent}
     
];