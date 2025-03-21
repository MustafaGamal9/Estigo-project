import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/footer/footer.component";
import { GHeaderProfileComponent } from "../../shared/g-header-profile/g-header-profile.component";

@Component({
  selector: 'app-payment',
  imports: [FooterComponent, GHeaderProfileComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

}
