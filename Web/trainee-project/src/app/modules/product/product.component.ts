import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategoriesDialogComponent } from './categories-dialog/categories-dialog.component';
import { ProductDialogDetailsComponent } from './product-dialog-details/product-dialog-details.component';
import { ProductService } from './product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('searchProductList') searchRef: ElementRef;
  productCategories: any;
  productData: any;
  pageEvent: any;
  array: any;
  pageSize = 15;
  currentPage = 0;
  totalSize = 0;

  constructor(private dataService: ProductService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // this.dataService.getProductData().subscribe((res: any) => {
    //   this.productData = res.data;
    // })

    this.dataService.getProductCategories().subscribe((res: any) => {
      this.productCategories = res.data;
    })
    this.getArray();

  }

  openDialogProduct(dataProduct?: any): void {
    const dialogRef = this.dialog.open(ProductDialogDetailsComponent, {
      width: "900px",
      height: "700px",
      data: dataProduct
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getArray();
        // this.dataService.getProductData().subscribe((res: any) => {
        //   this.productData = res.data;
        // })
        
      }

    })
  }

  delete(dataDelete: any): void {
    if (dataDelete?.productName) {
      if (confirm("คุณยืนยันที่จะลบรายการสินค้า : " + dataDelete.productName + " หรือไม่")) {
        this.dataService.deleteProduct(dataDelete).subscribe((res: any) => {
          if (res) {
            this.getArray();
            // this.dataService.getProductData().subscribe((res: any) => {
            //   this.productData = res.data;
            // })
          }
        })

      } else {
        console.log("cencel");
      }
    } else {
      if (confirm("คุณยืนยันที่จะลบหมวดหมู่สินค้า : " + dataDelete.name + " หรือไม่")) {
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
        this.productData = res.data;
      })
  }

  handlePage(pagin: any): void {
    this.currentPage = pagin.pageIndex;
    this.pageSize = pagin.pageSize;
    this.shoose();
  }

  getArray(): void {
    this.dataService.getProductData()
      .subscribe((res: any) => {
        this.productData = new MatTableDataSource<Element>(res.data);
        this.productData.paginator = this.paginator;
         this.array = res.data;
        this.totalSize = this.array.length;
        this.shoose();
        console.log(this.totalSize)
      });
  }

  shoose(): void {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    // console.log(end)
    // console.log(start)
    // console.log(part)
    
    this.productData = part;
  }
  
  importFile(event) {
    const file = event.target.files[0];
    console.log(file)
    const formData = new FormData();
    formData.append('files', file);
    console.log(formData);
    this.dataService.importFileProduct(formData)
      .subscribe((res) => {
        // this.productData = res.data
        console.log(res)
      })
  }

}
