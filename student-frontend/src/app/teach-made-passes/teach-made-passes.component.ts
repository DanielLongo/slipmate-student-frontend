import { Component, OnInit } from '@angular/core';
import { PASSES } from '../mock-teacher-made-passes';
import {Pass} from '../pass';
import {ApiService} from '../api.service';
import {LoginService} from '../login.service';
import {tryCatch} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-teach-made-passes',
  templateUrl: './teach-made-passes.component.html',
  styleUrls: ['./teach-made-passes.component.scss']
})
export class TeachMadePassesComponent implements OnInit {
  // passes = PASSES
  monthsOfYear = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec'
  ]
  show: boolean;
  private passes: any;

  constructor(private api: ApiService, private loginservice: LoginService) {
  }
  getStringTimestamp(date: string): string {
    const splitted = date.split(':');
    return this.monthsOfYear[Number(splitted[0])] + '/' + splitted[1];
  }
  deletePass(passId: string): void {
    if (confirm('Are you sure want to delete this pass?')) {
      this.api.deleteSlip(passId).then (
        this.api.getTeacherMadePasses(this.loginservice.user.email.split('@')[0]).then (
          val => {
            try {
              this.passes = JSON.parse(val)
            }
            catch (e) {
              this.show = false;
            }
          }
        )
      )
      // this.passes = this.passes.filter(obj => obj !== pass);
    }
    this.updateShow()
  }

  acceptPass(passID: string, teacherID: string) {
    this.api.studentAcceptPass(passID, this.loginservice.user.email.split('@')[0], teacherID).then (
      val => {
      this.api.getTeacherMadePasses(this.loginservice.user.email.split('@')[0]).then (
        val => {
          try {
            this.passes = JSON.parse(val)
          }
          catch (e) {
            this.show = false;
          }
        }
      )}
    )
    this.updateShow()
  }
  ngOnInit() {
    this.api.getTeacherMadePasses(this.loginservice.user.email.split('@')[0]).then (
      val => {this.passes = JSON.parse(val); this.updateShow();} // console.log(this.passes)}
    )
    // this.api.getEmailValue(this.loginservice.user.email.split('@')[0]).then (
    //   val => {console.log('email value ' + val); this.passes = JSON.parse(val)}
    // )
  }
  updateShow() {
    console.log(' length ' + this.passes.length)
    if (this.passes.length > 0) {
      this.show = true;
    } else {
      this.show = false;
    }
    console.log('show ' + this.show)
  }

}
