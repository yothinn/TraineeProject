import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceDataService {

  dataCenter$ : Subject<any>;
  

  constructor() { 
    this.dataCenter$ = new Subject();
  }

  getDataCenterObserver(): Observable<any>{
    return this.dataCenter$.asObservable();
  }
  onChange(data: any){
    // console.log(data)
    this.dataCenter$.next(data);
  }
}
