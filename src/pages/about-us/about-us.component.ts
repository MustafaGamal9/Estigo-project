import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GHeaderProfileComponent } from "../../shared/g-header-profile/g-header-profile.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { GHeaderNotUserComponent } from "../../shared/g-header-not-user/g-header-not-user.component";

@Component({
  selector: 'app-about-us',
  imports: [RouterLink, GHeaderProfileComponent, FooterComponent, GHeaderNotUserComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

}
