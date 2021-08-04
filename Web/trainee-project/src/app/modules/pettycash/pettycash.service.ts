import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PettyCashService {
  dataCenter: Subject<any>;
  constructor(private http: HttpClient) { 
    this.dataCenter = new Subject();
  }

  getDataCenter(): Observable<any>{
    return this.dataCenter.asObservable();

  }
  onClickCard(id: string){
    this.http.get(`http://localhost:3000/api/tableList/${id}`).subscribe((res: any)=>{
      this.dataCenter.next(res.id);
      console.log(res.id)
    })
  }


  getList(): Observable<any> {
    return this.http.get('http://localhost:3000/api/pettycashs');
  }
  createCustomer(id): Observable<any> {
    return this.http.post('http://localhost:3000/api/tableLists', id);
  }
  updateCustomer(body): Observable<any> {
    console.log(body)
    return this.http.put(`http://localhost:3000/api/pettycashs/${body._id}`, body);
  }
  deleteList(body): Observable<any> {
    console.log(body)
    return this.http.delete(`http://localhost:3000/api/pettycashs/${body._id}`, body)
  }
}
