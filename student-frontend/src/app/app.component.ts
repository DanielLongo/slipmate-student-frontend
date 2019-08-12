import { Component } from '@angular/core';
import {LoginService} from "./login.service";
import {ApiService} from "./api.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Slipmate Student';
  isMobileResolution: boolean;
  isDesktopResolution: boolean;
  logged: boolean;
  isEmailed: boolean = false;
  isemailedtext: string;
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
  ngOnInit(){
    this.logged = false
  }
  initLogin(){
    this.emailStatus().then(val => {
      this.isEmailed = (val === "true");
      if(this.isEmailed){
        this.isemailedtext = "Dont get emails"
      }else{
        this.isemailedtext = "Get Emails"
      }
    })
    this.logged=true
  }
  setEmailText(){
    if(this.isEmailed){
      this.isemailedtext = "Dont get emails"
    }else{
      this.isemailedtext = "Get Emails"
    }
  }
  private emailStatus(){
    var promise = new Promise((resolve) => {
      setTimeout(() => {
        this.api.getEmailValue(this.loginService.user.email.split('@')[0]).then(val => {
          console.log(typeof val)
          resolve(val.toString())
          return
        }).catch(err=> {
          resolve(err)
        })
      });
    });
    return promise;
  }

  setOtherEmail() {
    var promise = new Promise((resolve) => {
      setTimeout(() => {
        this.api.optInOrOut(this.loginService.user.email.split('@')[0], this.isEmailed.toString()).then(val => {
          this.isEmailed = !this.isEmailed
          this.setEmailText()
          resolve(val.toString())
          return
        })
      });
    });
    return promise;
  }

}
