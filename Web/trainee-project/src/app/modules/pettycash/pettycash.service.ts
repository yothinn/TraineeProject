import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PettycashService {

  constructor(private http: HttpClient) { }


  getList(){
    return this.http.get('http://localhost:3000/api/pettychashss')
  }
}
