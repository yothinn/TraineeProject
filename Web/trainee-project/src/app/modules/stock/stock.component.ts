import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { StockService } from './stock.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StockManageDialogComponent } from './stock-manage-dialog/stock-manage-dialog.component';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
  providers: [DatePipe]
})
export class StockComponent implements OnInit {

  totalAmountIn: any;
  totalAmountOut: any;
  totalResult: any;
  listData: any;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private stockService: StockService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.stockService.onDataChangedObservable$
      .subscribe((res) => {
        this.listData = res;
        if (this.listData.length >= 1) {
          this.findsum(this.listData);
        } else {
          this.totalResult = 0
        }
      });

  }



  onChooseDate(): void {
    let date;
    date = this.range.value;
    let datestart = this.datePipe.transform(date.start, 'yyyy-MM-dd')
    let dateend = this.datePipe.transform(date.end, 'yyyy-MM-dd')
    let data = this.listData.filter(res => {
      return res.created = this.datePipe.transform(res.created, 'yyyy-MM-dd')
    })
    let dateFill = data.filter(res => {
      return res.created >= datestart && res.created <= dateend
    })
  }

  openStockManageDialog(dataProduct?: any): void {
    const dialogRef = this.dialog.open(StockManageDialogComponent, {
      data: dataProduct[0],
      width: '25vw',
      height: '60vh',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.stockService.onDataChangedObservable$
          .subscribe((res) => {
            this.listData = res;
          });
      }
    })
  }

  onConclude() {
    this.router.navigateByUrl("product");
    // const dialogRef = this.dialog.open(StockReportDialogComponent, {
    //   data: dataProduct,
    //   width: '60vw',
    //   height: '70vh'
    // })
  }

  findsum(data) {
    let sumIn = data.filter(element => {
      return element.status === 'นำเข้า'
    })
    let sumOut = data.filter(element => {
      return element.status === 'นำออก'
    })
    console.log(sumIn, sumOut);
    if (sumOut.length === 0) {
      this.totalAmountIn = sumIn.map(item => item.total).reduce((prev, next) => prev + next);
      this.totalResult = this.totalAmountIn
    } else {
      this.totalAmountIn = sumIn.map(item => item.total).reduce((prev, next) => prev + next);
      this.totalAmountOut = sumOut.map(item => item.total).reduce((prev, next) => prev + next);
      this.totalResult = this.totalAmountIn - this.totalAmountOut;
    }
  }
}
