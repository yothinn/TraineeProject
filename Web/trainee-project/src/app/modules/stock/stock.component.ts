import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StockService } from './stock.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StockManageDialogComponent } from './stock-manage-dialog/stock-manage-dialog.component';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {


  listData: any;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(
    private stockService: StockService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.stockService.onDataChangedObservable$
    .subscribe((res)=>{
      this.listData = res
      console.log(this.listData);
    });
  }




  onChooseDate(): void {
    let date;
    date = this.range.value;
    this.stockService.getProductByDate(date.start).subscribe((res: any) => {
      console.log(res);
    });
  }

  openStockManageDialog(dataProduct?: any) :void{
    console.log(dataProduct[0])
    const dialogRef = this.dialog.open(StockManageDialogComponent, {
      data: dataProduct[0],
      width:'25vw',
      height:'60vh',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.stockService.onDataChangedObservable$
        .subscribe((res)=>{
          this.listData = res
          console.log(res);
        });
      }
    })
  }
}
