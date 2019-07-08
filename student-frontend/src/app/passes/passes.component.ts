import { Component, OnInit } from '@angular/core';
import {Pass} from '../pass';
import { PASSES } from '../mock-passes';
import {MatDialog} from '@angular/material/dialog';
import {timestamp} from 'rxjs/operators';

@Component({
  selector: 'app-passes',
  templateUrl: './passes.component.html',
  styleUrls: ['./passes.component.scss']
})
export class PassesComponent implements OnInit {
  passes = PASSES;
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
  // pass: Pass = {
  //   id : 1,
  //   teacherName: 'Mr. Wilks',
  //   timestamp: 1560549686
  // };
  deletePass(pass: Pass): void {
    if (confirm('Are you sure want to delete this pass?')) {
      this.passes = this.passes.filter(obj => obj !== pass);
    }
  }

  getChip(status: number): string {
    if (0 === status) {
      return 'Canceled by Teacher';
    }
    if (1 === status) {
      return 'Request Pending';
    }
    if (2 === status) {
      return 'Confirmed by Teacher';
    }
  }

    getColor(status: number): string {
      if (0 === status) {
        return 'warn';
      }
      if (1 === status) {
        return 'accent';
      }
      if (2 === status) {
        return 'primary';
    }
  }

    getStringTimestamp(date: string): string {
    const splitted = date.split(':');
    return this.monthsOfYear[Number(splitted[0])] + '/' + splitted[1];
  }

  getNumDays(date: string): number {
    // only estimates days per month
    const splitted = date.split(':');
    return (31 * Number(splitted[0])) + (Number(splitted[1]));
  }
  // constructor(public dialog: MatDialog) {}
  constructor() {}
  ngOnInit() {
    // sort passes by date
    // TODO: doesn't call getNumDays successfully
    this.passes.sort((obj1, obj2): number => {
      if (this.getNumDays(obj1.date) < this.getNumDays(obj2.date)) { return 1; }
      if (this.getNumDays(obj1.date) > this.getNumDays(obj2.date)) { return -1; }
      return 0;
    });
    // this.passes = this.passes.sort(function(obj1, obj2) { return this.getNumDays(obj1.date) - this.getNumDays(obj2.date); });
  }
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
}

