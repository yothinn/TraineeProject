import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StockService } from './stock.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StockManageDialogComponent } from './stock-manage-dialog/stock-manage-dialog.component';
import { Router } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
  @ViewChild('picker') dateFill: ElementRef;
  date: any = [
    {
      "id": 1,
      "name": "Jack",
      "date": "01-06-2017"
    },
    {
      "id": 1,
      "name": "Jack",
      "date": "30-06-2017"
    },
    {
      "id": 1,
      "name": "Jack",
      "date": "15-06-2017"
    },
    {
      "id": 2,
      "name": "Allen",
      "date": "07-08-2017"
    },
    {
      "id": 3,
      "name": "Annie",
      "date": "22-11-2017"
    },
  ]
  dstart = "01-06-2017";
  dend = "18-06-2017";

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
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    let selectedMembers = this.date.filter(
      m => new Date(m.date) >= new Date(this.dstart) && new Date(m.date) <= new Date(this.dend)
    );

    console.log(selectedMembers);

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
    date = this.range.value
    
    console.log(date.start);
    // let dateStart = date.stert
    // let dateEnd = date.end
    // this.stockService.getProductByDate(date.start).subscribe((res: any) => {
    //   // console.log(res);
    // });
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
