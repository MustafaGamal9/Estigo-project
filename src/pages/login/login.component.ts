import { Component } from '@angular/core';
import { GHeaderProfileComponent } from "../../shared/g-header-profile/g-header-profile.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-login',
  imports: [GHeaderProfileComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
