import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PettyCashService {
  constructor(private http: HttpClient) { }



  getList(): Observable<any> {
    return this.http.get('http://localhost:3000/api/pettycashs');
  }
  createCustomer(body): Observable<any> {
    return this.http.post('http://localhost:3000/api/pettycashs', body);
  }
  updateCustomer(body): Observable<any>{
    console.log(body)
    return this.http.put(`http://localhost:3000/api/pettycashs/${body._id}`,body);
  }
  deleteList(body): Observable<any>{
    console.log(body)
    return this.http.delete(`http://localhost:3000/api/pettycashs/${body._id}`,body)
  }
  
}
