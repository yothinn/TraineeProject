import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PettycashService {
  customer:any;
  constructor(private http:HttpClient) { }


  createCustomer(customerList : any){
  
  }
}
