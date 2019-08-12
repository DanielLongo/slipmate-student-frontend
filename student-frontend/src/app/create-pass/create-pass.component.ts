import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Pass} from '../pass';
import {LoginService} from "../login.service";
import {ApiService} from "../api.service";

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
  myDate = new Date();
  selectTeacherControl = new FormControl()
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isMobileResolution: boolean;
  isDesktopResolution: boolean;

  myControl = new FormControl();
  // tslint:disable-next-line:max-line-length
  allTeachers: string[] = [];
  myTeachers: string[] = [];
  allTeachersBoth: any;
  filteredOptions: Observable<string[]>;
  firstControl: FormControl;
  passInfo: FormGroup;
  validations_form: FormGroup;
  private options: any;
  constructor(private _formBuilder: FormBuilder,
              private loginService: LoginService,
              private api: ApiService) {
    if (window.innerWidth < 900) {
      this.isMobileResolution = true;
      this.isDesktopResolution = false;
    } else {
      this.isMobileResolution = false;
      this.isDesktopResolution = true;
    }
  }

  ngOnInit() {
    this.fillAllTeacher().then(val => {console.log(val)})
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
    });
    // this.passInfo = new FormGroup({
    //   date : new FormControl('date', Validators.required),
    //   teacherName : new FormControl('teacherName', Validators.required),
    //   reason : new FormControl('cause', Validators.required)
    // });
    //
    // this.validations_form = this._formBuilder.group({
    //   date: new FormControl('', Validators.required),
    //   teacherName : new FormControl('', Validators.required),
    //   reason : new FormControl('', Validators.required)
    //   }
    // );
    // this.firstControl = new FormControl();
  }
  fillAllTeacher(){
    var promise = new Promise((resolve) => {
      setTimeout(() => {
        this.api.getAllTeachers().then(ret => {
          try{
            let jsonData = JSON.parse(ret);
            this.allTeachersBoth = jsonData
            this.api.getStudent(this.loginService.user.email.split('@')[0]).then(val => {
              try{
                let jsonStudent = JSON.parse(val)
                console.log(jsonStudent)
                for(let i = 0; i < jsonData.length; i++){
                  if(jsonData[i].teachID === jsonStudent[0].teachSixth){
                    this.myTeachers.push(jsonData[i].teachName.split(' ')[1])
                  }else if(jsonData[i].teachID === jsonStudent[0].teachSeventh){
                    this.myTeachers.push(jsonData[i].teachName.split(' ')[1])
                  }else{
                    this.allTeachers.push(jsonData[i].teachName.split(' ')[1])
                  }
                }
                console.log("MY ARRAY: " + this.myTeachers)
                console.log("NO OVERLAP ARRAY: " + this.allTeachers)
              }catch(err){
                throw err
              }
            })
            resolve(jsonData)
          }catch(err){
            resolve("BAD ERROR NO TEACHERS")
          }
        })
      })
    });
    return promise
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

  createPass() {
    const teacherName = this.firstFormGroup.value
    const date = this.pad(document.forms[1].elements['date'].value.split('/')[0], 2) + ':' + this.pad(document.forms[1].elements['date'].value.split('/')[1], 2);
    const cause = this.thirdFormGroup.value
    let toTeachID = ""
    console.log(date)
    for(let i = 0; i < this.allTeachersBoth.length; i++){
      if(this.allTeachersBoth[i].teachName.split(' ')[1] === teacherName.firstCtrl.toString()){
        toTeachID = this.allTeachersBoth[i].teachID;
        console.log("MATCH")
      }
    }
    this.api.createPass(toTeachID, 'null', this.loginService.user.email.split('@')[0], date, cause.thirdCtrl.toString(), teacherName.firstCtrl.toString()).then(val => {console.log(val)})
    // // console.log(document.forms[1].elements['date'].value)
    // // tslint:disable-next-line:max-line-length
    // console.log(this.pad(document.forms[1].elements['date'].value.split('/')[0], 2) + ':' + this.pad(document.forms[1].elements['date'].value.split('/')[1], 2)); // trying to get month
    // console.log(this.thirdFormGroup.value);
    console.log(teacherName)
    console.log(date)
    console.log(cause)
  }

  pad(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) { s = '0' + s; }
    return s;
  }
}
