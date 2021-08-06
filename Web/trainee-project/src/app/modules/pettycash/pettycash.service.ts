import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PettyCashService {
  private onDataChanged$ = new Subject();
  public onDataChangedObservable$ = this.onDataChanged$.asObservable();
  public onGetList$ = this.onDataChanged$.asObservable();

  constructor(private http: HttpClient) { }

  onClickCard(id: string):void{
    console.log(id)
    this.http.get(`http://localhost:3000/api/tableLists?pettycashsId=${id}`)
    .subscribe((res: any)=>{
      this.onDataChanged$.next(res.data);
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
  getTable(id: string){
    return this.http.get(`http://localhost:3000/api/tableLists?pettycashsId=${id}`)
  }
}

