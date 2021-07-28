import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss']
})
export class StockTableComponent implements OnInit {
  productData: any;
  productList: any;


  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.getProduct().subscribe((res: any) => {
      this.productData = res.data;
      // console.log(this.productData)
      // this.productData.filter((item, index) => {
      //   console.log(item.productId)
      //   return this.productData.indexOf(item.productName) === index
      // })
      // console.log(this.productData);
      // this.productData = res.data;
      this.productList = this.productData;
    })
  }

}
