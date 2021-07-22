import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
 

  constructor(private http: HttpClient) { }

  getAttendance(){
    return this.http.get('http://localhost:3000/api/attendancess');
  }
  createAttendance(body){
    // console.log(body)
    return this.http.post('http://localhost:3000/api/attendancess',body);
  }
  updateAttendance(body){
    console.log(body)
    return this.http.post('http://localhost:3000/api/attendancess',body);
}
}
