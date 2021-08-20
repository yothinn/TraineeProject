import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { StockService } from '../stock.service';
import { debounceTime, filter, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit, AfterViewInit {
  @ViewChild('searchStockList') searchRef: ElementRef;
  @ViewChild('stockList') stockRef: ElementRef;
  productData: any;
  productList: any;
  categoriesList: any[];
  categoriesData: any;
  currentPage = 1;

  constructor(private stockService: StockService) { }


  ngOnInit(): void {
    this.currentPage = 1;
    this.getStockList()

    this.stockService.getCategories().subscribe((res: any) => {
      this.categoriesData = res.data;
      this.categoriesList = this.categoriesData;
    })


  }

  getStockList() {
    this.stockService.getProduct(this.currentPage).subscribe((res: any) => {
      console.log(res);
      console.log(this.currentPage);
      if (this.currentPage === 1) {
        this.productData = res.data;
        this.productList = this.productData;
      } else {
        if (res.data.length > 0) {
          console.log(res);
          this.productData = this.productData.concat(res.data);
          this.productList = this.productData;
        } else {
          this.currentPage--;
        }
      }
    })
  }

  ngAfterViewInit(): void {
    this.onScrollStock();
  }

  onSearch(): void {
    let fillData = this.searchRef.nativeElement.value.toLowerCase();
    this.stockService.searchProduct(fillData)
      .subscribe((res) => {
        console.log(res);
        this.productList = res.data;
      })

    // this.productList = this.productData.filter(res => {
    //   console.log(res);
    //   return res.productName.toLowerCase().startsWith(fillData);
    // });
  }

  onScrollStock() {
    let scrollStock = fromEvent(this.stockRef.nativeElement, 'scroll').pipe(
      // tap(n => console.log(n)),
      debounceTime(300),
      filter((v: any) => {
        // console.log(v.target.scrollHeight,v.target.scrollTop,v.target.offsetHeight);
        let maxPos = v.target.scrollHeight;
        let curPos = v.target.scrollTop + v.target.offsetHeight;
        console.log(curPos >= (maxPos - 10));
        console.log(`maxPos : ${maxPos} cusPos: ${curPos}`);
        return (curPos >= (maxPos - 10));
      })
    );
    console.log(scrollStock);
    scrollStock.subscribe((res: any) => {
      console.log(res);
      this.currentPage++;
      this.getStockList();
    })
  }

  onChooseList(item: any): void {
    this.stockService.getStockByProductId(item.productId);
    // this.currentPage--;
  }

  onChooseCatagory(item): void {
    this.stockService.getProductByCategory(item.id).subscribe((res: any) => {
      this.productList = res.data;
    });
  }
  getAll() {
    this.stockService.getProduct().subscribe((res: any) => {
      this.productData = res.data;
      this.productList = this.productData;
    })
  }

  // onScrolled(event) {
  //   console.log(event);
  // }

}
