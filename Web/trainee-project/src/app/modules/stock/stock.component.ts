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


  productData: any;
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
    this.stockService.getProduct().subscribe((res: any) => {
      this.productData = res.data;
    })

  }


  onChooseDate(): void {
    let date;
    date = this.range.value;
    this.stockService.getProductByDate(date.start).subscribe((res: any) => {
      console.log(res);
    });
  }

  openStockManageDialog(dataProduct?: any) :void{
    const dialogRef = this.dialog.open(StockManageDialogComponent, {
      data: dataProduct,
      width:'25vw',
      height:'70vh'
    });
    // dialogRef.afterClosed().subscribe(res => {
    //   if (res) {
    //     this.stockService.getProduct().subscribe((res: any) => {
    //       this.employeeData = res.data;
    //     });
    //   }
    // })
  }
}
