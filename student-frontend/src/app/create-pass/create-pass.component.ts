import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Pass} from '../pass';

@Component({
  selector: 'app-create-pass',
  templateUrl: './create-pass.component.html',
  styleUrls: ['./create-pass.component.scss']
})

// TODO: allow to complete select cause
// TODO: actually create the pass
// TODO: get rid of floating create

export class CreatePassComponent implements OnInit {
  newPass: Pass = new Pass();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isMobileResolution: boolean;
  isDesktopResolution: boolean;

  myControl = new FormControl();
  // tslint:disable-next-line:max-line-length
  options: string[] = ['Ms. Pong', 'Mr. Kaddoura', 'Ms. Abel', 'Mr. Gelb', 'Mr. Kelly', 'Mr. Manzo', 'Ms. Baumgartel', 'Mr. Etlin', 'Ms. Saurter', 'Ms. Campbell'];
  filteredOptions: Observable<string[]>;

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
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  inputEntered(input: string): void {
    console.log(input);
}

}
