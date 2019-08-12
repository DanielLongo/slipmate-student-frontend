import { Component } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {LoginService} from "./login.service";
import {ApiService} from "./api.service";
// import {AuthService, GoogleLoginProvider, SocialUser} from "angularx-social-login";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Slipmate Student';
  isMobileResolution: boolean;
  isDesktopResolution: boolean;
  // user: SocialUser;
  constructor(private loginService: LoginService,
              private api: ApiService) {
    if (window.innerWidth < 900) {
      this.isMobileResolution = true;
      this.isDesktopResolution = false;
    } else {
      this.isMobileResolution = false;
      this.isDesktopResolution = true;
    }
  }

  emailStatus(){
    var promise = new Promise((resolve) => {
      setTimeout(() => {
        this.api.getEmailValue(){
        }
        resolve("done")
      });
    });
    return promise;
  }

}
