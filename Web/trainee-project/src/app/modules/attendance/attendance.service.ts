import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {


  constructor(private http: HttpClient) { }

  getAttendance():Observable<any> {
    return this.http.get('http://localhost:3000/api/attendances');
  }

  createAttendance(body:any):Observable<any> {
    // console.log(body)
    return this.http.post('http://localhost:3000/api/attendances', body);
  }

  updateAttendance(body:any):Observable<any> {
    console.log(body._id)
    return this.http.put(`http://localhost:3000/api/attendances/${body._id}`, body)
  }

  deleteAttendance(body:any):Observable<any> {
    // console.log(body)
    return this.http.delete(`http://localhost:3000/api/attendances/${body._id}`, body)
  }

  getEmployeeById(id:any):Observable<any> {
    console.log(id)
  return this.http.get(`http://localhost:3000/api/attendances/${id}`)
  }

}
