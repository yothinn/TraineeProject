import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private onDataChanged$ = new Subject();
  public onDataChangedObservable$ = this.onDataChanged$.asObservable();

  private onDateChanged$ = new Subject();
  public onDateChangedObservable$ = this.onDateChanged$.asObservable();

  private onDateOutChanged$ = new Subject();
  public onDateOutChangedObservable$ = this.onDateOutChanged$.asObservable();

  

 





  constructor(private http: HttpClient) { }

  getAttendance(): Observable<any> {
    return this.http.get('http://localhost:3000/api/attendances');
  }

  createAttendance(body: any): Observable<any> {
    // console.log(body)
    return this.http.post('http://localhost:3000/api/attendances', body);
  }

  updateAttendance(body: any): Observable<any> {
    // console.log(body._id)
    return this.http.put(`http://localhost:3000/api/attendances/${body._id}`, body);
  }

  deleteAttendance(body: any): Observable<any> {
    // console.log(body)
    return this.http.delete(`http://localhost:3000/api/attendances/${body._id}`, body);
  }


  getDateTimeById(id: any): void {
    // console.log(id)
    this.http.get(`http://localhost:3000/api/datetimes?employeeId=${id.employeeId}`)
      .subscribe((res: any) => {
        // console.log(res)
        this.onDateChanged$.next(res.data)
      })
  }

  getDateTimeOutById(id: any): void {
    // console.log(id)
    this.http.get(`http://localhost:3000/api/datetimeouts?employeeId=${id.employeeId}`)
      .subscribe((res: any) => {
        console.log(res)
        this.onDateOutChanged$.next(res.data)
      })
  }



  getProfileById(id: any): void {
    // console.log(id)
    this.http.get(`http://localhost:3000/api/attendances/${id._id}`)
      .subscribe((res: any) => {
        // console.log(res)
        this.onDataChanged$.next(res.data)
      })
  }

  createDatetimeIn(body: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/datetimes', body);
  }

  
  createDatetimeOut(body: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/datetimeouts', body);
  }

  searchEmployee(text:any):Observable<any>{
    // console.log(text);
      return this.http.get(`http://localhost:3000/api/attendances/search?query=${text}`);
    } 

  uploadImageAttendance(file): Observable<any>{
    // console.log(file);
    return this.http.post('http://localhost:3000/api/attendances/uploads', file);
  }

  
}


