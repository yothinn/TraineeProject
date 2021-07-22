import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get('http://localhost:3000/api/categoriess')
  }
  getProductByCategories(id){
    return this.http.get(`http://localhost:3000/api/productss?categoryId=${id}`)
  }
  // getProductByCategories(){
  //   return this.http.get('http://localhost:3000/api/categoriess')
  // }
}
