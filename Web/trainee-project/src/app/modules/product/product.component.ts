import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoriesDialogComponent } from './categories-dialog/categories-dialog.component';
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
    public dialog: MatDialog,
  ) { }

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

  openDialogProduct(dataProduct?: any): void {
    console.log(dataProduct)
    const dialogRef = this.dialog.open(ProductDialogDetailsComponent, {
      width: "900px",
      height: "700px",
      data: dataProduct
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.getProductData().subscribe((res: any) => {
          this.productData = res.data
        })
      }
    })
  }

  delete(dataDelete: any): void {
    this.dataService.deleteProduct(dataDelete).subscribe((res: any) => {
      if (res) {
        this.dataService.getProductData().subscribe((res: any) => {
          this.productData = res.data
        })
      }
    })
  }

  openDialogCategories(): void {
    const dialogRef = this.dialog.open(CategoriesDialogComponent, {
      width: "900px",
      height: "535px",
    });
  }

}
