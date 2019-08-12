import { Component, OnInit } from '@angular/core';
import { PASSES } from '../mock-teacher-made-passes';
import {Pass} from '../pass';

@Component({
  selector: 'app-teach-made-passes',
  templateUrl: './teach-made-passes.component.html',
  styleUrls: ['./teach-made-passes.component.scss']
})
export class TeachMadePassesComponent implements OnInit {
  passes = PASSES
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

  constructor() { }
  getStringTimestamp(date: string): string {
    const splitted = date.split(':');
    return this.monthsOfYear[Number(splitted[0])] + '/' + splitted[1];
  }
  deletePass(pass: Pass): void {
    if (confirm('Are you sure want to delete this pass?')) {
      this.passes = this.passes.filter(obj => obj !== pass);
    }
    this.updateShow();
  }
  ngOnInit() {
    this.updateShow();
  }
  updateShow() {
    if (0 === this.passes.length) {
      this.show = false;
    } else {
      this.show = true;
    }
  }

}
