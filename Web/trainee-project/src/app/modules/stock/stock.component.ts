import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StockService } from './stock.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {


  categoriesList: any[];
  categoriesData: any;
  productData: any;
  productList: any;
  listData: any;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

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


  onChooseDate(): void {
    let date;
    date = this.range.value;
    // console.log(JSON.parse(date.start))
    this.stockService.getProductByDate(date.start).subscribe((res: any) => {
      console.log(res);
    });
  }
}
