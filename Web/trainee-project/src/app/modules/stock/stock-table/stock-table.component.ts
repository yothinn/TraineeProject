import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { element, EventEmitter } from 'protractor';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss']
})
export class StockTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @Output() totalResult = new EventEmitter<string>();
  pageEvent: any;
  array: any;
  pageSize = 5;
  currentPage = 0;
  totalSize = 0;
  value: any;
  totalAmountIn: any;
  totalAmountOut: any;
  totalResult : any;
  productData: any;



  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.onDataChangedObservable$
      .subscribe((res) => {
        this.productData = res;
        this.productData.sort((x, y) => - new Date(x.created) - -new Date(y.created));
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
    let sumIn = data.filter(element => {
      if (element.status === 'นำเข้า') {
        return element.total
      }
    })
    let sumOut = data.filter(element => {
      if (element.status === 'นำออก') {
        return element.total
      }
    })
    this.totalAmountIn = sumIn.map(item => item.total).reduce((prev, next) => prev + next);
    this.totalAmountOut = sumOut.map(item => item.total).reduce((prev, next) => prev + next);

    this.totalResult =   this.totalAmountIn - this.totalAmountOut
    console.log(this.totalResult);



    // this.toitalAmountIn.tatol.reduce((acc, cur) => acc + cur, 0);

    // this.value = data.filter(text => text.status === 'นำเข้า')
    // for (let j = 0; j < data.length; j++) {
    //   if (data.status === 'นำเข้า') {
    //     console.log(this.value[j].total);
    //   }
    // }
  }

}
