import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss']
})
export class StockTableComponent implements OnInit {
  productData: any;


  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.onDataChangedObservable$
    .subscribe((res)=>{
      this.productData = res
      console.log(res);
    });
    // this.stockService.getProduct().subscribe((res: any) => {
    //   this.productData = res.data;
    //   this.productList = this.productData;
    // })
  }

}
