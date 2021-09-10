import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PettyCashService {

  private onTableChanged$ = new Subject();
  public onTableChangedObservable$ = this.onTableChanged$.asObservable();

  private onListChanged$ = new Subject();
  public onListChangedObservable$ = this.onListChanged$.asObservable();

  private onImageChanged$ = new Subject();
  public onImageChangedObservable$ = this.onImageChanged$.asObservable();

  constructor(private http: HttpClient) { }

  getTableById(id: any): void {
    this.http.get(`http://localhost:3000/api/tableLists?lastName=${id}`)
      .subscribe((res: any) => {
        this.onTableChanged$.next(res.data);
      })
  }
  getImage(id: any): void {
    console.log(id)
    this.http.get(`http://localhost:3000/api/tableLists/${id._id}`)
      .subscribe((res: any) => {
        this.onImageChanged$.next(res.data);
      })
  }
  getListById(id: any): void {
    this.http.get(`http://localhost:3000/api/pettycashs/${id}`)
      .subscribe((res: any) => {
        this.onListChanged$.next(res.data);
      })
  }



  getList(): Observable<any> {
    return this.http.get('http://localhost:3000/api/pettycashs');
  }
  createCustomer(body): Observable<any> {
    return this.http.post('http://localhost:3000/api/pettycashs', body);
  }
  updateCustomer(body): Observable<any> {
    console.log(body)
    return this.http.put(`http://localhost:3000/api/pettycashs/${body._id}`, body);
  }
  deleteList(body): Observable<any> {
    console.log(body)
    return this.http.delete(`http://localhost:3000/api/pettycashs/${body._id}`, body)
  }
  createItem(body): Observable<any> {
    return this.http.post('http://localhost:3000/api/tableLists', body);
  }
  getTable(){
    return this.http.get('http://localhost:3000/api/tableLists')
  }
  search(text: any): Observable<any> {
    return this.http.get(`http://localhost:3000/api/pettycashs/search?query=${text}`);
  }
  uploadImage(file): Observable<any>{
    // console.log(file);
    return this.http.post('http://localhost:3000/api/tablelists/uploads', file);
  }
}