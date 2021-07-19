import { Component, OnInit } from '@angular/core';
import { StockService } from './stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  stocklist: any;
  categories: any;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.getStockByProduct().subscribe((res: any) => {
      this.stocklist = res.data
      console.log(this.stocklist)
    })
    this.stockService.getcategoriesByProduct().subscribe((res: any) => {
      this.categories = res.data
    })
  }

}
