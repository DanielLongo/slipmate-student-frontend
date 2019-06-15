import { Component, OnInit } from '@angular/core';
import {Pass} from '../pass';
import { PASSES } from '../mock-passes';
import {MatDialog} from '@angular/material/dialog';
import {timestamp} from 'rxjs/operators';

@Component({
  selector: 'app-passes',
  templateUrl: './passes.component.html',
  styleUrls: ['./passes.component.css']
})
export class PassesComponent implements OnInit {
  passes = PASSES;
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

    getStringTimestamp(timestamp: number): string {
    const d = new Date(timestamp);
    // d.getMinutes();
    return d.getMonth().toString() + '/' + d.getDay().toString() + '/' + d.getFullYear().toString();
  }


  // constructor(public dialog: MatDialog) {}
  constructor() {}
  ngOnInit() {
    // sort passes by date
    this.passes = this.passes.sort(function(obj1, obj2) { return obj1.timestamp - obj2.timestamp; });
  }
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
}

