import { Component } from '@angular/core';
import {FormBuilder} from '@angular/forms';
// import {AuthService, GoogleLoginProvider, SocialUser} from "angularx-social-login";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Slipmate Student';
  isMobileResolution: boolean;
  isDesktopResolution: boolean;
  // user: SocialUser;
  constructor() {
    if (window.innerWidth < 900) {
      this.isMobileResolution = true;
      this.isDesktopResolution = false;
    } else {
      this.isMobileResolution = false;
      this.isDesktopResolution = true;
    }
  }
}
