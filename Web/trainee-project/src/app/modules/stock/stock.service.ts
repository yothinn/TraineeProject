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
    return this.http.get('http://localhost:3000/api/products');
  }
  getStockProduct(){
    return this.http.get('http://localhost:3000/api/stocksproducts');
  }

  // getProductById(id :string): Observable<any> {
  //   return this.http.get(`http://localhost:3000/api/products`);
  // }

  getStockByProductId(id: string): void {
    console.log(id);
    this.http.get(`http://localhost:3000/api/stocksproducts?productId=${id}`)
      .subscribe((res: any) => {
        console.log(res);
        this.onDataChanged$.next(res.data);
      })
  }

  getProductByCategory(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/products?categoryId=${id}`);
  }

  getProductByDate(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/products?created=${id}`);
  }

  createStock(body: string): Observable<any> {
    return this.http.post(`http://localhost:3000/api/stocksproducts/`, body);
  }

  updateStock(body: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/stocksproducts/${body._id}`, body);
  }

  searchProduct(text:any):Observable<any>{
  console.log(text);
    return this.http.get(`http://localhost:3000/api/products/search?query=${text}`);
  } 

  // getProductByCategories(){
  //   return this.http.get('http://localhost:3000/api/categoriess')
  // }
}
