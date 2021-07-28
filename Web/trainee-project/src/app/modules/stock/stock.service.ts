import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private onDataChanged$ = new BehaviorSubject<any[]>([]);
  public onDataChangedObservable$ = this.onDataChanged$.asObservable();

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get('http://localhost:3000/api/categories');
  }

  getProduct(): Observable<any> {
    return this.http.get('http://localhost:3000/api/products');
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/products?productName=${id}`);
  }

  getProductByCategory(id): Observable<any> {
    return this.http.get(`http://localhost:3000/api/products?categoryId=${id}`);
  }

  getProductByDate(id): Observable<any> {
    return this.http.get(`http://localhost:3000/api/products?created=${id}`);
  }

  // getProductByCategories(){
  //   return this.http.get('http://localhost:3000/api/categoriess')
  // }
}
