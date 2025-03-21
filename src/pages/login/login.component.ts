import { Component } from '@angular/core';
import { GHeaderProfileComponent } from "../../shared/g-header-profile/g-header-profile.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { GHeaderNotUserComponent } from "../../shared/g-header-not-user/g-header-not-user.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [GHeaderProfileComponent, FooterComponent, GHeaderNotUserComponent,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
