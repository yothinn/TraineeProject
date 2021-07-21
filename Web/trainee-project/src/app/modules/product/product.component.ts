import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogDetailsComponent } from './product-dialog-details/product-dialog-details.component';
import { ProductService } from './product.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productCategories: any;
  productData: any;
  constructor(private dataService: ProductService,
    public dialog: MatDialog) { }




  ngOnInit(): void {
    this.dataService.getProductData().subscribe((res: any) => {
      console.log(res.data)
      this.productData = res.data
    })

    this.dataService.getProductCategories().subscribe((res: any) => {
      console.log(res.data)
      this.productCategories = res.data
    })
  }

  openDialog() {
    this.dialog.open(ProductDialogDetailsComponent, {
      width: "900px",
      height: "650px"
    });
  }


}
