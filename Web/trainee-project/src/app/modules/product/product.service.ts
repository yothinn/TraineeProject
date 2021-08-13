import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductData():Observable<any> {
    return this.http.get('http://localhost:3000/api/products');
  }

  deleteProduct(body:any):Observable<any> {
    return this.http.delete(`http://localhost:3000/api/products/${body._id}`, body);
  }

  createProductData(body:any):Observable<any> {
    return this.http.post(`http://localhost:3000/api/products`, body);
  }

  editProductData(body:any):Observable<any> {
    return this.http.put(`http://localhost:3000/api/products/${body._id}`, body);
  }

  getProductCategories():Observable<any> {
    return this.http.get('http://localhost:3000/api/categories');
  }

  getProductCategoriesById(id:any):Observable<any> {
    return this.http.get(`http://localhost:3000/api/categories/${id}`);
  }
  
  editCategories(body:any):Observable<any> {
    return this.http.put(`http://localhost:3000/api/categories/${body._id}`, body);
  }

  createCategoriesData(body:any):Observable<any> {
    return this.http.post(`http://localhost:3000/api/categories`, body);
  }

  deleteCategories(body:any):Observable<any> {
    return this.http.delete(`http://localhost:3000/api/categories/${body._id}`, body);
  }

  //getTest(body:any):Observable<any> {
    // return this.http.get('http://localhost:3000/api/products', body);
    // return this.http.post(`http://localhost:3000/api/products/${body._id}`, body);
    // return this.http.get('http://localhost:3000/api/products?body._id&body.productName');
  //}

  
 

}
