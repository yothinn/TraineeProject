import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductData(){
    return this.http.get('http://localhost:3000/api/productss')
  }

  getProductCategories(){
    return this.http.get('http://localhost:3000/api/categoriess')
  }
}
