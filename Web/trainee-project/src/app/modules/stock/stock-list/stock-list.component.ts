import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  @ViewChild('searchStockList') searchRef: ElementRef;
  productData: any;
  productList: any;
  categoriesList: any[];
  categoriesData: any;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {

    this.stockService.getCategories().subscribe((res: any) => {
      this.categoriesData = res.data;
      this.categoriesList = this.categoriesData;
    })
    this.stockService.getProduct().subscribe((res: any) => {
      this.productData = res.data;
      this.productList = this.productData;
    })
  }

  onSearch(): void {
    let fillData = this.searchRef.nativeElement.value.toLowerCase();
    this.productList = this.productData.filter(res => {
      return res.productName.toLowerCase().startsWith(fillData);
    });
  }

  // onChooseList(item: any): void {
  //   this.stockService.getProductById(item.productName).subscribe((res: any) => {
  //     console.log(res.data);
  //     this.productData = res.data;
  //   });
  // }

  onChooseCatagory(item): void {
    this.stockService.getProductByCategory(item.id).subscribe((res: any) => {
      console.log(res.data);
      this.productList = res.data;
    });
  }
  getAll(){
    this.stockService.getProduct().subscribe((res: any) => {
      this.productData = res.data;
      this.productList = this.productData;
    })
  }

}
