import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { StockService } from './stock.service';
import { debounceTime, filter, map, } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  @ViewChild('searchStockList') searchRef: ElementRef;

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
      // console.log(res)
      this.productData = res.data;
      // console.log(this.productData)
      // this.productData.filter((item, index) => {
      //   console.log(item.productId)
      //   return this.productData.indexOf(item.productName) === index
      // })
      // console.log(this.productData);
      // this.productData = res.data;
      // this.productList = this.productData;
    })
    this.stockService.getCategories().subscribe((res: any) => {
      this.categoriesData = res.data;
      this.categoriesList = this.categoriesData;
    })
  }

  onSearch(): void {
    let fillData = this.searchRef.nativeElement.value.toLowerCase();
    this.productList = this.productData.filter(res => {
      return res.productName.toLowerCase().startsWith(fillData);
    });
  }

  onChooseList(item: any): void {
    // console.log(item)
    this.stockService.getProductById(item.productName).subscribe((res: any) => {
      console.log(res.data);
      this.productData = res.data;
    });
  }

  onChooseCatagory(item): void {
    this.stockService.getProductByCategory(item.id).subscribe((res: any) => {
      console.log(res.data);
      this.productList = res.data;
    });
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
