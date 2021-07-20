import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  createProduct(value: any) {
    throw new Error('Method not implemented.');
  }
  updateProduct(value: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  getAttendance(){
    return this.http.get('http://localhost:3000/api/attendancess')
  }

}
