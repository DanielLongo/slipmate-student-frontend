import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-pass',
  templateUrl: './create-pass.component.html',
  styleUrls: ['./create-pass.component.css']
})
export class CreatePassComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isMobileResolution: boolean;
  isDesktopResolution: boolean;

  constructor(private _formBuilder: FormBuilder) {
    if (window.innerWidth < 900) {
      this.isMobileResolution = true;
      this.isDesktopResolution = false;
    } else {
      this.isMobileResolution = false;
      this.isDesktopResolution = true;
    }
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
      // ttCtrl: ['', Validators.required],
      // checkOne: [false, Validators.required],
      // thirdCtrl: ['', Validators.required]
    });
  }
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

}
