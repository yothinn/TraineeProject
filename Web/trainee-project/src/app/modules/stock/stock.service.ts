import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  
  private onDataChanged$ = new Subject();
  public onDataChangedObservable$ = this.onDataChanged$.asObservable();

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get('http://localhost:3000/api/categories');
  }

  getProduct(): Observable<any> {
    return this.http.get('http://localhost:3000/api/products')
  }

  getProductById(id: string) {
    console.log(id);
    this.http.get(`http://localhost:3000/api/products/${id}`)
      .subscribe((res: any) => {
        this.onDataChanged$.next(res.data)
      })
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
