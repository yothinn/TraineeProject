import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('searchProductList') searchRef: ElementRef;
  productCategories: any;
  productData: any;
  selected = 'option2';

  constructor(private dataService: ProductService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.dataService.getProductData().subscribe((res: any) => {
      this.productData = res.data;
    })

    this.dataService.getProductCategories().subscribe((res: any) => {
      this.productCategories = res.data;
    })
  }

  openDialogProduct(dataProduct?: any): void {
    const dialogRef = this.dialog.open(ProductDialogDetailsComponent, {
      width: "900px",
      height: "700px",
      data: dataProduct
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataService.getProductData().subscribe((res: any) => {
          this.productData = res.data;
        })
      }
    })
  }

  delete(dataDelete: any): void {
    if (confirm("คุณยืนยันที่จะลบหรือไม่")) {
      this.dataService.deleteProduct(dataDelete).subscribe((res: any) => {
        if (res) {
          this.dataService.getProductData().subscribe((res: any) => {
            this.productData = res.data;
          })
        }
      })
    } else {
      console.log("cencel");
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
          this.productCategories = res.data;
        })
      }
    })
  }

  deleteCategories(dataDelete: any): void {
    if (confirm("คุณยืนยันที่จะลบหรือไม่")) {
      this.dataService.deleteCategories(dataDelete).subscribe((res: any) => {
        if (res) {
          this.dataService.getProductCategories().subscribe((res: any) => {
            this.productCategories = res.data;
          })
        }
      })
    } else {
      console.log("cancel");
    }
  }

  filterData(category?: any) {
    if (category) {
      this.dataService.getProductData().subscribe((res: any) => {
        this.productData = res.data.filter((res) => {
          return res.type === category.name;
        })
      })
    } else {
      this.dataService.getProductData().subscribe((res: any) => {
        this.productData = res.data;
      })
    }
  }

  searchProduct(): void {
    let fillData = this.searchRef.nativeElement.value.toLowerCase();
    this.dataService.searchProduct(fillData)
      .subscribe((res) => {
        // console.log(res);
        this.productData = res.data;
      })
  }

}
