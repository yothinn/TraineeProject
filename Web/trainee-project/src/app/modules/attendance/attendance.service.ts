import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {


  constructor(private http: HttpClient) { }

  getAttendance() {
    return this.http.get('http://localhost:3000/api/attendances');
  }
  createAttendance(body) {
    // console.log(body)
    return this.http.post('http://localhost:3000/api/attendances', body);
  }
  updateAttendance(body) {
    console.log(body._id)
    return this.http.put(`http://localhost:3000/api/attendances/${body._id}`, body)
  }
  deleteAttendance(body) {
    // console.log(body)
    return this.http.delete(`http://localhost:3000/api/attendances/${body._id}`, body)
  }
}
