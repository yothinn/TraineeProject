import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProductData() {
    return this.http.get('http://localhost:3000/api/products');
  }

  deleteProduct(body) {
    return this.http.delete(`http://localhost:3000/api/products/${body._id}`, body);
  }

  createProductData(body) {
    return this.http.post(`http://localhost:3000/api/products`, body);
  }

  editProductData(body) {
    return this.http.put(`http://localhost:3000/api/products/${body._id}`, body);
  }

  getProductCategories() {
    return this.http.get('http://localhost:3000/api/categories');
  }

  getProductCategoriesById(id) {
    return this.http.get(`http://localhost:3000/api/categories/${id}`);
  }
  
  editCategories(body) {
    return this.http.put(`http://localhost:3000/api/categories/${body._id}`, body);
  }


}
