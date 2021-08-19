import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-report-dialog',
  templateUrl: './stock-report-dialog.component.html',
  styleUrls: ['./stock-report-dialog.component.scss']
})
export class StockReportDialogComponent implements OnInit {
  stockData: any;
  stockIn: any;
  stockOut: any;
  allStock: any;


  constructor(
    private stockService: StockService,
    public dialogRef: MatDialogRef<StockReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.stockData = this.data;
    // console.log(this.data);
    this.stockService.getStockProduct().subscribe((res) => {
      console.log(res);
    })
  }

}
