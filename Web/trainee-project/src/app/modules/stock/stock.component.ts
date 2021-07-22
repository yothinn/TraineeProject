import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { StockService } from './stock.service';
import { debounceTime, filter, map, } from 'rxjs/operators';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  @ViewChild('searchStockList') searchRef: ElementRef;

  stockList: any[];
  stockData: any;
  categories: any;
  productData:any;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    // this.stockService.getStockByProduct().subscribe((res: any) => {
    //   this.stockData = res.data;
    //   this.stockList = this.stockData
    // })
    this.stockService.getCategories().subscribe((res: any) => {
      console.log(res)
      this.stockData = res.data;
      this.stockList = this.stockData;
    })
  }

  onSearch() {
    let fillData = this.searchRef.nativeElement.value.toLowerCase();
    this.stockList = this.stockData.filter(res => {
      return res.name.toLowerCase().startsWith(fillData);
    })
  }

  onChooseCategory(item) {
    this.stockService.getProductByCategories(item.id).subscribe((res: any) => {
      console.log(res);
      this.productData = res.data
    })
  }




}
