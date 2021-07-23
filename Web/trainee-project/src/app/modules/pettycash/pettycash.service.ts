import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { $ } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class PettyCashService {
  customer: any;
  constructor(private http: HttpClient) { }



  getList() {
    return this.http.get('http://localhost:3000/api/pettycashs')
  }
  createCustomer(customerList: any) {
    return this.http.post('http://localhost:3000/api/pettycashs', customerList)
  }
}
