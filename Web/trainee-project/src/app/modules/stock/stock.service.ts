import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http:HttpClient) { }

  getCategories(){
    return this.http.get('http://localhost:3000/api/categories')
  }
  getProductByCategories(id){
    return this.http.get(`http://localhost:3000/api/products?categoryId=${id}`)
  }
  // getProductByCategories(){
  //   return this.http.get('http://localhost:3000/api/categoriess')
  // }
}
