import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss']
})
export class StockTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageEvent: any;
  array: any;
  pageSize = 2;
  currentPage = 0;
  totalSize = 0;
  value: any;
  RaisedAmount: any = 0;

  productData: any;




  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.onDataChangedObservable$
      .subscribe((res) => {
        this.productData = res;
        this.findsum(this.productData)
      });

    this.getArray();
  }

  handlePage(pagin: any): void {
    this.currentPage = pagin.pageIndex;
    this.pageSize = pagin.pageSize;
    this.shoose();
  }


  getArray(): void {
    this.stockService.onDataChangedObservable$
      .subscribe((res: any) => {
        this.productData = new MatTableDataSource<Element>(res);
        this.productData.paginator = this.paginator;
        this.array = res;
        this.totalSize = this.array.length;
        this.shoose();
      });
  }

  shoose(): void {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.productData = part;
  }

  findsum(data) {
    // console.log(data);
    data.forEach(element => {
      if (element.status === 'นำเข้า') {
        console.log(element.total);
        // this.RaisedAmount.reduce(element.total)
        // console.log(this.RaisedAmount); 
      }
    })
    console.log(this.RaisedAmount);
    // this.value = data.filter(text => text.status === 'นำเข้า')
    // for (let j = 0; j < data.length; j++) {
    //   if (data.status === 'นำเข้า') {
    //     console.log(this.value[j].total);
    //   }
    // }
  }

}
