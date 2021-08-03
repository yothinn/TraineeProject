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
      this.productData = res.data
    })

    this.dataService.getProductCategories().subscribe((res: any) => {
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
    if (confirm("คุณยืนยันที่จะลบหรือไม่")) {
    this.dataService.deleteProduct(dataDelete).subscribe((res: any) => {
      if (res) {
        this.dataService.getProductData().subscribe((res: any) => {
          this.productData = res.data
        })
      }
    })
    }else{
      console.log("cencel")
    }
  }

  openDialogCategories(dataCategories?: any): void {
    console.log(dataCategories);
    const dialogRef = this.dialog.open(CategoriesDialogComponent, {
      width: "473px",
      height: "355px",
      data: dataCategories
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.getProductCategories().subscribe((res: any) => {
          this.productCategories = res.data
        })
      }
    })
  }

  deleteCategories(dataDelete: any): void { 
    if (confirm("คุณยืนยันที่จะลบหรือไม่")) {
      this.dataService.deleteCategories(dataDelete).subscribe((res: any) => {
        if (res) {
          this.dataService.getProductCategories().subscribe((res: any) => {
            this.productCategories = res.data
          })
        }
      })
    } else {
      console.log("cencel")
    }
  }

  filterData(category: any) {
    console.log(category)
    this.dataService.getProductData().subscribe((res: any) => {
      this.productData = res.data.filter((res) => {
        return res.type === category
       
      })
    })
  }

}
