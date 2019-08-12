import { Injectable } from '@angular/core';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private loginService: LoginService) {}

  private async request(func: string, data: any): Promise<any> {
    const req = new XMLHttpRequest;
    req.open('GET', 'https://cors-anywhere.herokuapp.com/https://us-central1-tutorial-pass-automator.cloudfunctions.net/' + func, false);
    for (let i in data) {
      console.log(i, data[i]);
      req.setRequestHeader(i.toString(), data[i]);
    }
    req.send();
    console.log(req.response);
    return req.response;
  }

  private month(m: string): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'];
    // tslint:disable-next-line:radix
    return months[parseInt(m) -  1];
  }

  private daySuffix(day: string): string {
    // tslint:disable-next-line:radix
    let d = parseInt(day) % 10;
    const suffixes = ['th', 'st', 'nd', 'rd'];
    if (d > 3) { d = 0; }
    return suffixes[d];
  }

  createPass(isTeacherPassCh: boolean, teacherToID: string, teacherFromID: string, studentIDd: string, month: string, day: string, reasonCh: string): any {
    const tt = this.getTeacher(teacherToID);
    const ft = this.getTeacher(teacherFromID);
    let ttName = '';
    let ftName = '';
    if (!tt.hasOwnProperty('name')) { ttName = 'null'; }
    if (!ft.hasOwnProperty('name')) { ftName = 'null'; }
    return this.request('createPass', {
      isTeacherPass: isTeacherPassCh,
      toTeachID: teacherToID,
      fromTeachID: teacherFromID,
      toTeachName: ttName,
      fromTeachName: ftName,
      studentID: studentIDd,
      day: (month + ':' + day),
      reason: reasonCh
    });
  }

  initTeacher(teacherID: string, name: string): any {
    return this.request('initializeTeacher', {
      id: teacherID,
      teacher: name
    });
  }

  getAllTeachers(): any {
    return this.request('getAllTeachers', {});
  }

  getTeacher(id: string): any {
    return this.request('getTeacher', {
      teacherID: id
    });
  }

  createBlockedDay(id: string, month: string, day: string): any {
    return this.request('createBlockedDay', {
      teacherID: id,
      blockedDay: (month + ':' + day)
    });
  }

  getOutgoingSlipsToday(id: string, month: string, day: string): any {
    return this.request('getOutgoingSlipsForTeacherToday', {
      teacherID: id,
      day: (month + ':' + day)
    });
  }

  getIncomingSlipsToday(id: string, month: string, day: string): any {
    return this.request('getIncomingSlipsForTeacherToday', {
      teacherID: id,
      day: (month + ':' + day)
    });
  }

  getBlockedDays(id: string): any {
    return this.request('getBlockedDays', {
      teacherID: id
    });
  }

  getUnapprovedSlips(id: string): any {
    return this.request('getUnapprovedSlips', {
      teacherID: id
    });
  }

  deleteSlip(slipID: string): any {
    return this.request('deleteSlip', {
      ID: slipID
    });
  }

  getSlip(slipID: string): any {
    return this.request('getSlip', {
      ID: slipID
    });
  }

  getStudent(stuID: string): any {
    return this.request('getStudent', {
      studentID: stuID
    });
  }

  teacherApprovePass(passIDCh: string, teacherIDCh: string) {
    return this.request('teacherApprovePass', {
      passID: passIDCh,
      teacherID: teacherIDCh
    });
  }

  teacherDenyPass(passIDCh: string, teacherIDCh: string) {
    return this.request('teacherDenyPass', {
      passID: passIDCh,
      teacherID: teacherIDCh
    });
  }

  deleteBlockedDay(day: string) {
    return this.request('deleteBlockedDays', {
      ids: day
    });
  }

  getEmailValue(id: string) {
    return this.request('')
  }
}
